import React, { Component } from 'react';
import { IsArray } from 'tuyun-utils';
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
    this._init();
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

  // 点击事件
  _init = () => {
    Event.on('change:curMenu', nextMenu => {
      const { curMenu } = this.state;
      if (nextMenu === curMenu) return;
      this.setState({ curMenu: nextMenu });
      if (_MAP_.getLayer('populationLayer')) {
        _MAP_.removeLayer('populationLayer');
      }
    });
    _MAP_.on('click', 'house', e => {
      console.log(e.features);
    });
    _MAP_.on('zoomend', () => {
      if (!_MAP_.getLayer('populationLayer')) return;
      const _option = options.filter(item => item.value === 'house')[0];
      const _landMarkZoom = _option.defaultZoom;
      console.log(_option, _landMarkZoom);
      const _zoom = _MAP_.getZoom();
      const _iconImage = _zoom < _landMarkZoom ? 'people' : 'landmark';
      _MAP_.setLayoutProperty('populationLayer', 'icon-image', _iconImage);
    });
  };

  // 发送菜单改变事件
  _selectMenu = () => {
    const { curMenu } = this.state;
    Event.emit(
      'change:curMenu',
      curMenu === MenuItem.dataOption ? -1 : MenuItem.dataOption
    );
  };

  // 后台请求数据
  _checkMap = async (item, index, e) => {
    if (item.value === 'house') {
      const _duration = 500;

      _MAP_.flyTo({
        zoom: item.defaultZoom,
        duration: _duration
      });
      await new Promise(resolve => {
        setTimeout(() => {
          resolve();
        }, _duration * 1.01);
      });
    }
    await this.setState({ selectedOpt: index });
    this._fetchPeopleData(item);
  };

  _fetchPeopleData = async item => {
    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchPopulation({
      points: _bounds
    });
    if (err || !IsArray(res)) return; //保护
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

    if (!_MAP_.getLayer('populationLayer')) {
      _MAP_.addLayer({
        id: 'populationLayer',
        type: 'symbol',
        source: _geoJSONData,
        layout: {
          'icon-image': item.icon,
          'icon-size': 1
        }
      });
    } else {
      _MAP_.getLayer('populationLayer');
      // .setData(_geoJSONData.data);
      _MAP_.setLayoutProperty('populationLayer', 'icon-image', item.icon);
    }
  };
  // _MAP_.flyTo({ zoom: option.defaultZoom }, (param1, param2) => {
  //   console.log(param1, param2);
  // });
}

const options = [
  {
    value: 'population',
    name: '人口',
    defaultZoom: 10,
    icon: 'people'
  },
  {
    value: 'house',
    name: '房屋',
    defaultZoom: 16,
    icon: 'landmark'
  },
  {
    value: 'work',
    name: '单位',
    defaultZoom: 17,
    icon: 'landmark'
  }
];
