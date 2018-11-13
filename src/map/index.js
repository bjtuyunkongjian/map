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
import addGeojson from './addGeojson';

export default class MapBoxDemo extends Component {

  componentDidMount() {
    this._init();
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return <div style = {
      {
        width: '100%',
        height: '100%'
      }
    }
    ref = {
      el => this.mapContainer = el
    }
    />
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
      this.zoom = Math.ceil(this.map.getZoom()); // 设置起初缩放等级
      this._addSourceFunc(); // 增加图层组
      this._loadRoadSource(); // 添加道路图层
    }).on('zoomend', () => {
      this._addSourceFunc();
      const _zoom = Math.ceil(this.map.getZoom()); // 当前缩放等级
      const _bounds = this.map.getBounds();
      if (Math.abs(_zoom - this.zoom) >= 1 ||
        this.boundsArr[0][0] > _bounds._sw.lng ||
        this.boundsArr[0][1] < _bounds._ne.lat ||
        this.boundsArr[1][0] < _bounds._ne.lng ||
        this.boundsArr[1][1] > _bounds._sw.lat) {
        this.zoom = _zoom;
        this._loadRoadSource();
      }
    }).on('mouseup', () => {
      const _center = this.map.getCenter(); // 当前中心点位置
      const {
        lat = 0, lng = 0
      } = this.center || {};

      if (Math.abs(_center.lat - lat) > this.haloLatDiff ||
        Math.abs(_center.lng - lng) > this.halfLngDiff) {
        this.center = _center;
        this._loadRoadSource();
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

    this.boundsArr = [
      [bounds._sw.lng - this.halfLngDiff, bounds._ne.lat + this.haloLatDiff], // 左上角
      [bounds._ne.lng + this.halfLngDiff, bounds._sw.lat - this.haloLatDiff] // 右下角
    ];
    const {
      res
    } = await FetchRequest({
      url: 'road',
      method: 'POST',
      body: {
        bounds: this.boundsArr,
        zoom
      }
    });
    this._addRoad(res);
  }

  _addRoad(data) {
    for (let item of addGeojson) {
      if (!this.map.getSource(item.sourceName)) {
        this.map.addSource(item.sourceName, {
          type: "geojson",
          data: data[item.dataName]
        });
        for (let layer of item.layers) {
          this.map.addLayer(layer, layer.labelLayerId);
        }
      } else {
        this.map.getSource(item.sourceName).setData(data[item.dataName]);
      }
    }
  }
}