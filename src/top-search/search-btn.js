import React, { Component } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { SearchDevice } from './webapi';
import Event from './event';
import { Event as GlobalEvent, IsEmpty } from 'tuyun-utils';
import { TuyunMessage } from 'tuyun-kit';

export default class SearchBtn extends Component {
  state = {};

  _inputVal = undefined;
  _disabled = true;

  componentDidMount = () => this._init();

  render() {
    return (
      <div className="search-btn" onClick={this._searchDevice}>
        <IoMdSearch className="search-icon" />
      </div>
    );
  }

  _init = () => {
    Event.on('change:inputVal', value => {
      this._inputVal = value;
    });

    GlobalEvent.on('change:TopSearch:disable', disabled => {
      this._disabled = disabled;
    });
  };

  _searchDevice = async () => {
    if (this._disabled) return TuyunMessage.show('请选中警员和警车');
    this._inputVal = this._inputVal.replace(/\s/g, '');
    this._inputVal = this._inputVal.replace(/，/g, ',');
    if (!this._inputVal) return TuyunMessage.show('请输入想要查找内容');
    const _devices = this._inputVal.split(',');
    const _param = { devices: _devices };
    const { res, err } = await SearchDevice(_param);
    if (!res || err) return;
    if (IsEmpty(res)) return TuyunMessage.show('查询设备编号均为空');
    const _carInfo = {};
    const _manInfo = {};
    for (let item of res) {
      const { objectId, deviceType } = item;
      if (deviceType === '0') {
        _carInfo[objectId] = item;
      } else if (deviceType === '1') {
        _manInfo[objectId] = item;
      }
    }
    GlobalEvent.emit('change:LeftMenu:searchInfo', {
      carInfo: _carInfo,
      manInfo: _manInfo
    });
  };
}
