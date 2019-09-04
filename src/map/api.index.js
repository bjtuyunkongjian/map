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
  featureCollection as FeatureCollection
} from 'turf';

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

  addCircleLayer = (source, layerId, option = {}) =>
    AddCircleLayer(mapArr[this.mapIndex], source, layerId, option);

  addLineLayer = (source, layerId, option = {}) =>
    AddLineLayer(mapArr[this.mapIndex], source, layerId, option);

  addPolygonLayer = (source, layerId, option = {}) =>
    AddPolygonLayer(mapArr[this.mapIndex], source, layerId, option);

  add3dLayer = (source, layerId, option = {}) =>
    Add3dLayer(mapArr[this.mapIndex], source, layerId, option);

  addTextLayer = (source, layerId, option = {}) =>
    AddTextLayer(mapArr[this.mapIndex], source, layerId, option);

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

  panTo = latlng => {
    mapArr[this.mapIndex].panTo(latlng);
  };

  flyTo = options => {
    mapArr[this.mapIndex].flyTo(options);
  };

  // 辅助计算
  unproject = point => mapArr[this.mapIndex].unproject(point);
  project = latlng => mapArr[this.mapIndex].project(latlng);

  point = TurfPoint;
  multiPoint = MultiPoint;
  lineString = LineString;
  multiLineString = MultiLineString;
  polygon = TurfPolygon;
  multiPolygon = MultiPolygon;
  polygon3d = TurfPolygon;
  multiPolygon3d = MultiPolygon;
  featureCollection = FeatureCollection;

  // 回调
  onResize = callback => mapArr[this.mapIndex].on('resize', callback);
}

window.TyMap = TyMap;
