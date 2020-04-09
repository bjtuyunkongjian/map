import mapboxgl from 'mapbox-gl';

import MapStyles from './map-styles-standard';
import { FetchRequest } from './fetch';

import {
  AddCircleLayer,
  AddPolygonLayer,
  AddTextLayer,
  Add3dLayer,
  AddLineLayer,
  AddHeatMapLayer,
  AddLoadedImageLayer,
  RemoveLayer,
} from 'tuyun-utils';

import {
  point as TurfPoint,
  multiPoint as MultiPoint,
  polygon as TurfPolygon,
  multiPolygon as MultiPolygon,
  lineString as LineString,
  multiLineString as MultiLineString,
  featureCollection as FeatureCollection,
  randomPoint as RandomPoint,
  randomLineString as RandomLineString,
  randomPolygon as RandomPolygon,
  center as PointCenter,
  distance as PointDistance,
  length as LineLength,
  area as PolygonArea,
  midpoint as MidPoint,
  pointToLineDistance as Point2LineDistance,
  nearestPointOnLine as NearestPointOnLine,
  along as AlongLine,
  booleanPointInPolygon as PointInPolygon,
  sector as Sector,
  convex as Convex,
  intersect as PolygonIntersect,
  union as PolygonUnion,
  difference as PolygonDiff,
} from '@turf/turf';

import { BuildingIds, GresplColor } from './map-styles-standard/layer-building';

const mapArr = [];

export default class BaseMap {
  constructor(container, options = {}) {
    const {
      hash = true,
      center = [120.208615, 30.245062],
      zoom = 17,
      pitch = 60,
      bearing = -13.6,
      maxZoom = 20,
      minZoom = 7,
      theme = 'standard',
    } = options;

    const tyMap = new mapboxgl.Map({
      style: MapStyles,
      container: container,
      hash,
      center,
      zoom,
      pitch,
      bearing,
      minZoom,
      maxZoom,
      localIdeographFontFamily: '黑体',
    });
    this.mapIndex = mapArr.length;
    mapArr.push(tyMap);
    // 通过获取后台数据修改对应的建筑物颜色
  }

  getBuildingColor = async () => {
    // 获取服务器配置文件
    const { res, err } = await FetchRequest({
      url: 'extendMapServer/string?test=QueryColor',
    });
    if (!res || err) return console.error('获取建筑物颜色数据失败');
    // 重新渲染
    for (let item of BuildingIds) {
      mapArr[this.mapIndex].setPaintProperty(item.id, 'fill-extrusion-color', [
        'coalesce',
        ['get', ['to-string', ['get', 'ID']], ['literal', res]],
        GresplColor,
      ]);
    }
  };

  setBuildingColor = async ({ x, y, color }) => {
    // 判断颜色
    const rgbExec = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/g.exec(color);
    if (!rgbExec) return '颜色不符合规范，仅支持 rgb(r, g, b) 格式';
    for (let i = 1; i < 3; i++) {
      if (rgbExec[i] > 255 || rgbExec[i] < 0)
        return '颜色不符合规范，仅支持 rgb(r, g, b) 格式';
    }
    // 判断 x 和 y
    const dotReg = /^[0-9]+(.[0-9]{1,})?$/;
    if (!dotReg.test(x) || !dotReg.test(y)) return '经纬度不符合规范';
    // 发请求
    const { err } = await FetchRequest({
      url: `extendMapServer/string?test=PaintColor&x=${x}&y=${y}&color=${color}`,
    });
    if (err) return console.error('设置建筑物颜色失败');
    // 重新从服务器拉数据渲染一下
    this.getBuildingColor();
  };

  removeBuildingColor = async ({ x, y }) => {
    // 判断 x 和 y
    const dotReg = /^[0-9]+(.[0-9]{1,})?$/;
    if (!dotReg.test(x) || !dotReg.test(y)) return '经纬度不符合规范';
    // 发请求
    const { err } = await FetchRequest({
      url: `extendMapServer/string?test=PaintColor&x=${x}&y=${y}&color=0`,
    });
    if (err) return console.error('设置建筑物颜色失败');
    // 重新从服务器拉数据渲染一下
    this.getBuildingColor();
  };

