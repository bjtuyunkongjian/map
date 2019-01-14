import React, { Component } from 'react';
import Event from './event';
import { IoIosEye } from 'react-icons/io';
import MenuItem from './menu-item';
import { FetchCamera } from './webapi';
import { IsArray } from 'tuyun-utils';

export default class Camera extends Component {
  state = {
    curMenu: -1
  };

  componentDidMount = () => this._init();

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
    _MAP_.on('click', 'cameraLayer', e => {
      console.log('添加视频');
      console.log(e.features[0].properties);
    });
  };

  _showCamera = () => {
    const { curMenu } = this.state;
    const _nextMenu =
      curMenu === MenuItem.cameraOption ? -1 : MenuItem.cameraOption; // 下一个状态
    _nextMenu !== -1 && Event.emit('change:curMenu', _nextMenu); // 发射事件
    if (_nextMenu === curMenu) return;
    this.setState({ curMenu: nextMenu });
    if (_MAP_.getLayer('cameraLayer')) {
      _MAP_.removeLayer('cameraLayer');
      _MAP_.removeSource('cameraLayer');
    }
    this._fetchCamera();
  };

  _fetchCamera = async () => {
    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchCamera({
      points: _bounds
    });
    console.log('res', res);
    if (err || !IsArray(res)) return;
    const _features = res.map(item => {
      if (item.ID === '37019435001310051006') {
        console.log(item);
        console.log(res.indexOf(item));
      }
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [item.Lat, item.Lng]
        },
        properties: {
          ID: item.ID
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
