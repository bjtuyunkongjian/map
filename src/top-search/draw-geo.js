import mapboxgl from 'mapbox-gl';
import {
  point as TurfPoint,
  polygon as TurfPolygon,
  lineString as LineString,
  featureCollection as FeatureCollection,
  distance as TurfDistance
} from 'turf';
import TurfCircle from 'turf-circle';
import {
  AddPolygonLayer,
  AddLineLayer,
  AddCircleLayer,
  RemoveLayer,
  LayerIds,
  GlobalEvent,
  GloEventName
} from 'tuyun-utils';
import Event, { EventName } from './event';

let vertexClick = []; // 已点击的坐标
let vertexMove; // 移动时对应的坐标
let vertexTotal = []; // 所有的坐标
let prompt; // 提示

export const RemoveGeometries = function() {
  // 清空数据
  vertexClick = [];
  vertexMove = [];
  vertexTotal = [];
  RemoveLayer(_MAP_, LayerIds.frameSelect.point);
  RemoveLayer(_MAP_, LayerIds.frameSelect.line);
  RemoveLayer(_MAP_, LayerIds.frameSelect.area);
  RemoveLayer(_MAP_, LayerIds.polyAreaReasult.point);
  prompt = '';
  _MAP_.getCanvas().style.cursor = '';
  Event.emit(EventName.createFinalGeo, {}); // 分发最终图形信息
};

export const DrawMultiPolygon = function() {
  GlobalEvent.emit(GloEventName.toggleAllUi, { visible: false });
  // 更改鼠标样式
  _MAP_.getCanvas().style.cursor = 'crosshair';
  // 删除图层
  RemoveGeometries();
  // 添加监听
  _MAP_.on('click', drawVertex);
  _MAP_.on('mousemove', selectNextVertex);
  _MAP_.on('contextmenu', drawEndVertex);
};

const drawVertex = function(e) {
  const { lngLat } = e;
  vertexClick.push([lngLat.lng, lngLat.lat]);
  vertexTotal = [...vertexClick]; // 解构，而不是直接赋值
  if (vertexClick.length === 1) {
    prompt = new mapboxgl.Popup({
      offset: promptOffset,
      closeOnClick: false,
      closeButton: false
    })
      .setLngLat(lngLat)
      .setText('右键结束选择')
      .addTo(_MAP_);
  }
  createPolygon();
};

const selectNextVertex = function(e) {
  if (vertexClick.length <= 0) return;
  const { lngLat } = e;
  vertexMove = [lngLat.lng, lngLat.lat];
  vertexTotal = [...vertexClick, vertexMove];
  prompt && prompt.setLngLat(lngLat);
  if (vertexTotal.length >= 2) {
    createPolygon();
  }
};

const drawEndVertex = function() {
  vertexTotal = [...vertexClick]; // 解构，而不是直接赋值
  _MAP_.off('click', drawVertex);
  _MAP_.off('mousemove', selectNextVertex);
  _MAP_.off('contextmenu', drawEndVertex);
  prompt && prompt.remove();
  _MAP_.getCanvas().style.cursor = ''; // 清除鼠标样式
  if (vertexTotal.length >= 3) {
    createPolygon();
    const _prompt = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(vertexTotal[vertexTotal.length - 1])
      .setText('删除选中区域')
      .addTo(_MAP_);
    _prompt.on('close', RemoveGeometries); // 删除触发
    Event.emit(EventName.createFinalGeo, {
      shape: 'polygon',
      geometry: {
        type: 'Polygon',
        coordinates: [[...vertexTotal, vertexTotal[0]]]
      }
    }); // 分发最终图形信息
  } else {
    Event.emit(EventName.createFinalGeo, {}); // 分发最终图形信息
    RemoveGeometries();
  }
  // 显示所有的 UI
  GlobalEvent.emit(GloEventName.toggleAllUi, { visible: true });
};

const createPolygon = function() {
  // 添加点
  if (vertexClick.length > 0) {
    const _geometryPoint = vertexClick.map(item =>
      TurfPoint(item, { radius: 3 })
    );
    const _geoJSONDataPoint = {
      type: 'geojson',
      data: FeatureCollection(_geometryPoint)
    };
    AddCircleLayer(_MAP_, _geoJSONDataPoint, LayerIds.frameSelect.point, {
      color: 'rgba(0,0,0,0)',
      strokeWidth: 2,
      strokeColor: '#4169E1',
      labelLayerId,
      disablePointer: true
    });
  }
  // 添加线图层
  if (vertexTotal.length > 1) {
    const _geometryL = LineString([...vertexTotal, vertexTotal[0]]);
    const _geoJSONDataL = {
      type: 'geojson',
      data: _geometryL
    };
    AddLineLayer(_MAP_, _geoJSONDataL, LayerIds.frameSelect.line, {
      color: '#4169E1',
      dasharray: [5, 5],
      labelLayerId
    });
  }
  // 添加面图层
  if (vertexTotal.length > 2) {
    const _geometryP = TurfPolygon([[...vertexTotal, vertexTotal[0]]]);
    const _geoJSONDataPolygon = {
      type: 'geojson',
      data: _geometryP
    };
    AddPolygonLayer(_MAP_, _geoJSONDataPolygon, LayerIds.frameSelect.area, {
      color: 'rgba(176,224,230,0.6)',
      labelLayerId
    });
  }
};

