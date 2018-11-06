/**
 * @author sl 2019-01-02
 */

import mapboxgl from 'mapbox-gl';
import { addLevel } from 'tuyun-utils';
import React, { Component } from 'react';

import baseStyle from './styles/light-sd';
import addLevels from './addLevels';

import groaln from './geojson/shengGDBt_cx';
import { div } from 'gl-matrix/src/gl-matrix/vec4';

export default class Map extends Component {
  componentDidMount() {
    this._init();
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return <div style={{ width: '100%', height: '100%' }} ref={el => this.mapContainer = el} />
  }

  _init() {
    this.map = new mapboxgl.Map({
      hash: true,
      container: this.mapContainer,
      style: baseStyle,
      showTileBoundaries: true,
      center: [118.034803, 36.80564],
      zoom: 18,
      pitch: 60,
      bearing: -13.6,
      minZoom: 7,
      maxZoom: 22,
      localIdeographFontFamily: "'黑体'"
    });
    // 点击地图在控制台打出经纬度
    this.map.on('mouseup', function (e) {
      console.log(e.lngLat);
    });

    this.map.on('load', () => {
      this.map.addLayer({
        id: 'road',
        type: 'line',
        source: {
          type: 'geojson',
          data: groaln
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-width': {
            base: 2,
            stops: [
              [7, 3],
              [8, 2],
              [9, 3],
              [10, 4],
              [11, 4],
              [12, 7],
              [13, 9],
              [14, 9],
              [15, 10],
              [16, 10],
              [17, 12],
              [18, 14],
              [19, 14],
              [20, 22],
              [21, 24],
              [22, 26]
            ]
          },
          'line-color': '#ffae00'
        }
      })
    });
    this.map.on('load', () => {
      this._addSourceFunc();
    }).on('zoom', () => { /* 为zoom事件添加监听器 */
      this._addSourceFunc();
    });

    this.map.addControl(new mapboxgl.NavigationControl());
  }

  _addSourceFunc() {
    for (let item of addLevels) {
      addLevel(this.map, item);
    }
  }
}