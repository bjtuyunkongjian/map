/**
 * @author sl 2019-01-02
 * 底图
 */

import mapboxgl from 'mapbox-gl';
import {
  AddLevel
  // FetchRequest
} from 'tuyun-utils';
import React, { Component } from 'react';

import BaseStyle from './map-styles/light-sd';
import AddLevels from './add-levels';
// import addGeojson from './add-geojson';
// import gaoguoGDB from './geojson/gaoguoGDB_cx';
import { FetchRoadInfo } from './webapi';

// import { TuyunMessage, TuyunTips } from 'tuyun-kit';
export default class MapBoxDemo extends Component {
  // _boundsArr = [[], []];

  componentDidMount() {
    this._init();
    // TuyunTips.show(
    //   '按住鼠标右键拖动可切换视角按住鼠标右键拖动可切换视角按住鼠标右键拖动可切换视角按住鼠标右键拖动可切换视角按住鼠标右键拖动可切换视角按住鼠标右键拖动可切换视角按住鼠标右键拖动可切换视角按住鼠标右键拖动可切换视角'
    // );
    // TuyunTips.show('按住鼠标右键拖动可切换视角');
    // TuyunTips.show('按住鼠标右键拖动可切换视角');
    // TuyunTips.show('按住鼠标右键拖动可切换视角');
    // TuyunMessage.success(
    //   'This is a success message.This is a success message.This is a success message.This is a success message.This is a success message.This is a success message.'
    // );
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
        ref={_el => (this._mapContainer = _el)}
      />
    );
  }

  _init() {
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
    // 点击地图在控制台打出经纬度
    this.map.on('mouseup', async e => {
      return;
      const _bound = this.map.getBounds();
      // return;
      // const _bound = {
      //   _sw: { lng: 117.1019026270979, lat: 36.6854218124963 },
      //   _ne: { lng: 117.10764598182999, lat: 36.689071027421065 }
      // };
      // const _bound = {
      //   _sw: { lng: 117.11268171525683, lat: 36.68840850415951 },
      //   _ne: { lng: 117.11389548462586, lat: 36.68917969389619 }
      // };
      console.log('开始');
      console.log('_bound', JSON.stringify(_bound));
      const _cood = e.lngLat;
      // const _cood = { lng: 117.10461050111405, lat: 36.68698578295317 };
      // const _cood = { lng: 117.11320188974429, lat: 36.688900196205964 };
      console.log(`%c ${JSON.stringify(_cood)}`, 'color: lightblue');
      console.log(
        `%c ~~~~~~~~~~~~~~~ 第 ${1} 次请求 ~~~~~~~~~~~~~~~`,
        'color: red'
      );
      let { res, err } = await FetchRoadInfo({
        coord: _cood,
        bound: _bound,
        order: 'first'
      });
      console.log('_fetchRes', { res, err });
      err && console.error(err);
      const _features = res.map(item => {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [item.coordinates[0].x, item.coordinates[0].y]
          },
          properties: {
            title: '点',
            icon: 'monument'
          }
        };
      });
      this.map.addLayer({
        id: 'points' + Math.random(),
        type: 'symbol',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: _features
          }
        },
        layout: {
          'text-field': '{title}',
          visibility: 'visible',
          'symbol-placement': 'point',
          'text-size': 24,
          'icon-text-fit': 'both',
          'text-justify': 'center',
          'text-font': ['黑体'],
          'text-pitch-alignment': 'viewport',
          'text-rotation-alignment': 'viewport',
          'icon-rotation-alignment': 'viewport',
          'text-anchor': 'center',
          'text-keep-upright': false
        }
      });

      // 2
      let _points = res;
      console.log(
        `%c ~~~~~~~~~~~~~~~ 第 ${2} 次请求 ~~~~~~~~~~~~~~~`,
        'color: green'
      );
      console.log(
        '_points',
        _points,
        _points.filter(item => item.startPoint)[0]
      );

      let _param = {
        prev: _points.filter(item => item.startPoint)[0] || _points[0],
        suff: _points[1],
        points: _points,
        order: 'firstPlus'
      };
      let _fetchRes = await FetchRoadInfo(_param);
      console.log('_fetchRes', _fetchRes);
      res = _fetchRes.res;
      err = _fetchRes.err;
      if (!res || res.length === 0) {
        console.error(`第 ${2} 次报错了`);
        return;
      }
      // 第三次开始
      for (let i = 0; i < 10; i++) {
        _points = res.filter(item => item.type === 'Point');
        console.log(
          `%c ~~~~~~~~~~~~~~~ 第 ${3 + i} 次请求 ~~~~~~~~~~~~~~~`,
          `color: ${i % 2 === 0 ? 'red' : 'green'}`
        );
        console.log('_points', _points);
        _param = {
          prev: _points[0],
          suff: _points[1],
          points: _points,
          order: 'firstPlus'
        };
        _fetchRes = await FetchRoadInfo(_param);
        console.log('_fetchRes', _fetchRes);
        res = _fetchRes.res;
        err = _fetchRes.err;

        if (!res || res.length === 0) {
          console.error(`第${i + 3}次报错了`);
          return;
        }
      }
    });

    this.map
      .on('load', () => {
        this.zoom = Math.ceil(this.map.getZoom()); // 设置起初缩放等级
        this._addSourceFunc(); // 增加图层组
        // this._loadRoadSource(); // 添加道路图层
      })
      .on('zoomend', () => {
        // const _zoom = Math.ceil(this.map.getZoom()); // 当前缩放等级
        // const _bounds = this.map.getBounds();
        // if (
        //   Math.abs(_zoom - this.zoom) >= 1 ||
        //   this._boundsArr[0][0] > _bounds._sw.lng ||
        //   this._boundsArr[0][1] < _bounds._ne.lat ||
        //   this._boundsArr[1][0] < _bounds._ne.lng ||
        //   this._boundsArr[1][1] > _bounds._sw.lat
        // ) {
        //   this.zoom = _zoom;
        //   // this._loadRoadSource(); // 添加道路图层
        // }
        this._addSourceFunc();
      });
    // 拖出浏览器事件
    // document.addEventListener('mouseup', () => {
    //   const _bounds = this.map.getBounds();
    //   if (
    //     this._boundsArr[0][0] > _bounds._sw.lng ||
    //     this._boundsArr[0][1] < _bounds._ne.lat ||
    //     this._boundsArr[1][0] < _bounds._ne.lng ||
    //     this._boundsArr[1][1] > _bounds._sw.lat
    //   ) {
    //     this._loadRoadSource(); // 添加道路图层
    //   }
    // });

    // 添加
    // this.map.addControl(new mapboxgl.NavigationControl(), 'bottom-right');
  }

  _addSourceFunc() {
    for (let item of AddLevels) {
      AddLevel(this.map, item);
    }
  }

  // 将国道、省道单独开来，临时处理
  // async _loadRoadSource() {
  //   const _zoom = this.map.getZoom();
  //   const _bounds = this.map.getBounds();
  //   const _halfLngDiff = (_bounds._ne.lng - _bounds._sw.lng) / 2;
  //   const _haloLatDiff = (_bounds._ne.lat - _bounds._sw.lat) / 2;

  //   this._boundsArr = [
  //     [_bounds._sw.lng - _halfLngDiff, _bounds._ne.lat + _haloLatDiff], // 左上角
  //     [_bounds._ne.lng + _halfLngDiff, _bounds._sw.lat - _haloLatDiff] // 右下角
  //   ];
  //   const { res } = await FetchRequest({
  //     url: 'road',
  //     method: 'POST',
  //     body: {
  //       _bounds: this._boundsArr,
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
