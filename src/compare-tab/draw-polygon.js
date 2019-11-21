import mapboxgl from 'mapbox-gl';
import {
  point as TurfPoint,
  polygon as TurfPolygon,
  lineString as LineString,
  featureCollection as FeatureCollection
} from 'turf';
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
import { LabelLayerId } from './constant';

let vertexClick = []; // 已点击的坐标
let vertexMove; // 移动时对应的坐标
let vertexTotal = []; // 所有的坐标
let prompt; // 提示
let polygonColor = 'rgba(255,0,0,1)'; // 多边形的颜色
let polygonIndex = -1;

export const RemoveGeometries = function(index, cancelEmit) {
  // 清空数据
  vertexClick = [];
  vertexMove = [];
  vertexTotal = [];
  RemoveLayer(_MAP_, `${LayerIds.compareBar.point}_${index}`);
  RemoveLayer(_MAP_, `${LayerIds.compareBar.line}_${index}`);
  RemoveLayer(_MAP_, `${LayerIds.compareBar.area}_${index}`);
  !cancelEmit && Event.emit(EventName.createFinalGeo, { index: polygonIndex }); // 分发最终图形信息
};

export const DrawMultiPolygon = function(pColor, pIndex) {
  polygonIndex = pIndex;
  polygonColor = pColor;
  GlobalEvent.emit(GloEventName.toggleAllUi, { visible: false });
  // 更改鼠标样式
  _MAP_.getCanvas().style.cursor = 'crosshair';
  // 删除图层
  RemoveGeometries(pIndex, true);
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
    Event.emit(EventName.createFinalGeo, {
      shape: 'polygon',
      index: polygonIndex,
      geometry: {
        type: 'Polygon',
        coordinates: [[...vertexTotal, vertexTotal[0]]]
      }
    }); // 分发最终图形信息
  } else {
    console.log('polygonIndex', polygonIndex);
    Event.emit(EventName.createFinalGeo, { index: polygonIndex }); // 分发最终图形信息
    RemoveGeometries(polygonIndex);
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
    AddCircleLayer(
      _MAP_,
      _geoJSONDataPoint,
      `${LayerIds.compareBar.point}_${polygonIndex}`,
      {
        color: 'rgba(0,0,0,0)',
        strokeWidth: 2,
        strokeColor: '#4169E1',
        LabelLayerId,
        disablePointer: true
      }
    );
  }
  // 添加线图层
  if (vertexTotal.length > 1) {
    const _geometryL = LineString([...vertexTotal, vertexTotal[0]]);
    const _geoJSONDataL = {
      type: 'geojson',
      data: _geometryL
    };
    AddLineLayer(
      _MAP_,
      _geoJSONDataL,
      `${LayerIds.compareBar.line}_${polygonIndex}`,
      {
        color: '#4169E1',
        dasharray: [5, 5],
        LabelLayerId
      }
    );
  }
  // 添加面图层
  if (vertexTotal.length > 2) {
    const _geometryP = TurfPolygon([[...vertexTotal, vertexTotal[0]]]);
    const _geoJSONDataPolygon = {
      type: 'geojson',
      data: _geometryP
    };
    AddPolygonLayer(
      _MAP_,
      _geoJSONDataPolygon,
      `${LayerIds.compareBar.area}_${polygonIndex}`,
      {
        color: polygonColor,
        LabelLayerId
      }
    );
  }
};

const promptOffset = { top: [2, 2] };