export const DrawCircle = function() {
  GlobalEvent.emit(GloEventName.toggleAllUi, { visible: false });
  // 更改鼠标样式
  _MAP_.getCanvas().style.cursor = 'crosshair';
  // 删除图层
  RemoveGeometries();
  prompt.remove();
  // 添加监听
  _MAP_.on('click', drawCircleCenter);
  _MAP_.on('mousemove', selectCircleRadius);
  _MAP_.on('contextmenu', drawCircleRadius);
};

const drawCircleCenter = function(e) {
  // 如果有两个点了，直接结束选择
  if (vertexTotal.length >= 2) {
    drawCircleRadius();
    return;
  }
  // 小于两个点，绘制对应的点
  const { lngLat } = e;
  vertexClick.push([lngLat.lng, lngLat.lat]);
  vertexTotal = [...vertexClick]; // 解构，而不是直接赋值
  if (vertexClick.length === 1) {
    prompt = new mapboxgl.Popup({
      offset: promptOffset,
      closeOnClick: false,
      closeButton: false
    })
      .setLngLat(lngLat)
      .setText('左键或右键结束选择')
      .addTo(_MAP_);
  }
  createCircle();
};

const selectCircleRadius = function(e) {
  if (vertexClick.length <= 0) return;
  const { lngLat } = e;
  vertexMove = [lngLat.lng, lngLat.lat];
  vertexTotal = [...vertexClick, vertexMove];
  prompt && prompt.setLngLat(lngLat);
  if (vertexTotal.length >= 2) {
    createCircle();
  }
};

const drawCircleRadius = function() {
  _MAP_.off('click', drawCircleCenter);
  _MAP_.off('mousemove', selectCircleRadius);
  _MAP_.off('contextmenu', drawCircleRadius);
  prompt && prompt.remove();
  _MAP_.getCanvas().style.cursor = ''; // 清除鼠标样式
  if (vertexTotal.length >= 2) {
    createCircle();
    const _prompt = new mapboxgl.Popup({ closeOnClick: false })
      .setLngLat(vertexTotal[vertexTotal.length - 1])
      .setText('删除选中区域')
      .addTo(_MAP_);
    _prompt.on('close', RemoveGeometries); // 删除触发
    // 生成图形信息
    const _center = TurfPoint(vertexTotal[0]); // 圆心
    const _ptOnCircle = TurfPoint(vertexTotal[1]); // 圆上面的点
    const _radius = TurfDistance(_center, _ptOnCircle, units); // 计算半径
    Event.emit(EventName.createFinalGeo, {
      shape: 'circle',
      radius: _radius * 1000,
      geometry: _center.geometry
    }); // 分发最终图形信息
  } else {
    RemoveGeometries();
    Event.emit(EventName.createFinalGeo, {}); // 分发最终图形信息
  }
  // 显示所有的 UI
  GlobalEvent.emit(GloEventName.toggleAllUi, { visible: true });
};

const createCircle = function() {
  // 添加点
  if (vertexClick.length > 0) {
    const _geometryPoint = vertexClick.map(item =>
      TurfPoint(item, { radius: 3 })
    );
    const _geoJSONDataPoint = {
      type: 'geojson',
      data: FeatureCollection(_geometryPoint)
    };
    AddCircleLayer(_MAP_, _geoJSONDataPoint, LayerIds.frameSelect.point, {
      color: 'rgba(0,0,0,0)',
      strokeWidth: 2,
      strokeColor: '#4169E1',
      labelLayerId,
      disablePointer: true
    });
  }
  // 添加线图层
  if (vertexTotal.length >= 2) {
    const _geometryL = LineString([...vertexTotal, vertexTotal[0]]);
    const _geoJSONDataL = {
      type: 'geojson',
      data: _geometryL
    };
    AddLineLayer(_MAP_, _geoJSONDataL, LayerIds.frameSelect.line, {
      color: '#4169E1',
      dasharray: [5, 5],
      labelLayerId
    });
  }
  // 添加面图层
  if (vertexTotal.length >= 2) {
    const _center = TurfPoint(vertexTotal[0]);
    const _ptOnCircle = TurfPoint(vertexTotal[1]); // 圆上面的点
    const _radius = TurfDistance(_center, _ptOnCircle, units); // 计算半径
    const _geoJSONDataPolygon = {
      type: 'geojson',
      data: TurfCircle(_center, _radius, circleStep, units)
    };
    AddPolygonLayer(_MAP_, _geoJSONDataPolygon, LayerIds.frameSelect.area, {
      color: 'rgba(176,224,230,0.6)',
      labelLayerId
    });
  }
};

const labelLayerId = 'line-name-ref';
const promptOffset = { top: [2, 2] };
const units = 'kilometers';
const circleStep = 50; // 圆上点的个数
