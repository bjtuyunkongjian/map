/**
 * @author sl 2019-01-02
 */

import mapboxgl from 'mapbox-gl';
import {
  addLevel,
  FetchRequest
} from 'tuyun-utils';
import React, {
  Component
} from 'react';

import baseStyle from './styles/light-sd';
import addLevels from './addLevels';


export default class MapBoxDemo extends Component {

  componentDidMount() {
    this._init();
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return <div style={{width: '100%', height: '100%'}} ref={el => this.mapContainer = el}/>
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
      this.center = this.map.getCenter(); // 设置起初中心点位置
      this.zoom = this.map.getZoom(); // 设置起初缩放等级
      this._addSourceFunc(); // 增加图层组
      // this._loadRoadSource(); // 添加道路图层
    }).on('zoom', () => {
      this._addSourceFunc();
      const _zoom = this.map.getZoom(); // 当前缩放等级
      if (Math.abs(_zoom - this.zoom) > 1) {
        this.zoom = _zoom;
        // this._loadRoadSource();
      }
    }).on('mouseup', () => {
      const _center = this.map.getCenter(); // 当前中心点位置
      const {
        lat = 0, lng = 0
      } = this.center || {};
      if (Math.abs(_center.lat - lat) > this.haloLatDiff ||
        Math.abs(_center.lng - lng) > this.halfLngDiff) {
        this.center = _center;
        // this._loadRoadSource();
      }
    });

    this.map.addControl(new mapboxgl.NavigationControl());
  }

  _addSourceFunc() {
    for (let item of addLevels) {
      addLevel(this.map, item);
    }
  }

  // 将国道、省道单独开来，临时处理
  async _loadRoadSource() {
    const bounds = this.map.getBounds();
    const zoom = this.map.getZoom();
    this.halfLngDiff = (bounds._ne.lng - bounds._sw.lng) / 2;
    this.haloLatDiff = (bounds._ne.lat - bounds._sw.lat) / 2;

    const boundsArr = [
      [bounds._sw.lng - this.halfLngDiff, bounds._ne.lat + this.haloLatDiff], // 左上角
      [bounds._ne.lng + this.halfLngDiff, bounds._sw.lat - this.haloLatDiff] // 右下角
    ];
    const {
      res
    } = await FetchRequest({
      url: 'road',
      method: 'POST',
      body: {
        bounds: boundsArr,
        zoom
      }
    });
    this._addRoadFunc(res);
  }

  _addRoadFunc(data) {
    if (!this.map.getSource('guodao-source')) {
      this.map
        .addSource("guodao-source", {
          "type": "geojson",
          "data": data.guodao
        })
        .addLayer({
          "id": "shengdao",
          type: 'line',
          source: 'guodao-source',
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
        .addLayer({
          id: 'GROALN_GAOGUO_MERGE_GD_NAME', // 国道名称
          type: 'symbol',
          source: 'guodao-source',
          layout: {
            'text-field': '{NAME}',
            visibility: 'visible',
            'symbol-placement': 'line',
            'text-font': ['Arial Unicode MS Bold'],
            'text-pitch-alignment': 'viewport',
            'symbol-spacing': 500,
            'text-rotation-alignment': 'map',
            'text-size': 12,
            'icon-rotation-alignment': 'viewport'
          },
          paint: {
            'text-color': 'rgba(65, 65, 65, 1)',
            'text-halo-width': 2,
            'text-halo-color': 'rgba(255, 255, 255, 1)'
          }
        });
    } else {
      this.map.getSource('guodao-source').setData(data.guodao);
    }
  }
}