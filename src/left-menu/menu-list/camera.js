import React, { Component } from 'react';
import Event from './event';
import { IoIosEye } from 'react-icons/io';
import MenuItem from './menu-item';
import { FetchCamera } from './webapi';
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
      <div
        className="menu-item"
        onClick={() => {
          Event.emit('aaa');
        }}
      >
        <div className="item-label" onClick={e => this._showCamera(e)}>
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
  _fetchCamera = async option => {
    const _bounds = _MAP_.getBounds();
    const _cameraPoints = [
      _bounds._ne.lat,
      _bounds._sw.lng,
      _bounds._sw.lat,
      _bounds._ne.lng
    ];
    const { res } = await FetchCamera({ camerapoints: _cameraPoints });
    const _features = res.map(item => {
      return {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: item
        }
      };
    });
    // console.log(res);
    _MAP_.addSource({
      id: 'camera_points',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: [
            {
              type: 'Features',
              geometry: {
                type: 'Point',
                coordinates: item
              }
            }
          ]
        }
      },
      layout: {
        'text-field': '{}',
        'icon-image': ''
      }
    });
  };
}
