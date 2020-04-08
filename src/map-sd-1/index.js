/**
 * @author sl 2019-01-02
 * 底图
 */

import mapboxgl from 'mapbox-gl';
import React, { Component } from 'react';

import MapStyles from './map-styles';

export default class MapBoxDemo extends Component {
  componentDidMount = () => this._init();

  componentWillUnmount = () => this.map.remove();

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
      style: MapStyles,
      showTileBoundaries: true,
      center: [117.0856, 36.6754],
      zoom: 11,
      pitch: 60,
      // bearing: -13.6,
      minZoom: 7,
      maxZoom: 20,
      localIdeographFontFamily: '黑体',
    });
  };
}
