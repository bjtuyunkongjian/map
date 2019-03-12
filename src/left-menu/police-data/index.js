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

import Event from '../event';

export default class PoliceData extends Component {
  state = {
    expanded: false,
    selectedOpt: -1,
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
          {options.map((item, index) => {
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
        {/* {selectedOpt === 'house' ? <HouseMessage /> : null}
        {selectedOpt === 'unit' ? <UnitMessage /> : null} */}
      </div>
    );
  }

  // 点击事件
  _init = () => {
    // 点击地图图标弹出信息框
    _MAP_.on('click', policeDataLayer, e => {
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
    _MAP_.on('moveend', this._fetchPeopleData);
  };

  _removeEventListener = () => {
    _MAP_.off('moveend', this._fetchPeopleData);
  };

  _zoomListener = () => {
    if (!_MAP_.getLayer(policeDataLayer)) return;
    const _option = options.filter(item => item.value === 'house')[0];
    const _landMarkZoom = _option.defaultZoom;
    const _zoom = _MAP_.getZoom();
    const _iconImage = _zoom < _landMarkZoom ? 'people' : 'landmark';
    _MAP_.setLayoutProperty(policeDataLayer, 'icon-image', _iconImage);
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
    const _isSelected = _optInd > -1;
    _isSelected ? selectedOpts.splice(_optInd, 1) : selectedOpts.push(option);
    await this.setState({ selectedOpts: selectedOpts });
    // 当前选中房屋，直接飞到房屋对应的等级
    if (_isSelected && option.value === 'house') {
      _MAP_.flyTo({
        zoom: option.defaultZoom,
        duration: 500
      });
    }
    // this._addEventListener(); // 恢复监听
    // this._fetchPeopleData();
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

    // const _features = [];
    // for (let i = 0; i < 30000; i++) {
    //   _features.push(
    //     TurfPoint([
    //       Math.random() * 0.1 + 117.116692,
    //       Math.random() * 0.05 + 36.642122
    //     ])
    //   );
    // }
    const _features1 = [];
    let _long = 117.19715;
    let _lat = 36.689885;
    for (let i = 0; i < 1500; i++) {
      _long += (Math.random() - 0.5) / 100;
      _lat += (Math.random() - 0.5) / 100;
      _features1.push(
        TurfPoint(
          [
            Math.random() * 0.003 + 117.19715,
            Math.random() * 0.003 + 36.689885
          ],
          {
            count: (100 + Math.random() * 100).toFixed(0)
          }
        )
      );
    }

    const _geoJSONData = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: _features
      }
    };
    const _geoJSONData1 = {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: _features1
      }
    };

    if (!_MAP_.getLayer(policeDataLayer)) {
      // _MAP_.addLayer({
      //   id: policeDataLayer,
      //   type: 'symbol',
      //   source: _geoJSONData,
      //   layout: {
      //     'icon-image': _iconImage,
      //     'icon-size': 1.5
      //   }
      // });
      // 以下注释代码为假数据，对比某一区域内模糊化数据和原数据
      _MAP_.addLayer(
        {
          id: policeDataLayer,
          type: 'symbol',
          source: _geoJSONData1,
          layout: {
            'text-field': '{count}',
            visibility: 'visible',
            'text-font': ['黑体'],
            'text-size': 10,
            'icon-image': 'ic_map_gh.9',
            'icon-text-fit': 'both',
            'icon-text-fit-padding': [1, 2, 1, 2],
            'text-justify': 'center',
            'text-pitch-alignment': 'map'
          },
          paint: {
            'text-color': 'white'
          }
          // minzoom: 12,
          // paint: {
          //   'heatmap-weight': 1,
          //   'heatmap-intensity': 3,
          //   'heatmap-radius': 20
          //   // 'circle-radius': 4,
          //   // 'circle-color': 'red',
          //   // 'circle-blur': 1.5
          //   // 'circle-opacity': 0.3
          // }
        }
        // 'GVEGPL'
      );
      // _MAP_.addLayer(
      //   {
      //     id: policeDataLayer + 1,
      //     type: 'circle',
      //     source: _geoJSONData1,
      //     minzoom: 12,
      //     paint: {
      //       'circle-radius': 4,
      //       'circle-color': 'blue',
      //       'circle-blur': 0
      //     }
      //   }
      //   // 'GVEGPL'
      // );
    } else {
      // _MAP_.setLayoutProperty(policeDataLayer, 'icon-image', _iconImage);
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
    defaultZoom: 16.5,
    icon: 'people',
    layerId: 'POLICE_DATA_POPULATION'
  },
  {
    value: 'unit',
    name: '单位',
    defaultZoom: 16,
    icon: 'landmark',
    layerId: 'POLICE_DATA_UNIT'
  },
  {
    value: 'house',
    name: '房屋',
    defaultZoom: 16,
    icon: 'landmark',
    layerId: 'POLICE_DATA_HOUSE'
  }
];

const policeDataLayer = 'POLICE_DATA_LAYER';
