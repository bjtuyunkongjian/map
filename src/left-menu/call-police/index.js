/**
 * @author 郝艺红
 * @description 摄像头
 */

import React, { Component } from 'react';
import { IoIosCall } from 'react-icons/io';
import { IsArray } from 'tuyun-utils';

import { FetchCallPolice } from './webapi';

import Event from '../event';
import { MenuItems } from '../constant';

export default class CallPolice extends Component {
  state = {
    curMenu: -1
  };

  componentDidMount() {
    this._init();
  }
  render() {
    return (
      <div className="menu-item">
        <div className="item-label" onClick={this._showPhone}>
          <IoIosCall />
          <span>报警</span>
          <div className="arrow-box">
            <span className="arrow arrow-right" />
          </div>
        </div>
      </div>
    );
  }

  _init = () => {
    Event.on('change:curMenu', nextMenu => {
      const { curMenu } = this.state;
      if (nextMenu === curMenu) return;
      this.setState({ curMenu: nextMenu });
      nextMenu !== MenuItems.callPoliceOption &&
        _MAP_.getLayer('callpoliceLayer') &&
        _MAP_.removeLayer('callpoliceLayer').removeSource('callpoliceLayer'); // 删除当前图层
    });
  };

  _showPhone = () => {
    const { curMenu } = this.state;
    const _nextMenu =
      curMenu === MenuItems.callPoliceOption ? -1 : MenuItems.callPoliceOption;
    Event.emit('change:curMenu', _nextMenu);
    if (_nextMenu !== MenuItems.callPoliceOption) return;
    this._fetchCallPolice();
  };

  _fetchCallPolice = async () => {
    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchCallPolice({
      points: _bounds
    });
    console.log('res', res);
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
    if (!_MAP_.getLayer('callpoliceLayer')) {
      _MAP_.addLayer({
        id: 'callpoliceLayer',
        type: 'symbol',
        source: _geoJSONData,
        layout: {
          'icon-image': 'call',
          'icon-size': 1
        }
      });
    }
    // _MAP_.on('mousemove', 'callpoliceLayer', e => {
    //   console.log(e, e.features);
    //   // _MAP_.setLayoutProperty('callpoliceLayer', 'icon-size', 1.5);
    // });
    // _MAP_.on('mouseleave', 'callpoliceLayer', e => {
    //   // _MAP_.setLayoutProperty('callpoliceLayer', 'icon-size', 1);
    // });
  };
}