  getSurround = async (layerId) => {
    if (!layerId || typeof layerId !== 'string')
      return new Error('没有设置图层id');
    const bounds = mapArr[this.mapIndex].getBounds();
    const { _sw, _ne } = bounds;
    const { res, err } = await FetchRequest({
      url: `extendMapServer/string?test=QueryCircle&wx=${_sw.lng}&sy=${_sw.lat}&ex=${_ne.lng}&ny=${_ne.lat}`,
    });
    if (!res || err) return console.error('获取建筑物颜色数据失败');
    // 生成 环绕带子 source
    const features = [];
    for (let item of res) {
      const { color, circle, floor } = item;
      const colorArr = color.split(';');
      const floorInt = parseInt(floor); // 层数必须是整数
      const perHeight = 3.5 / colorArr.length; // 每一份的高度
      const suGeometry = JSON.parse(circle); // geometry
      for (let index = 0; index < colorArr.length; index++) {
        const properties = {}; // 属性
        properties.baseH = floorInt * 3 + index * perHeight;
        properties.height = floorInt * 3 + (index + 1) * perHeight;
        properties.color = colorArr[index];
        features.push({ type: 'Feature', geometry: suGeometry, properties });
      }
    }
    const data = FeatureCollection(features);
    const source = {
      type: 'geojson',
      data: data,
    };
    this.add3dLayer(source, layerId, {
      baseHeight: ['get', 'baseH'],
      color: ['get', 'color'],
      labelLayerId: '15_BUILDING',
      minzoom: 17,
    });
  };

  setSurround = async ({ x, y, color, floor }) => {
    // 判断颜色
    for (let item of color.split(';')) {
      const rgbExec = /rgb\((\d+),\s*(\d+),\s*(\d+)\)/g.exec(item);
      if (!rgbExec) return '颜色不符合规范，仅支持 rgb(r, g, b) 格式';
      // 判断 rgb 各个值是 0 到 255 之间
      for (let i = 1; i < 3; i++) {
        if (rgbExec[i] > 255 || rgbExec[i] < 0)
          return '颜色不符合规范，仅支持 rgb(r, g, b) 格式';
      }
    }
    // 判断 x 和 y
    const dotReg = /^[0-9]+(.[0-9]{1,})?$/;
    if (!dotReg.test(x) || !dotReg.test(y)) return '经纬度不符合规范';
    // 判断 floor ，楼层
    const intReg = /^\d+$/;
    if (!intReg) return '楼层不符合规范';
    // 发请求
    const { err } = await FetchRequest({
      url: `extendMapServer/string?test=PaintCircle&x=${x}&y=${y}&color=${color}&floor=${floor}`,
    });
    if (err) return console.error('设置环形建筑物颜色失败');
  };

  removeSurround = async ({ x, y, floor }) => {
    // 判断 x 和 y
    const dotReg = /^[0-9]+(.[0-9]{1,})?$/;
    if (!dotReg.test(x) || !dotReg.test(y)) return '经纬度不符合规范';
    // 判断 floor ，楼层
    const intReg = /^\d+$/;
    if (!intReg) return '楼层不符合规范';
    // 发请求
    const { err } = await FetchRequest({
      url: `extendMapServer/string?test=PaintCircle&x=${x}&y=${y}&color=0&floor=${floor}`,
    });
    if (err) return console.error('设置环形建筑物颜色失败');
  };

  resize = () => mapArr[this.mapIndex].resize();

  getBounds = () => mapArr[this.mapIndex].getBounds();

  setMaxBounds = (bounds) => {
    mapArr[this.mapIndex].setMaxBounds(bounds); // 不提供返回值
  };
  getMaxBounds = () => mapArr[this.mapIndex].getMaxBounds();

  setMinZoom = (zoomLevel) => {
    mapArr[this.mapIndex].setMinZoom(zoomLevel); // 不提供返回值
  };
  getMinZoom = () => mapArr[this.mapIndex].getMinZoom();

  setMaxZoom = () => {
    mapArr[this.mapIndex].setMaxZoom(zoomLevel);
  };
  getMaxZoom = () => mapArr[this.mapIndex].getMaxZoom();

