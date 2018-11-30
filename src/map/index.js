/**
 * @author sl 2019-01-02
 */

import mapboxgl from 'mapbox-gl';
import {
  addLevel
  // FetchRequest
} from 'tuyun-utils';
import React, { Component } from 'react';

import baseStyle from './map-styles/light-sd';
import addLevels from './add-levels';
// import addGeojson from './add-geojson';
// import gaoguoGDB from './geojson/gaoguoGDB_cx';

// import { TuyunMessage } from "tuyun-kit";
export default class MapBoxDemo extends Component {
  boundsArr = [[], []];

  componentDidMount() {
    this._init();
    // TuyunMessage.show('This is a message.');
    // TuyunMessage.success('This is a success message.');
    // TuyunMessage.warning('This is a warning message.');
    // TuyunMessage.info('This is an info message.');
    // TuyunMessage.error('This is an error message.');
  }

  componentWillUnmount() {
    this.map.remove();
  }

  render() {
    return (
      <div
        style={{ width: '100%', height: '100%' }}
        ref={el => (this.mapContainer = el)}
      />
    );
  }

  _init() {
    window._MAP_ = this.map = new mapboxgl.Map({
      hash: true,
      container: this.mapContainer,
      style: baseStyle,
      showTileBoundaries: true,
      center: [117.0856, 36.6754],
      zoom: 11,
      // pitch: 60,
      // bearing: -13.6,
      minZoom: 7,
      maxZoom: 20,
      localIdeographFontFamily: "'黑体'"
    });
    // 点击地图在控制台打出经纬度
    // this.map.on("mouseup", function(e) {
    //   console.log(e.lngLat);
    // });

    this.map
      .on('load', () => {
        this.zoom = Math.ceil(this.map.getZoom()); // 设置起初缩放等级
        this._addSourceFunc(); // 增加图层组
        // this._loadRoadSource(); // 添加道路图层
      })
      .on('zoomend', () => {
        const _zoom = Math.ceil(this.map.getZoom()); // 当前缩放等级
        const _bounds = this.map.getBounds();
        if (
          Math.abs(_zoom - this.zoom) >= 1 ||
          this.boundsArr[0][0] > _bounds._sw.lng ||
          this.boundsArr[0][1] < _bounds._ne.lat ||
          this.boundsArr[1][0] < _bounds._ne.lng ||
          this.boundsArr[1][1] > _bounds._sw.lat
        ) {
          this.zoom = _zoom;
          // this._loadRoadSource(); // 添加道路图层
        }
        this._addSourceFunc();
      });
    // 拖出浏览器事件
    // document.addEventListener('mouseup', () => {
    //   const _bounds = this.map.getBounds();
    //   if (
    //     this.boundsArr[0][0] > _bounds._sw.lng ||
    //     this.boundsArr[0][1] < _bounds._ne.lat ||
    //     this.boundsArr[1][0] < _bounds._ne.lng ||
    //     this.boundsArr[1][1] > _bounds._sw.lat
    //   ) {
    //     this._loadRoadSource(); // 添加道路图层
    //   }
    // });

    this.map.addControl(new mapboxgl.NavigationControl());
  }

  _addSourceFunc() {
    for (let item of addLevels) {
      addLevel(this.map, item);
    }
  }

  // 将国道、省道单独开来，临时处理
  // async _loadRoadSource() {
  //   const _zoom = this.map.getZoom();
  //   const bounds = this.map.getBounds();
  //   const _halfLngDiff = (bounds._ne.lng - bounds._sw.lng) / 2;
  //   const _haloLatDiff = (bounds._ne.lat - bounds._sw.lat) / 2;

  //   this.boundsArr = [
  //     [bounds._sw.lng - _halfLngDiff, bounds._ne.lat + _haloLatDiff], // 左上角
  //     [bounds._ne.lng + _halfLngDiff, bounds._sw.lat - _haloLatDiff] // 右下角
  //   ];
  //   const { res } = await FetchRequest({
  //     url: 'road',
  //     method: 'POST',
  //     body: {
  //       bounds: this.boundsArr,
  //       zoom: _zoom
  //     }
  //   });

  //   // if (_zoom < 12) {
  //   //   res.guodao = gaoguoGDB;
  //   // }
  //   this._addRoad(res);
  // }

  // _addRoad(data) {
  //   for (let item of addGeojson) {
  //     if (!this.map.getSource(item.sourceName)) {
  //       this.map.addSource(item.sourceName, {
  //         type: 'geojson',
  //         data: data[item.dataName]
  //       });
  //       for (let layer of item.layers) {
  //         this.map.addLayer(layer, layer.labelLayerId);
  //       }
  //     } else {
  //       this.map.getSource(item.sourceName).setData(data[item.dataName]);
  //     }
  //   }
  // }
}
