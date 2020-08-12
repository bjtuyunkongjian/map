/**
 * @author sl 2019-01-02
 * 底图
 */

import mapboxgl from 'mapbox-gl';
import { AddLevel } from 'tuyun-utils';
import React, { Component } from 'react';

import BaseStyle from './map-styles/light-sd';
import AddLevels from './add-levels';

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
        ref={(_el) => (this._mapContainer = _el)}
      />
    );
  }

  _init = () => {
    window._MAP_ = this.map = new mapboxgl.Map({
      hash: true,
      container: this._mapContainer,
      style: BaseStyle,
      showTileBoundaries: true,
      center: [117.084182, 36.682856],
      zoom: 15,
      pitch: 60,
      minZoom: 7,
      maxZoom: 20,
      localIdeographFontFamily: '黑体',
      preserveDrawingBuffer: true,
    });
    this.map
      .on('style.load', () => {
        this._addSourceFunc(); // 增加图层组
      })
      .on('zoomend', () => {
        this._addSourceFunc();
      });
    this._loadLayer();
  };

  _addSourceFunc = () => {
    for (let item of AddLevels) {
      AddLevel(this.map, item);
    }
  };

  _loadLayer = () => {
    setTimeout(() => {
      this.map.flyTo({ zoom: 17 });
    }, 5000);
  };
}
