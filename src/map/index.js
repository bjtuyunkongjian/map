/**
 * @author sl 2019-01-02
 * 底图
 */

import mapboxgl from 'mapbox-gl';
import React, { Component } from 'react';

import BaseStyle from './map-styles/light-sd';
import JnData from './jinan';
import { FetchRequest } from './fetch';

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
      center: [117.0856, 36.6754],
      zoom: 7,
      // pitch: 60,
      // bearing: -13.6,
      minZoom: 7,
      maxZoom: 20,
      localIdeographFontFamily: '黑体',
      preserveDrawingBuffer: true,
    });

    this.map.on('style.load', () => {
      this.map.addLayer(
        {
          id: 'maine',
          type: 'fill',
          source: {
            type: 'geojson',
            data: {
              type: 'Feature',
              geometry: JnData,
            },
          },
          layout: {},
          paint: {
            'fill-color': '#fff',
            'fill-opacity': 0,
          },
        },
        'guodao_bg'
      );
    });
    this._getGeojson();
    this.map.on('moveend', this._getGeojson);
  };

  _getGeojson = async () => {
    // 192.168.251.15:8889/mod/getPointKey?minX=117.12036584415841&minY=36.64837283518824&maxX=118.12036584415841&maxY=37.64837283518824
    const _bounds = FetchRequest({
      host: 'http://192.168.251.15:8889',
      url:
        '/mod/getPointKey?minX=117.12036584415841&minY=36.64837283518824&maxX=118.12036584415841&maxY=37.64837283518824',
    });
  };
}
