/**
 * @author 郝艺红
 * @name 一标三实
 */

import React, { Component } from 'react';
import { IsArray, Event as GlobalEvent } from 'tuyun-utils';
import { IoIosPeople, IoMdCheckmark } from 'react-icons/io';

import {
  point as TurfPoint,
  center as TurfCenter,
  featureCollection as FeatureCollection
} from 'turf';

import { FetchPopulation } from './webapi';
import HouseMessage from './house-message';
import UnitMessage from './unit-message';

import Event, { EventName } from '../event';

export default class PoliceData extends Component {
  state = {
    expanded: false,
    selectedOpts: [],
    animate: 'hidden'
  };

  componentDidMount = () => this._init();

  render() {
    const { expanded, selectedOpts, animate } = this.state;
    const _arrow = expanded ? 'arrow-down' : 'arrow-right';
    return (
      <div className="menu-item police-data">
        <div className="item-label data" onClick={this._selectMenu}>
          <IoIosPeople />
          <span>一标三实</span>
          <div className={`arrow-box ${expanded ? 'changed' : ''}`}>
            <span className={`arrow arrow-right ${_arrow}`} />
          </div>
        </div>
        <ul className={`data-container ${animate}`}>
          {policeDataOpts.map((item, index) => {
            const _isChecked = selectedOpts.indexOf(item) > -1;
            return (
              <li
                className={`data-item ${_isChecked ? 'checked' : ''}`}
                key={`data_option_${index}`}
                onClick={e => this._selectPoliceData(item, e)}
              >
                <div className={`checkbox ${_isChecked ? 'checked' : ''}`}>
                  {_isChecked ? <IoMdCheckmark /> : null}
                </div>
                {item.name}
              </li>
            );
          })}
        </ul>
        {/* {houseSelected ? <HouseMessage /> : null} */}
        {/* {selectedOpt === 'unit' ? <UnitMessage /> : null} */}
      </div>
    );
  }

  // 点击事件
  _init = () => {
    // 点击地图图标弹出信息框
    policeDataOpts.map(item => {
      _MAP_.on('click', item.layerId, e => {
        const { lngLat, originalEvent, features } = e;
        // _MAP_.flyTo({ center: [lngLat.lng, lngLat.lat], duration: 500 });
        console.log(e, originalEvent, features, item);
        if (item.value === 'population') {
          Event.emit(EventName.showPoDataPop, {
            visible: true,
            left: originalEvent.offsetX,
            top: originalEvent.offsetY,
            value: features[0].properties.value,
            lngLat: lngLat
          });
        } else if (item.value === 'unit') {
          Event.emit(EventName.showPoDataUnit, {
            visible: true,
            left: originalEvent.offsetX,
            top: originalEvent.offsetY,
            value: features[0].properties.value,
            lngLat: lngLat
          });
        } else if (item.value === 'house') {
          Event.emit(EventName.showPoDataHouse, {
            visible: true,
            left: originalEvent.offsetX,
            top: originalEvent.offsetY,
            value: features[0].properties.value,
            lngLat: lngLat
          });
        }
      });
    });
  };

  _addEventListener = () => {
    _MAP_.on('moveend', this._fetchPoliceData);
  };

  _removeEventListener = () => {
    _MAP_.off('moveend', this._fetchPoliceData);
  };

  // 发送菜单改变事件
  _selectMenu = () => {
    const { expanded } = this.state;
    const _animate = !expanded ? 'menu-down' : 'menu-up';
    this.setState({ expanded: !expanded, animate: _animate }); // 修改 state
  };

  // 后台请求数据
  _selectPoliceData = async (option, e) => {
    e.stopPropagation();
    const { selectedOpts } = this.state;
    const _optInd = selectedOpts.indexOf(option);
    const _isSelected = _optInd > -1; // 判断之前是否选中
    _isSelected ? selectedOpts.splice(_optInd, 1) : selectedOpts.push(option); // 之前选中，删除对应选项；之前未选中，添加对应选项
    await this.setState({ selectedOpts: selectedOpts });
    _isSelected && this._removeSourceLayer(option.layerId); // 之前选中，当前要变为未选中，删除对应图层
    // 当前选中房屋，直接飞到房屋对应的等级
    if (!_isSelected && option.value === 'house') {
      _MAP_.flyTo({ zoom: option.defaultZoom, duration: 500 });
    }
    if (selectedOpts.length > 0) {
      this._addEventListener(); // 添加监听
      this._fetchPoliceData();
    } else {
      this._removeEventListener(); // 移除监听
    }
  };