  isZooming = () => mapArr[this.mapIndex].isZooming();
  isRotating = () => mapArr[this.mapIndex].isRotating();
  isMoving = () => mapArr[this.mapIndex].isMoving();

  queryRenderedFeatures = () => mapArr[this.mapIndex].queryRenderedFeatures();
  querySourceFeatures = (id) => mapArr[this.mapIndex].querySourceFeatures(id);

  getLayer = (layerId) => mapArr[this.mapIndex].getLayer(layerId);

  addCircleLayer = (source, layerId, options = {}) =>
    AddCircleLayer(mapArr[this.mapIndex], source, layerId, options);

  addLineLayer = (source, layerId, options = {}) =>
    AddLineLayer(mapArr[this.mapIndex], source, layerId, options);

  addPolygonLayer = (source, layerId, options = {}) =>
    AddPolygonLayer(mapArr[this.mapIndex], source, layerId, options);

  add3dLayer = (source, layerId, options = {}) =>
    Add3dLayer(mapArr[this.mapIndex], source, layerId, options);

  addTextLayer = (source, layerId, options = {}) =>
    AddTextLayer(mapArr[this.mapIndex], source, layerId, options);

  addImageLayer = (source, layerId, options = {}) =>
    AddLoadedImageLayer(mapArr[this.mapIndex], source, layerId, options);

  addHeatMapLayer = (source, layerId, options = {}) =>
    AddHeatMapLayer(mapArr[this.mapIndex], source, layerId, options);

  removeLayer = (layerId) => RemoveLayer(mapArr[this.mapIndex], layerId);

  setFilter = (layerId, filterExpress) => {
    mapArr[this.mapIndex].setFilter(layerId, filterExpress);
  };

  setCenter = (center) => {
    mapArr[this.mapIndex].setCenter(center);
  };
  getCenter = () => mapArr[this.mapIndex].getCenter();

  setZoom = (zoomLevel) => {
    mapArr[this.mapIndex].setZoom(zoomLevel);
  };
  getZoom = () => {
    mapArr[this.mapIndex].getZoom();
  };

  setBearing = (bearing) => {
    mapArr[this.mapIndex].setBearing(bearing);
  };
  getBearing = () => {
    mapArr[this.mapIndex].getBearing();
  };

  setPitch = (pitch) => {
    mapArr[this.mapIndex].setPitch(pitch);
  };
  getPitch = () => {
    mapArr[this.mapIndex].getPitch();
  };

  jumpTo = (options = {}) => {
    mapArr[this.mapIndex].jumpTo(options);
  };

  zoomIn = () => {
    mapArr[this.mapIndex].zoomIn();
  };
  zoomOut = () => {
    mapArr[this.mapIndex].zoomOut();
  };
  zoomTo = (zoomLevel) => {
    mapArr[this.mapIndex].zoomOut(zoomLevel);
  };

  rotateTo = (bearing) => {
    mapArr[this.mapIndex].rotateTo(bearing);
  };

  panTo = (lnglat) => {
    mapArr[this.mapIndex].panTo(lnglat);
  };

  flyTo = (options) => {
    mapArr[this.mapIndex].flyTo(options);
  };

  // 辅助计算
  unproject = (point) => mapArr[this.mapIndex].unproject(point);
  project = (lnglat) => mapArr[this.mapIndex].project(lnglat);

  point = TurfPoint;
  multiPoint = MultiPoint;
  lineString = LineString;
  multiLineString = MultiLineString;
  polygon = TurfPolygon;
  multiPolygon = MultiPolygon;
  polygon3d = TurfPolygon;
  multiPolygon3d = MultiPolygon;
  featureCollection = FeatureCollection;

  randomPoint = (count, boundingBox) =>
    RandomPoint(count, { bbox: boundingBox });

  randomLineString = (count, options = {}) => {
    const { boundingBox, verticesNum, maxLength, maxRotation } = options;
    RandomLineString(count, {
      num_vertices: verticesNum,
      max_length: maxLength,
      max_rotation: maxRotation,
      bbox: boundingBox,
    });
  };

  midPoint = MidPoint;

  randomPolygon = (count, options = {}) => {
    const { verticesNum, maxRadialLen, boundingBox } = options;
    RandomPolygon(count, {
      num_vertices: verticesNum,
      max_radial_length: maxRadialLen,
      bbox: boundingBox,
    });
  };

