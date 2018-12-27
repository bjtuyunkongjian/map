import React, { Component } from 'react';
import Event from './event';
import { IoIosEye } from 'react-icons/io';
import MenuItem from './menu-item';
import { FetchCamera } from './webapi';
import LayerIds from './layers-id';
import { IsArray } from 'tuyun-utils';

export default class Camera extends Component {
  state = {
    curMenu: -1
  };

  componentDidMount() {
    Event.on('change:curMenu', curMenu => {
      console.log(curMenu);
      this.setState({ curMenu });
    });
  }
  render() {
    return (
      <div className="menu-item">
        <div className="item-label" onClick={this._showCamera}>
          <IoIosEye />
          摄像头
          <span className="arrow arrow-right" />
        </div>
      </div>
    );
  }
  _showCamera = () => {
    const { curMenu } = this.state;
    Event.emit(
      'change:curMenu',
      curMenu === MenuItem.cameraOption ? -1 : MenuItem.cameraOption
    );
    this._fetchCamera();
  };

  _fetchCamera = async () => {
    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchCamera({
      points: _bounds
    });
    if (err || !IsArray(res)) return;
    const _features = res.map(item => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: item
        }
      };
    });
    const _geoJSONData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: _features
      }
    };
    if (!_MAP_.getSource(LayerIds.camera.source)) {
      _MAP_.addSource('cameraSource', _geoJSONData).addLayer({
        id: LayerIds.camera.layer,
        type: 'symbol',
        source: 'cameraSource',
        layout: {
          'text-field': '',
          visibility: 'visible',
          'symbol-placement': 'point',
          'text-font': ['黑体'],
          'icon-image': 'camera'
        }
      });
    }
    Object.keys(LayerIds).map(key => {
      const item = LayerIds[key];
      if (item === LayerIds.camera) return;
      if (_MAP_.getLayer(item.layer)) {
        _MAP_.removeLayer(item.layer);
      }
      if (_MAP_.getSource(item.source)) {
        _MAP_.removeSource(item.source);
      }
    });
  };
}
