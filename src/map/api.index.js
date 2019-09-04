import mapboxgl from 'mapbox-gl';

import BaseStyle from './map-styles/light-sd';
import AddLevels from './add-levels';
import {
  AddLevel,
  AddCircleLayer,
  AddNamePlateLayer,
  AddPolygonLayer,
  AddTextLayer,
  Add3dLayer,
  AddLineLayer,
  AddHeatMapLayer,
  AddImageLayer
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

  setMaxBounds = bounds => mapArr[this.mapIndex].setMaxBounds(bounds);
  getMaxBounds = () => mapArr[this.mapIndex].getMaxBounds();

  setMinZoom = zoomLevel => mapArr[this.mapIndex].setMinZoom(zoomLevel);
  getMinZoom = () => mapArr[this.mapIndex].getMinZoom();

  setMaxZoom = () => mapArr[this.mapIndex].setMaxZoom(zoomLevel);
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
}

window.TyMap = TyMap;