  pointCenter = PointCenter;

  pointDistance = (from, to, units = 'kilometers') =>
    PointDistance(from, to, { units });

  lineLength = (lineString, units = 'kilometers') =>
    LineLength(lineString, { units });

  polygonArea = PolygonArea;

  point2LineDistance = (pt, line, units = 'kilometers') =>
    Point2LineDistance((pt, line, { units }));

  nearestPointOnLine = (lines, point) =>
    NearestPointOnLine(lines, point, { units: 'kilometers' });

  alongLine = (lineString, distance, units = 'kilometers') =>
    AlongLine(lineString, distance, { units });

  pointInPolygon = PointInPolygon;

  sector = Sector;

  convex = Convex;

  polygonIntersect = PolygonIntersect;

  polygonUnion = PolygonUnion;

  polygonDiff = PolygonDiff;

  // 地图事件回调
  onResize = (callback) =>
    mapArr[this.mapIndex].on('resize', (ev) => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type,
      });
    });

  onMouseDown = (callback) =>
    mapArr[this.mapIndex].on('mousedown', (ev) => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type,
      });
    });

  onMouseUp = (callback) =>
    mapArr[this.mapIndex].on('mouseup', (ev) => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type,
      });
    });

  onMouseOver = (callback) =>
    mapArr[this.mapIndex].on('mouseover', (ev) => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type,
      });
    });

  onMouseOut = (callback) =>
    mapArr[this.mapIndex].on('mouseout', (ev) => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type,
      });
    });

  onMouseMove = (callback) =>
    mapArr[this.mapIndex].on('mousemove', (ev) => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type,
      });
    });

  onClick = (callback) =>
    mapArr[this.mapIndex].on('click', (ev) => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type,
      });
    });

  onDblClick = (callback) =>
    mapArr[this.mapIndex].on('dblclick', (ev) => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type,
      });
    });

  onContextMenu = (callback) =>
    mapArr[this.mapIndex].on('contextmenu', (ev) => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type,
      });
    });

  onDrag = (callback) =>
    mapArr[this.mapIndex].on('drag', (ev) => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type,
      });
    });

  onZoom = (callback) =>
    mapArr[this.mapIndex].on('zoom', (ev) => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type,
      });
    });

  onRotate = (callback) =>
    mapArr[this.mapIndex].on('rotate', (ev) => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type,
      });
    });

  onPitch = (callback) =>
    mapArr[this.mapIndex].on('pitch', (ev) => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type,
      });
    });

  onMove = (callback) =>
    mapArr[this.mapIndex].on('move', (ev) => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type,
      });
    });

  onMoveEnd = (callback) =>
    mapArr[this.mapIndex].on('moveend', (ev) => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type,
      });
    });

  onLoad = (callback) =>
    mapArr[this.mapIndex].on('load', (ev) => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type,
      });
    });

  // 图层事件回调
  onLayerMousedown = (layerId, callback) =>
    mapArr[this.mapIndex].on('mousedown', layerId, (ev) => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type,
      });
    });

  onLayerMouseUp = (layerId, callback) =>
    mapArr[this.mapIndex].on('mouseup', layerId, (ev) => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type,
      });
    });

  onLayerMouseOver = (layerId, callback) =>
    mapArr[this.mapIndex].on('mouseover', layerId, (ev) => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type,
      });
    });

  onLayerMouseOut = (layerId, callback) =>
    mapArr[this.mapIndex].on('mouseout', layerId, (ev) => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type,
      });
    });

  onLayerMouseMove = (layerId, callback) =>
    mapArr[this.mapIndex].on('mousemove', layerId, (ev) => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type,
      });
    });

  onLayerClick = (layerId, callback) =>
    mapArr[this.mapIndex].on('click', layerId, (ev) => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type,
      });
    });

  onLayerDblClick = (layerId, callback) =>
    mapArr[this.mapIndex].on('dblclick', layerId, (ev) => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type,
      });
    });

  onLayerContextMenu = (layerId, callback) =>
    mapArr[this.mapIndex].on('contextmenu', layerId, (ev) => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type,
      });
    });
}
