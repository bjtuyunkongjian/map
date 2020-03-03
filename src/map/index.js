/**
 * @author sl 2019-01-02
 * 底图
 */

import mapboxgl from 'mapbox-gl';
import { AddLevel } from 'tuyun-utils';
import React, { Component } from 'react';

import BaseStyle from './map-styles/light-sd';
import AddLevels from './add-levels';
<<<<<<< HEAD
// import CustomLayer from './radar';
import CustomLayer from './custom-layer';
=======
// import CustomLayer from './police';
>>>>>>> 62020640e3bd2dc99649f75ad703bf70637b7862

export default class MapBoxDemo extends Component {
  componentDidMount() {
    this._init();
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
      <div
        style={{ width: '100%', height: '100%' }}
        ref={_el => (this._mapContainer = _el)}
      />
    );
  }

  _init = () => {
    window._MAP_ = this.map = new mapboxgl.Map({
      hash: true,
      container: this._mapContainer,
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
        // for (let i = 0; i < 1; i++) {
        //   this.map.addLayer(
        //     new CustomLayer({
        //       id: '3d-model-policeman-obj-' + i,
        //       height: 21,
        //       center: [117.03147871 + i / 11100, 36.67556967 + i / 11100]
        //     })
        //   );
        // }
      })
      .on('zoomend', () => {
        this._addSourceFunc();
      })
      // 添加的
      .on('moveend', () => {
        const _bounds = this.map.getBounds();
        const _minLng = _bounds._sw.lng;
        const _diffLng = _bounds._ne.lng - _bounds._sw.lng;
        const _minLat = _bounds._sw.lat;
        const _diffLat = _bounds._ne.lat - _bounds._sw.lat;
        for (let i = 0; i < 50; i++) {
          const lng = _minLng + Math.random() * _diffLng;
          const lat = _minLat + Math.random() * _diffLat;
          this.map.removeLayer('aaaaa' + i);
          this.map.addLayer(
            new CustomLayer(lng, lat, 0, 'aaaaa' + i),
            'GHYDPL_7L_NAME'
          );
        }
      });
  };

  _addSourceFunc = () => {
    for (let item of AddLevels) {
      AddLevel(this.map, item);
    }
  };
}
