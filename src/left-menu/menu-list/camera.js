import React, { Component } from 'react';
import Event from './event';
import { IoIosEye } from 'react-icons/io';
import MenuItem from './menu-item';

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
          <div className="arrow-box">
            <span className="arrow arrow-right" />
          </div>
        </div>
      </div>
    );
  }

  // 点击事件，切换菜单，层级变化
  _init = () => {
    _MAP_.on('click', 'POI_LEVEL_16_CAMERA', e => {
      const num = e.features[0].properties.Number;
      fetch('http://localhost:8000/camera?url=' + num);
    });
  };

  _showCamera = () => {
    const { curMenu } = this.state;
    const _nextMenu =
      curMenu === MenuItem.cameraOption ? -1 : MenuItem.cameraOption; // 下一个状态
    Event.emit('change:curMenu', _nextMenu); // 发射事件
    if (_nextMenu === curMenu) return;
    this.setState({ curMenu: _nextMenu });
    _MAP_.getLayer('cameraLayer') &&
      _MAP_.removeLayer('cameraLayer').removeSource('cameraLayer');
    if (_nextMenu === MenuItem.cameraOption) {
      this._fetchCamera();
      // 添加监听事件
      _MAP_.on('mouseup', this._fetchCamera);
      _MAP_.on('zoomend', this._fetchCamera);
    } else {
      // 删除监听事件
      _MAP_.off('mouseup', this._fetchCamera);
      _MAP_.off('zoomend', this._fetchCamera);
    }
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
