import mapboxgl from 'mapbox-gl';

import BaseStyle from './map-styles/light-sd';
import AddLevels from './add-levels';
import {
  AddLevel,
  AddCircleLayer,
  AddPolygonLayer,
  AddTextLayer,
  Add3dLayer,
  AddLineLayer,
  RemoveLayer
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
  difference as PolygonDiff
} from '@turf/turf';

const mapArr = [];

class TyMap {
  constructor(container, options = {}) {
    const {
      hash = true,
      center = [117.0856, 36.6754],
      zoom = 11,
      pitch = 0,
      bearing = 0
    } = options;
    const map = new mapboxgl.Map({
      style: BaseStyle,
      container: container,
      hash,
      center,
      zoom,
      pitch,
      bearing,
      minZoom: 7,
      maxZoom: 20,
      localIdeographFontFamily: '黑体'
    });

    this.mapIndex = mapArr.length;
    mapArr.push(map);
  }

  _addSourceFunc = () => {
    for (let item of AddLevels) {
      AddLevel(this.map, item);
    }
  };

  resize = () => mapArr[this.mapIndex].resize();

  getBounds = () => mapArr[this.mapIndex].getBounds();

  setMaxBounds = bounds => {
    mapArr[this.mapIndex].setMaxBounds(bounds); // 不提供返回值
  };
  getMaxBounds = () => mapArr[this.mapIndex].getMaxBounds();

  setMinZoom = zoomLevel => {
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
  querySourceFeatures = id => mapArr[this.mapIndex].querySourceFeatures(id);

  getLayer = layerId => mapArr[this.mapIndex].getLayer(layerId);

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

  setFilter = (layerId, filterExpress) => {
    mapArr[this.mapIndex].setFilter(layerId, filterExpress);
  };

  removeLayer = layerId => RemoveLayer(mapArr[this.mapIndex], layerId);

  setCenter = center => {
    mapArr[this.mapIndex].setCenter(center);
  };
  getCenter = () => mapArr[this.mapIndex].getCenter();

  setZoom = zoomLevel => {
    mapArr[this.mapIndex].setZoom(zoomLevel);
  };
  getZoom = () => {
    mapArr[this.mapIndex].getZoom();
  };

  setBearing = bearing => {
    mapArr[this.mapIndex].setBearing(bearing);
  };
  getBearing = () => {
    mapArr[this.mapIndex].getBearing();
  };

  setPitch = pitch => {
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
  zoomTo = zoomLevel => {
    mapArr[this.mapIndex].zoomOut(zoomLevel);
  };

  rotateTo = bearing => {
    mapArr[this.mapIndex].rotateTo(bearing);
  };

  panTo = lnglat => {
    mapArr[this.mapIndex].panTo(lnglat);
  };

  flyTo = options => {
    mapArr[this.mapIndex].flyTo(options);
  };

  // 辅助计算
  unproject = point => mapArr[this.mapIndex].unproject(point);
  project = lnglat => mapArr[this.mapIndex].project(lnglat);

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
      bbox: boundingBox
    });
  };

  midPoint = MidPoint;

  randomPolygon = (count, options = {}) => {
    const { verticesNum, maxRadialLen, boundingBox } = options;
    RandomPolygon(count, {
      num_vertices: verticesNum,
      max_radial_length: maxRadialLen,
      bbox: boundingBox
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
  onResize = callback => mapArr[this.mapIndex].on('resize', callback);

  onMouseDown = callback => mapArr[this.mapIndex].on('mousedown', callback);

  onMouseUp = callback => mapArr[this.mapIndex].on('mouseup', callback);

  onMouseOver = callback => mapArr[this.mapIndex].on('mouseover', callback);

  onMouseOut = callback => mapArr[this.mapIndex].on('mouseout', callback);

  onMouseMove = callback => mapArr[this.mapIndex].on('mousemove', callback);

  onClick = callback => mapArr[this.mapIndex].on('click', callback);

  onDblClick = callback => mapArr[this.mapIndex].on('dblclick', callback);

  onContextMenu = callback => mapArr[this.mapIndex].on('contextmenu', callback);

  onDrag = callback => mapArr[this.mapIndex].on('drag', callback);

  onZoom = callback => mapArr[this.mapIndex].on('zoom', callback);

  onRotate = callback => mapArr[this.mapIndex].on('rotate', callback);

  onPitch = callback => mapArr[this.mapIndex].on('pitch', callback);

  onMove = callback => mapArr[this.mapIndex].on('move', callback);

  onMoveEnd = callback => mapArr[this.mapIndex].on('moveend', callback);

  onLoad = callback => mapArr[this.mapIndex].on('load', callback);

  // 图层事件回调
  onLayerMousedown = (layerId, callback) =>
    mapArr[this.mapIndex].on('mousedown', layerId, callback);

  onLayerMouseUp = (layerId, callback) =>
    mapArr[this.mapIndex].on('mouseup', layerId, callback);

  onLayerMouseOver = (layerId, callback) =>
    mapArr[this.mapIndex].on('mouseover', layerId, callback);

  onLayerMouseOut = (layerId, callback) =>
    mapArr[this.mapIndex].on('mouseout', layerId, callback);

  onLayerMouseMove = (layerId, callback) =>
    mapArr[this.mapIndex].on('mousemove', layerId, callback);

  onLayerClick = (layerId, callback) =>
    mapArr[this.mapIndex].on('click', layerId, callback);

  onLayerDblClick = (layerId, callback) =>
    mapArr[this.mapIndex].on('dblclick', layerId, callback);

  onLayerContextMenu = (layerId, callback) =>
    mapArr[this.mapIndex].on('contextmenu', layerId, callback);
}
window.TyMap = TyMap;
