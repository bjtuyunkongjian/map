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
    this._init();
  }
  render() {
    return (
      <div className="menu-item camera">
        <div className="item-label" onClick={this._showCamera}>
          <IoIosEye />
          <span>摄像头</span>
          <span className="arrow arrow-right" />
        </div>
      </div>
    );
  }

  // 点击事件，切换菜单，层级变化
  _init = () => {
    Event.on('change:curMenu', nextMenu => {
      const { curMenu } = this.state;
      console.log(nextMenu);
      if (nextMenu === curMenu) return;
      this.setState({ curMenu: nextMenu });
      if (_MAP_.getLayer('cameraLayer')) {
        _MAP_.removeLayer('cameraLayer');
        _MAP_.removeSource('cameraLayer');
      }
    });
    _MAP_.on('click', 'cameraLayer', e => {
      console.log('添加视频');
      _MAP_.addSource('cameraSource', {
        type: 'video',
        url: [],
        coordinates: []
      });
    });
  };

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
    if (!_MAP_.getSource('cameraLayer')) {
      _MAP_.addLayer({
        id: 'cameraLayer',
        type: 'symbol',
        source: _geoJSONData,
        layout: {
          'icon-image': 'camera',
          'icon-size': 1
        }
      });
    }
    // _MAP_.on('mousemove', 'cameraLayer', e => {
    //   _MAP_.setLayoutProperty('cameraLayer', 'icon-size', 2);
    // });
    // _MAP_.on('mouseleave', 'cameraLayer', e => {
    //   _MAP_.setLayoutProperty('cameraLayer', 'icon-size', 1);
    // });
  };
}
