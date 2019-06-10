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
// import BusLayer from './bus';

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
    // 点击地图在控制台打出经纬度 15/36.6866/117.05608
    // this.map.on('mouseup', async e => {
    //   const _bounds = _MAP_.getBounds();
    //   const _xDiff = _bounds._ne.lng - _bounds._sw.lng;
    //   const _yDiff = _bounds._ne.lat - _bounds._sw.lat;
    //   console.log(
    //     'e.lngLat',
    //     e.lngLat,
    //     '屏幕范围精度差：',
    //     _xDiff,
    //     '屏幕范围纬度差：',
    //     _yDiff
    //   );
    // });
    // this.map.on('click', e => {
    //   console.log(e.lngLat);
    //   console.log(this.map.queryRenderedFeatures(e.point));
    // });
    this.map
      .on('style.load', () => {
        this._addSourceFunc(); // 增加图层组
        // this.map.addLayer(CustomLayer).addLayer(BusLayer);
      })
      .on('zoomend', () => {
        this._addSourceFunc();
      });
  };

  _addSourceFunc = () => {
    for (let item of AddLevels) {
      AddLevel(this.map, item);
    }
  };
}
