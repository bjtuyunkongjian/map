import React, { Component } from 'react';
import { IsArray } from 'tuyun-utils';
import Event from './event';
import { IoIosPeople } from 'react-icons/io';
import MenuItem from './menu-item';
import { FetchPopulation } from './webapi';
import HouseMessage from '../list-option/house-message';
import UnitMessage from '../list-option/unit-message';
import { Event as GlobalEvent } from 'tuyun-utils';
import { point as TurfPoint } from 'turf';

export default class PoliceData extends Component {
  state = {
    curMenu: -1,
    selectedOpt: -1,
    animate: 'hidden'
  };

  componentDidMount = () => this._init();

  render() {
    const { curMenu, selectedOpt, animate } = this.state;
    const _selected = curMenu === MenuItem.dataOption;
    const _arrow = _selected ? 'arrow-down' : 'arrow-right';
    return (
      <div className="menu-item police-data">
        <div className="item-label data" onClick={this._selectMenu}>
          <IoIosPeople />
          <span>一标三实</span>
          <div className={`arrow-box ${_selected ? 'changed' : ''}`}>
            <span className={`arrow arrow-right ${_arrow}`} />
          </div>
        </div>
        <ul className={`data-container ${animate}`}>
          {options.map((item, index) => (
            <li
              className={`data-item ${
                selectedOpt === item.value ? 'checked' : ''
              }`}
              key={`data_option_${index}`}
              onClick={e => this._checkMap(item, e)}
            >
              {item.name}
            </li>
          ))}
        </ul>

        {selectedOpt === 'house' ? <HouseMessage /> : null}
        {selectedOpt === 'unit' ? <UnitMessage /> : null}
      </div>
    );
  }

  // 点击事件
  _init = () => {
    Event.on('change:curMenu', nextMenu => {
      const { curMenu } = this.state;
      if (nextMenu === curMenu) return;
      let _animate;
      if (nextMenu === MenuItem.dataOption) {
        _animate = 'menu-down';
      } else if (curMenu === MenuItem.dataOption) {
        _animate = 'menu-up';
      } else {
        _animate = 'hidden';
      }
      this.setState({ curMenu: nextMenu, animate: _animate });
      this._removeSourceLayer(layerId); // 删除图层
      if (nextMenu === MenuItem.dataOption) {
        GlobalEvent.emit('change:FeaturesMenu:enableHeatDensity', true);
        this._addEventListener();
      } else {
        GlobalEvent.emit('change:FeaturesMenu:enableHeatDensity', false);
        this._removeEventListener();
      }
    });
    // 点击地图图标弹出信息框
    _MAP_.on('click', layerId, e => {
      const { selectedOpt } = this.state;
      const { originalEvent } = e;
      if (selectedOpt === 'population') return;
      if (selectedOpt === 'house') {
        Event.emit('showMessage', {
          value: selectedOpt,
          top: originalEvent.offsetY,
          left: originalEvent.offsetX
        });
      } else if (selectedOpt === 'unit') {
        Event.emit('showUnit', {
          value: selectedOpt,
          latop: originalEvent.offsetY,
          laleft: originalEvent.offsetX
        });
      }
    });
  };

  _addEventListener = () => {
    _MAP_.on('zoomend', this._fetchPeopleData);
    _MAP_.on('mouseup', this._fetchPeopleData);
  };

  _removeEventListener = () => {
    _MAP_.off('zoomend', this._fetchPeopleData);
    _MAP_.off('mouseup', this._fetchPeopleData);
  };

  _zoomListener = () => {
    if (!_MAP_.getLayer(layerId)) return;
    const _option = options.filter(item => item.value === 'house')[0];
    const _landMarkZoom = _option.defaultZoom;
    const _zoom = _MAP_.getZoom();
    const _iconImage = _zoom < _landMarkZoom ? 'people' : 'landmark';
    _MAP_.setLayoutProperty(layerId, 'icon-image', _iconImage);
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
  _checkMap = async (option, e) => {
    e && e.stopPropagation();
    await this.setState({ selectedOpt: option.value });
    // 动画
    const _duration = 500;
    this._removeEventListener(); // 删除监听
    _MAP_.flyTo({
      zoom: option.defaultZoom,
      duration: _duration
    });
    await new Promise(resolve => {
      setTimeout(() => {
        resolve();
      }, _duration * 1.01);
    });
    this._addEventListener(); // 恢复监听
    this._fetchPeopleData();
  };

  _fetchPeopleData = async () => {
    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchPopulation({
      points: _bounds
    });
    if (err || !IsArray(res)) return; //保护
    const _zoom = _MAP_.getZoom();
    const _landMarkZoom = options.filter(item => item.value === 'house')[0]
      .defaultZoom;
    const _iconImage = _zoom < _landMarkZoom ? 'people' : 'landmark';

    const _features = res.map(coords => TurfPoint(coords));
    const _geoJSONData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: _features
      }
    };

    if (!_MAP_.getLayer(layerId)) {
      _MAP_.addLayer({
        id: layerId,
        type: 'symbol',
        source: _geoJSONData,
        layout: {
          'icon-image': _iconImage,
          'icon-size': 1.5
        }
      });
    } else {
      _MAP_.setLayoutProperty(layerId, 'icon-image', _iconImage);
    }
  };

  _removeSourceLayer = layerId => {
    _MAP_.getLayer(layerId) && _MAP_.removeLayer(layerId).removeSource(layerId); // 删除所有 layer 和 source
  };
}

const options = [
  {
    value: 'population',
    name: '人口',
    defaultZoom: 12,
    icon: 'people'
  },
  {
    value: 'house',
    name: '房屋',
    defaultZoom: 16,
    icon: 'landmark'
  },
  {
    value: 'unit',
    name: '单位',
    defaultZoom: 17,
    icon: 'landmark'
  }
];

const layerId = 'policeData-layer';
