import React, { Component } from 'react';

import Event from './event';
import { IoIosPeople } from 'react-icons/io';
import MenuItem from './menu-item';
import { FetchPopulation } from './webapi';

export default class PoliceData extends Component {
  state = {
    curMenu: -1,
    selectedOpt: 0
  };

  componentDidMount() {
    Event.on('change:curMenu', curMenu => {
      console.log(curMenu);
      this.setState({ curMenu });
    });
  }

  render() {
    const { curMenu, selectedOpt } = this.state;
    const _selected = curMenu === MenuItem.dataOption;
    const _slide = _selected ? 'menu-down' : 'menu-top';
    const _arrow = _selected ? 'arrow-down' : 'arrow-right';
    return (
      <div className="menu-item police-data">
        <div className="item-label data" onClick={this._selectMenu}>
          <IoIosPeople />
          <span>一标三实</span>
          <div className={`arrow-box ${_selected ? 'changed' : ''}`}>
            <span className={`arrow ${_arrow}`} />
          </div>
        </div>
        <ul className={`data-container ${_selected ? '' : 'hidden'} ${_slide}`}>
          {options.map((item, index) => (
            <li
              className={`data-item ${selectedOpt === index ? 'checked' : ''}`}
              key={`data_option_${index}`}
              onClick={e => this._checkMap(item, index, e)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  _selectMenu = () => {
    const { curMenu } = this.state;
    Event.emit(
      'change:curMenu',
      curMenu === MenuItem.dataOption ? -1 : MenuItem.dataOption
    );
  };
  _checkMap = (item, index, e) => {
    e.stopPropagation();
    this.setState({ selectedOpt: index });
    this._fetchPeopleData(item);
  };

  _fetchPeopleData = async option => {
    this._curZoom = _MAP_.getZoom();
    const _bounds = _MAP_.getBounds();
    const _points = [
      _bounds._ne.lat,
      _bounds._sw.lng,
      _bounds._sw.lat,
      _bounds._ne.lng
    ];
    return;
    const { res } = await FetchPopulation({ points: _points });

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
    // console.log(_geoJSONData);

    _MAP_.flyTo({ zoom: option.defaultZoom }, (param1, param2) => {
      console.log(param1, param2);
    });
    _MAP_.addLayer({
      id: 'People_Point',
      type: 'symbol',
      source: _geoJSONData,
      layout: {
        visibility: 'visible',
        'symbol-placement': 'point'
      },
      paint: {
        color: 'red'
      }
    });
  };
}

const options = [
  {
    value: 0,
    name: '人口',
    defaultZoom: 10
    // map: 'people'
  },
  {
    value: 1,
    name: '房屋',
    defaultZoom: 16
    // map: 'house'
  },
  {
    value: 2,
    name: '单位',
    defaultZoom: 17
    // map: 'unit'
  }
];
