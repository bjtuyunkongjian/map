import React, { Component } from 'react';
import Event from './event';
import { FetchCallPolice } from './webapi';
import MenuItem from './menu-item';
import { IoIosCall } from 'react-icons/io';
import { IsArray } from 'tuyun-utils';
import LayerIds from './layers-id';
export default class CallPolice extends Component {
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
        <div className="item-label" onClick={this._showPhone}>
          <IoIosCall />
          <span>报警</span>
          <span className="arrow arrow-right" />
        </div>
      </div>
    );
  }
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
    if (!_MAP_.getSource(LayerIds.callPolice.source)) {
      _MAP_.addSource(LayerIds.callPolice.source, _geoJSONData).addLayer({
        id: LayerIds.callPolice.layer,
        type: 'symbol',
        source: LayerIds.callPolice.source,
        layout: {
          'text-field': '',
          visibility: 'visible',
          'symbol-placement': 'point',
          'text-font': ['黑体'],
          'icon-image': 'call',
          'icon-size': 1
        }
      });
    }
    _MAP_.on('mousemove', LayerIds.callPolice.layer, e => {
      _MAP_.setLayoutProperty(LayerIds.callPolice.layer, 'icon-size', 1.5);
    });
    _MAP_.on('mouseleave', LayerIds.callPolice.layer, e => {
      _MAP_.setLayoutProperty(LayerIds.callPolice.layer, 'icon-size', 1);
    });
  };
}
