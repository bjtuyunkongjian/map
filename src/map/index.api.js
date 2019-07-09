import mapboxgl from 'mapbox-gl';
import { AddLevel, AddCircleLayer } from 'tuyun-utils';
import {
  point as TurfPoint,
  featureCollection as FeatureCollection
} from 'turf';

import AddLevels from './add-levels';

import BaseStyle from './map-styles/light-sd';

class TyMap {
  constructor(container) {
    this.container = container;
    createMap.call(this);
  }

  addCircleLayer = (source, layerId, option = {}) => {
    this.map.on('style.load', () => {
      AddCircleLayer(this.map, source, layerId, option);
    });
  };

  point = ([x, y], feature) => TurfPoint([x, y], feature); // 生成点数据

  featureCollection = geometry => FeatureCollection(geometry);
}

function createMap() {
  this.map = new mapboxgl.Map({
    hash: true,
    container: this.container,
    style: BaseStyle,
    showTileBoundaries: true,
    center: [117.0856, 36.6754],
    zoom: 11,
    minZoom: 7,
    maxZoom: 20,
    localIdeographFontFamily: '黑体'
  });

  this.map
    .on('style.load', () => {
      addSourceFunc.call(this); // 增加图层组
    })
    .on('zoomend', () => {
      addSourceFunc.call(this); // 增加图层组
    });
}

function addSourceFunc() {
  for (let item of AddLevels) {
    AddLevel(this.map, item);
  }
}

window.TyMap = TyMap;