  _fetchPoliceData = async () => {
    const { selectedOpts } = this.state;
    if (selectedOpts.length === 0) return; // 没有选中子选项，不需要发送请求
    const _bounds = _MAP_.getBounds(); // 获取屏幕边界范围
    const _zoom = _MAP_.getZoom(); // 当前缩放层级
    const param = { bounds: _bounds, zoom: _zoom };
    const {
      popSelected,
      unitSelected,
      houseSelected
    } = this._computeSelected();
    popSelected && this._fetchPopulation(param); // 选中人口
    unitSelected && this._fetchUnit(param); // 选中单位
    houseSelected && this._fetchHouse(param); // 选中房屋
  };

  _fetchPopulation = async param => {
    const { zoom, bounds } = param;
    const { res, err } = await FetchPopulation({ points: bounds }); // 发送请求
    if (err || !IsArray(res)) return console.log('获取一标三识数据出错'); //保护
    const _features = res.map(coords => TurfPoint(coords));
    const _geoJSONData = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    // 小于 17.5 级：多于 200 个点，以热力图形式呈现，在建筑物底下；
    // 小于 17.5 级：少于 200 个点，以点图形式呈现，在 3d 建筑物之上，可点击；
    // 大于 17.5 级：点图，铭牌形式，在 3d 建筑物上面，自动避让，优先级最高；
    if (!_MAP_.getLayer(popLayerId)) {
      _MAP_.addLayer({
        id: popLayerId,
        type: 'circle',
        source: _geoJSONData,
        minzoom: 12,
        paint: {
          'circle-radius': 4,
          'circle-color': 'blue',
          'circle-blur': 0
        }
      });
    } else {
      _MAP_.getSource(popLayerId).setData(_geoJSONData.data); // 重置 data
    }
  };

  _fetchUnit = async param => {
    const { zoom, bounds } = param;
    // 大于 17.5 级：3d 建筑 + 数量标识
    // 小于 17.5 级：点的数据量在 200 以内，现有点的大小，需要有点击功能
    // 小于 17.5 级：点的数据量在 200~1000/1500 之间， 以中等的点呈现，不需要点击功能
    // 小于 17.5 级：点的数据量在 1000/1500 以上，以最小的点呈现，肉眼可见
  };

  _fetchHouse = async param => {
    const { zoom, bounds } = param;
    const { res, err } = await FetchPopulation({ points: bounds }); // 发送请求
    if (err || !IsArray(res)) return console.log('获取一标三识数据出错'); //保护
    const _features = res.map(coords => TurfPoint(coords));
    const _geoJSONData = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    // 地图缩小到 16 级以下，房屋不显示，放大到大于 16 级，房屋又出现；
    // 小于 17.5 级：多于 200 个点，以热力图形式呈现，在建筑物底下；
    // 小于 17.5 级：少于 200 个点，以点图形式呈现，在 3d 建筑物之上，可点击；
    // 大于 17.5 级：点图，铭牌形式，在 3d 建筑物上面，自动避让，优先级最高；
    if (!_MAP_.getLayer(houseLayerId)) {
      _MAP_.addLayer({
        id: houseLayerId,
        type: 'circle',
        source: _geoJSONData,
        minzoom: 16,
        paint: {
          'circle-radius': 4,
          'circle-color': 'red',
          'circle-blur': 0
        }
      });
    } else {
      _MAP_.getSource(houseLayerId).setData(_geoJSONData.data); // 重置 data
    }
  };

  _computeSelected = () => {
    const { selectedOpts } = this.state;
    let _popSelected = false,
      _unitSelected = false,
      _houseSelected = false;
    for (let item of selectedOpts) {
      if (item.value === 'population') {
        _popSelected = true;
      } else if (item.value === 'unit') {
        _unitSelected = true;
      } else if (item.value === 'house') {
        _houseSelected = true;
      }
    }
    return {
      popSelected: _popSelected,
      unitSelected: _unitSelected,
      houseSelected: _houseSelected
    };
  };

  _removeSourceLayer = layerId => {
    _MAP_.getLayer(layerId) && _MAP_.removeLayer(layerId).removeSource(layerId); // 删除所有 layer 和 source
  };
}

const popLayerId = 'POLICE_DATA_POPULATION';
const unitLayerId = 'POLICE_DATA_UNIT';
const houseLayerId = 'POLICE_DATA_HOUSE'; // 一标三识 房屋

const policeDataOpts = [
  {
    value: 'population',
    name: '人口',
    defaultZoom: 16.5,
    icon: 'people',
    layerId: popLayerId
  },
  {
    value: 'unit',
    name: '单位',
    defaultZoom: 16,
    icon: 'landmark',
    layerId: unitLayerId
  },
  {
    value: 'house',
    name: '房屋',
    defaultZoom: 16,
    icon: 'landmark',
    layerId: houseLayerId
  }
];
