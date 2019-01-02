import React, { Component } from 'react';
import Event from './event';
import { FetchCallPolice } from './webapi';
import MenuItem from './menu-item';
import { IoIosCall } from 'react-icons/io';
import { IsArray } from 'tuyun-utils';
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
          <span className="arrow arrow-right" />
        </div>
      </div>
    );
  }

  _init = () => {
    const { curMenu } = this.state;
    Event.on('change:curMenu', nextMenu => {
      if (nextMenu === curMenu) return;
      this.setState({ curMenu: nextMenu });
      if (_MAP_.getLayer('callpoliceLayer')) {
        _MAP_.removeLayer('callpoliceLayer');
        _MAP_.removeSource('callpoliceLayer');
      }
    });
  };

  _showPhone = () => {
    const { curMenu } = this.state;
    Event.emit(
      'change:curMenu',
      curMenu === MenuItem.callPoliceOption ? -1 : MenuItem.callPoliceOption
    );
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
