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
      minZoom: 16,
      maxZoom: 17.49,
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
    // this._getGeojson();
    // this.map.on('moveend', this._getGeojson);
  };

  _getGeojson = async () => {
    const _zoom = this.map.getZoom();
    if (_zoom < 15) return;
    const _bounds = this.map.getBounds();
    const _url = `mod/getPointKey?minX=${_bounds._sw.lng}&minY=${_bounds._sw.lat}&maxX=${_bounds._ne.lng}&maxY=${_bounds._ne.lat}`;
    const { res, err } = await FetchRequest({
      host: 'http://192.168.251.15:8889/',
      url: _url,
    });
    if (!res || err) return;
    const _features = res.map((item) => {
      return { type: 'Feature', geometry: item };
    });
    const layerId = 'building-bottom-undefined';
    if (!this.map.getSource(layerId)) {
      this.map.addLayer(
        {
          id: layerId,
          type: 'fill',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: _features,
            },
          },
          layout: {},
          paint: {
            'fill-color': '#fff',
          },
        },
        'guodao_bg'
      );
    } else {
      this.map.getSource(layerId).setData({
        type: 'FeatureCollection',
        features: _features,
      });
    }
  };
}
