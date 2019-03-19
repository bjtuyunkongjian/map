import React, { Component } from 'react';
import {
  point as TurfPoint,
  featureCollection as FeatureCollection
} from 'turf';
import {
  IsArray,
  Event as GlobalEvent,
  EventName as GloEventName
} from 'tuyun-utils';
import { TuyunMessage } from 'tuyun-kit';

import { FetchPopulation } from './webapi';

import Event, { EventName } from '../event';

export default class HouseOption extends Component {
  state = { isChecked: false };

  componentDidMount = () => this._init();

  render() {
    const { isChecked } = this.state;
    return (
      <li
        className={`data-item ${isChecked ? 'checked' : ''}`}
        onClick={this._selectHouseData}
      >
        {houseOption.name}
      </li>
    );
  }

  _init = () => {
    Event.on(EventName.changePoDataChecked, ({ clickedLabel }) => {
      const { isChecked } = this.state;
      let _isChecked;
      if (isChecked) {
        _isChecked = false; // 之前选中，当前设置为未选中
        this._removeSourceLayer(houseOption.layerId); // todo 删除之前显示的人口图层
      } else {
        _isChecked = optionName === clickedLabel; // 之前未选中，当前根据 clickedLabel 进行判断
      }
      this.setState({ isChecked: _isChecked });
    });
    // 事件监听
    _MAP_.on('click', houseOption.layerId, e => {
      const { lngLat, originalEvent, features } = e;
      // _MAP_.flyTo({ center: [lngLat.lng, lngLat.lat], duration: 500 });
      Event.emit(EventName.showPoDataPop, {
        visible: true,
        boxLeft: originalEvent.x,
        boxTop: originalEvent.y,
        lngLat: lngLat
      });
    });
  };

  _selectHouseData = async () => {
    const { isChecked } = this.state;
    Event.emit(EventName.changePoDataChecked, { clickedLabel: optionName });
    GlobalEvent.emit(GloEventName.toggleLinkage, { visible: !isChecked }); // 显示右侧联动数据
    GlobalEvent.emit(GloEventName.toggleLinkageTab, { tabName: 'house' }); // 显示右侧联动数据房屋
    // if (!isChecked) {
    //   _MAP_.flyTo({ zoom: 16 });
    //   // _MAP_.on('moveend', this._fetchHouse);
    // } else {
    //   this._removeSourceLayer(houseOption.layerId);
    //   // _MAP_.off('moveend', this._fetchHouse);
    // }
  };

  _fetchHouse = async () => {
    const _bounds = _MAP_.getBounds(); // 获取屏幕边界范围
    const _zoom = _MAP_.getZoom(); // 当前缩放层级
    if (_zoom < 16) return this._removeSourceLayer(houseOption.layerId); // 地图缩小到 16 级以下，房屋不显示
    const { res, err } = await FetchPopulation({ points: _bounds }); // 发送请求
    if (err || !IsArray(res)) return console.log('获取一标三识数据出错'); //保护
    const _features = res.map(coords => TurfPoint(coords));
    const _geoJSONData = {
      type: 'geojson',
      data: FeatureCollection(_features)
    };
    // 地图缩小到 16 级以下，房屋不显示，放大到大于 16 级，房屋又出现；
    if (!_MAP_.getLayer(houseOption.layerId)) {
      _MAP_.addLayer({
        id: houseOption.layerId,
        type: 'circle',
        source: _geoJSONData,
        minzoom: 16, // 最小显示层级
        paint: {
          'circle-radius': 4,
          'circle-color': 'red',
          'circle-blur': 0
        }
      });
    } else {
      _MAP_.getSource(houseOption.layerId).setData(_geoJSONData.data); // 重置 data
    }
  };

  _removeSourceLayer = layerId => {
    _MAP_.getLayer(layerId) && _MAP_.removeLayer(layerId).removeSource(layerId); // 删除所有 layer 和 source
  };
}

const houseOption = {
  value: 'house',
  name: '房屋',
  defaultZoom: 16,
  icon: 'landmark',
  layerId: 'POLICE_DATA_HOUSE'
};

const optionName = 'house';
