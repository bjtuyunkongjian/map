import React, { Component } from 'react';
import Event from './event';
import { IoIosCar } from 'react-icons/io';
import MenuItem from './menu-item';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FetchRoadInfo } from './webapi';

export default class PoliceCar extends Component {
  state = {
    curMenu: -1,
    selectedOpt: ''
  };
  componentDidMount() {
    this._init();
  }

  render() {
    const { curMenu, selectedOpt } = this.state;
    const _selected = curMenu === MenuItem.carOption;
    const _arrow = _selected ? 'arrow-down' : 'arrow-right';
    const _slide = _selected ? 'menu-apr' : 'menu-dis';
    return (
      <div className="menu-item">
        <div className="item-label" onClick={this._selectTrack}>
          <IoIosCar />
          车辆
          <div className={`arrow-box ${_selected ? 'changed' : ''}`}>
            <span className={`arrow ${_arrow}`} />
          </div>
        </div>
        <ul
          className={`track-container ${_selected ? '' : 'hidden'} ${_slide}`}
        >
          {options.map((item, index) => (
            <li
              className={`track-item ${selectedOpt === index ? 'checked' : ''}`}
              key={`data_option_${index}`}
              onClick={e => this._checkTrack(item, index, e)}
            >
              {item.icon}
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  _init = () => {
    Event.on('change:curMenu', curMenu => this.setState({ curMenu })); // 选择当前菜单
    _MAP_.on('mouseup', this._fetchRoadInfo);
    _MAP_.on('mouseup', 'POLICE_CAR_START', e => {
      console.log('e.features', e.features);
    });
  };

  _selectTrack = () => {
    const { curMenu } = this.state;
    Event.emit(
      'change:curMenu',
      curMenu === MenuItem.carOption ? -1 : MenuItem.carOption
    );
  };

  _checkTrack = (item, index, e) => {
    e.stopPropagation();
    this.setState({ selectedOpt: index });
  };

  _fetchRoadInfo = async e => {
    const _bound = _MAP_.getBounds();
    const _cood = e.lngLat;
    console.log(e.points);
    if (_MAP_.getLayer('POLICE_CAR_START')) return;
    const _features = [
      {
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [_cood.lng, _cood.lat]
        },
        properties: {
          title: '点',
          icon: 'monument'
        }
      }
    ];
    _MAP_.addLayer({
      id: 'POLICE_CAR_START',
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: _features
        }
      },
      layout: {
        'text-field': '{title}',
        visibility: 'visible',
        'symbol-placement': 'point',
        'text-size': 24,
        'icon-text-fit': 'both',
        'text-justify': 'center',
        'text-font': ['黑体'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport',
        'text-anchor': 'center',
        'text-keep-upright': false
      }
    });
  };
}

const options = [
  { value: 0, name: '重大安保路线', icon: <IoIosAddCircleOutline /> }
];
