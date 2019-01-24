import React, { Component } from 'react';
import Event from './event';
import { Event as GlobalEvent, IsEmpty } from 'tuyun-utils';
import { TuyunMessage } from 'tuyun-kit';
import { SearchDevice } from './webapi';
import { MdHighlightOff } from 'react-icons/md';

export default class SearchInput extends Component {
  state = {
    disabled: true,
    inputVal: ''
  };

  componentDidMount = () => this._init();

  render() {
    const { disabled, inputVal } = this.state;
    const _isHidden = inputVal ? '' : 'hidden';
    return (
      <div className="search-input-box">
        <input
          type="text"
          placeholder="图云搜索"
          className="search-input"
          value={inputVal}
          disabled={disabled}
          onChange={this._onChange}
          onKeyUp={this._onKeyUp}
        />
        <div className={`search-clear ${_isHidden}`} onClick={this._clearInput}>
          <MdHighlightOff />
        </div>
      </div>
    );
  }

  _init = () => {
    GlobalEvent.on('change:TopSearch:disable', disabled => {
      this.setState({ disabled });
      if (disabled) {
        this.setState({ inputVal: '' });
        GlobalEvent.emit('change:LeftMenu:searchInfo', {
          carInfo: {},
          manInfo: {}
        }); // 清空
      }
    });
  };

  _onChange = e => {
    this.setState({ inputVal: e.target.value });
    if (!e.target.value) {
      GlobalEvent.emit('change:LeftMenu:searchInfo', {
        carInfo: {},
        manInfo: {}
      }); // 清空
    }
    Event.emit('change:inputVal', e.target.value);
  };

  _clearInput = () => {
    this.setState({ inputVal: '' });
  };

  _onKeyUp = async e => {
    if (e.keyCode !== 13) return;
    const { inputVal } = this.state;
    let _inputVal = inputVal.replace(/\s/g, '');
    _inputVal = inputVal.replace(/，/g, ',');
    if (!_inputVal) return TuyunMessage.show('请输入想要查找内容');
    const _devices = _inputVal.split(',');
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
