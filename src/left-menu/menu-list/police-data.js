import React, { Component } from 'react';
import { IsArray } from 'tuyun-utils';
import Event from './event';
import { IoIosPeople } from 'react-icons/io';
import MenuItem from './menu-item';
import LayerIds from './layers-id';
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
    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchPopulation({
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

    if (!_MAP_.getSource(LayerIds.policeData.source)) {
      _MAP_.addSource(LayerIds.policeData.source, _geoJSONData).addLayer({
        id: LayerIds.policeData.layer,
        type: 'symbol',
        source: LayerIds.policeData.source,
        layout: {
          'text-field': '',
          visibility: 'visible',
          'symbol-placement': 'point',
          'text-font': ['黑体'],
          'icon-image': option.icon
        }
      });
    } else {
      _MAP_.getSource(LayerIds.policeData.source).setData(_geoJSONData.data);
      _MAP_.setLayoutProperty(
        LayerIds.policeData.layer,
        'icon-image',
        option.icon
      );
    }
    // Object.keys 不带继承的属性
    // Object.keys(LayerIds).map(key => {
    //   const item = LayerIds[key];
    //   if (item === LayerIds.policeData) return;
    //   if (_MAP_.getLayer(item.layer)) {
    //     _MAP_.removeLayer(item.layer);
    //   }
    //   if (_MAP_.getSource(item.source)) {
    //     _MAP_.removeSource(item.source);
    //   }
    // });
  };
  // _MAP_.flyTo({ zoom: option.defaultZoom }, (param1, param2) => {
  //   console.log(param1, param2);
  // });
}

const options = [
  {
    value: 0,
    name: '人口',
    defaultZoom: 10,
    icon: 'people'
  },
  {
    value: 1,
    name: '房屋',
    defaultZoom: 16,
    icon: 'landmark'
  },
  {
    value: 2,
    name: '单位',
    defaultZoom: 17,
    icon: 'landmark'
  }
];
