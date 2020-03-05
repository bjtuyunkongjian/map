/**
 * @author sl 2019-01-02
 * 底图
 */

import mapboxgl from 'mapbox-gl';
import { AddLevel } from 'tuyun-utils';
import React, { Component } from 'react';

import BaseStyle from './map-styles/light-sd';
import AddLevels from './add-levels';
// import CustomLayer from './radar';
import CustomLayer from './custom-layer';

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
        ////// 加载 n 个，位置当前屏幕随机的位置
        // const _bounds = this.map.getBounds();
        // const _minLng = _bounds._sw.lng;
        // const _diffLng = _bounds._ne.lng - _bounds._sw.lng;
        // const _minLat = _bounds._sw.lat;
        // const _diffLat = _bounds._ne.lat - _bounds._sw.lat;
        // const gltfUrl = './static/test.gltf';
        // console.log(this.map.getCenter());
        // for (let i = 0; i < 10; i++) {
        //   const lng = _minLng + Math.random() * _diffLng;
        //   const lat = _minLat + Math.random() * _diffLat;
        //   this.map.addLayer(
        //     new CustomLayer(lng, lat, 0, 'aaaaa' + i, gltfUrl),
        //     'GHYDPL_7L_NAME'
        //   );
        // }
        ////// 加载到正中心
        const gltfUrl = './static/test5.gltf';
        const { lat, lng } = this.map.getCenter();
        this.map.addLayer(
          new CustomLayer(lng, lat, 0, 'aaaaa', gltfUrl),
          'GHYDPL_7L_NAME'
        );
      })
      .on('zoomend', () => {
        this._addSourceFunc();
      });
    // 添加的
    // .on('moveend', () => {
    //   const _bounds = this.map.getBounds();
    //   const _minLng = _bounds._sw.lng;
    //   const _diffLng = _bounds._ne.lng - _bounds._sw.lng;
    //   const _minLat = _bounds._sw.lat;
    //   const _diffLat = _bounds._ne.lat - _bounds._sw.lat;
    //   const gltfUrl = 'http://47.110.135.245:12808/static/test.gltf';
    //   for (let i = 0; i < 50; i++) {
    //     const lng = _minLng + Math.random() * _diffLng;
    //     const lat = _minLat + Math.random() * _diffLat;
    //     this.map.removeLayer('aaaaa' + i);
    //     this.map.addLayer(
    //       new CustomLayer(lng, lat, 0, 'aaaaa' + i, gltfUrl),
    //       'GHYDPL_7L_NAME'
    //     );
    //   }
    // });
  };

  _addSourceFunc = () => {
    for (let item of AddLevels) {
      AddLevel(this.map, item);
    }
  };
}
