import mapboxgl from 'mapbox-gl';

import { AddLevel } from 'tuyun-utils';

import BaseStyle from './map-styles/light-sd';

class TyMap {
  constructor(container) {
    this.map = new mapboxgl.Map({
      hash: true,
      container: container,
      style: BaseStyle,
      showTileBoundaries: true,
      center: [117.0856, 36.6754],
      zoom: 11,
      // pitch: 60,
      // bearing: -13.6,
      minZoom: 7,
      maxZoom: 20,
      localIdeographFontFamily: '黑体'
    });

    this.map
      .on('style.load', () => {
        this._addSourceFunc(); // 增加图层组
      })
      .on('zoomend', () => {
        this._addSourceFunc();
      });
  }

  _addSourceFunc = () => {
    for (let item of AddLevels) {
      AddLevel(this.map, item);
    }
  };
}

window.TyMap = TyMap;
