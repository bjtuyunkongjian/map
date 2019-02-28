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
import { point as TurfPoint } from 'turf';
import { center } from 'turf';
// import { TuyunMessage, TuyunTips } from 'tuyun-kit';

export default class MapBoxDemo extends Component {
  // _boundsArr = [[], []];

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
    // 点击地图在控制台打出经纬度
    // this.map.on('mouseup', async e => {
    //   console.log('e.lngLat', e.lngLat);
    // });
    // this.map.on('mouseup', 'GRESPL_1_3D', e => {
    //   console.log('e.lngLat', e.features);
    // });
    // this.map.on('mouseup', 'GRESPL_2_3D', e => {
    //   console.log('e.lngLat', e.features);
    // });
    // this.map.on('mouseup', 'GRESPL_3_3D', e => {
    //   console.log('e.lngLat', e.features);
    // });
    _MAP_.on('click', 'POI_LEVEL_15_CAMERA', e => {
      const num = e.features[0].properties.NUMBER;
      // console.log(e.features[0].properties);
      fetch('http://localhost:8000/camera?url=' + num);
    });
    // this.map.on('click', '9L_zgd', e => {
    //   console.log(JSON.stringify(e.features[0].geometry));
    // });
    // this.map.on('click', 'gjl', e => {
    //   console.log(JSON.stringify(e.features[0].geometry));
    // });
    this.map
      .on('load', () => {
        this.zoom = Math.ceil(this.map.getZoom()); // 设置起初缩放等级
        this._addSourceFunc(); // 增加图层组
        // this._loadRoadSource(); // 添加道路图层

        // const _features = [];
        // let _long = 117.037292;
        // let _lat = 36.655261;
        // for (let i = 0; i < 50; i++) {
        //   let _r = 0;
        //   _long += (Math.random() - 0.5) / 100;
        //   _lat += (Math.random() - 0.5) / 100;
        //   for (let j = 0; j < 1000; j++) {
        //     const _theta = Math.random() * Math.PI * 2;
        //     const _dr = 0.0002 * (Math.random() - 0.5);
        //     _r += _dr;
        //     const coords = [
        //       _long + _r * Math.cos(_theta),
        //       _lat + _r * Math.sin(_theta)
        //     ];
        //     _features.push(
        //       TurfPoint(coords, { count: (Math.random() * 10000).toFixed(0) })
        //     );
        //   }
        // }
        // const _geoJSONData = {
        //   type: 'geojson',
        //   data: {
        //     type: 'FeatureCollection',
        //     features: _features
        //   }
        // };
        // _MAP_.addLayer(
        //   {
        //     id: 'heat',
        //     type: 'heatmap',
        //     source: _geoJSONData,
        //     paint: {
        //       'heatmap-color': [
        //         'interpolate',
        //         ['linear'],
        //         ['heatmap-density'],
        //         0,
        //         'rgba(33,102,172,0)',
        //         0.5,
        //         'green',
        //         0.8,
        //         'yellow',
        //         1,
        //         'red'
        //       ],
        //       // Adjust the heatmap radius by zoom level
        //       'heatmap-radius': 5,
        //       // Transition from heatmap to circle layer by zoom level
        //       'heatmap-opacity': 1
        //     }
        //   },
        //   'line-gd-ref'
        // );
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
  };

  _addSourceFunc = () => {
    for (let item of AddLevels) {
      AddLevel(this.map, item);
    }
  };

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
