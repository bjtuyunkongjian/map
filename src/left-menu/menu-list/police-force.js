import React, { Component } from 'react';
import Event from './event';
import { IoMdCheckmark } from 'react-icons/io';
import { TiUser } from 'react-icons/ti';
import MenuItem from './menu-item';
import { FetchLocationCar } from './webapi';
import {
  point as TurfPoint,
  lineString as LineString,
  lineDistance as LineDistance,
  along as TurfAlong // 'kilometers
} from 'turf';
import { IsEmpty, IsArray } from 'tuyun-utils';
import { DrawIconPoint } from './security-route-layer';
import { BaseConfig } from 'tuyun-config';

export default class WorkContent extends Component {
  state = {
    curMenu: -1,
    datanum: {},
    selectedTasks: [],
    animate: 'hidden'
  };

  _intervalStart = []; // 记录起始定时时间，第 0 位是请求定时时间
  _clockIntervalHandler = undefined; // 定时器句柄
  _intervalMod = 0; // 定时
  _curPoliceCar = {}; // 警车数据，当前
  _nextPoliceCar = {}; // 警车数据，下一刻数据
  _isLoading = false; // 判断请求有没有回来
  _animateIntervalHandler = undefined; // 动画定时器句柄
  _enableMove = false; // 小车可以开始移动

  render() {
    const { curMenu, selectedTasks, animate } = this.state;
    const _selected = curMenu === MenuItem.policeForce;
    const _arrow = _selected ? 'arrow-down' : 'arrow-right';
    return (
      <div className="menu-item content">
        <div className="item-label" onClick={this._selectMenu}>
          <TiUser />
          <span>警力</span>
          <div className={`arrow-box ${_selected ? 'changed' : ''}`}>
            <span className={`arrow arrow-right ${_arrow}`} />
          </div>
        </div>

        <ul className={`police-force ${animate}`}>
          {options.map((item, index) => {
            const _isChecked = selectedTasks.indexOf(item) > -1;
            return (
              <li
                className={`work-item ${_isChecked ? 'checked' : ''}`}
                key={`work_option_${index}`}
                onClick={e => this._selectPolice(item, e)}
              >
                <div className={`checkbox ${_isChecked ? 'checked' : ''}`}>
                  {_isChecked ? <IoMdCheckmark /> : null}
                </div>
                <div
                  className="color-sign"
                  style={{ backgroundColor: item.color }}
                />
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  _selectMenu = async () => {
    const { curMenu } = this.state;
    const _nextMenu =
      curMenu === MenuItem.policeForce ? -1 : MenuItem.policeForce;
    _nextMenu !== -1 && Event.emit('change:curMenu', _nextMenu); // 下一个状态
    if (curMenu === _nextMenu) return; // 重复点击不做任何操作
    let _animate;
    if (_nextMenu === MenuItem.policeForce) {
      _animate = 'menu-down';
    } else if (curMenu === MenuItem.policeForce) {
      _animate = 'menu-up';
    } else {
      _animate = 'hidden';
    }
    this._intervalMod = 0;
    this._enableMove = false; // 禁止警车移动
    clearInterval(this._clockIntervalHandler); // 每次点击，关闭时清除定时器
    await this.setState({ curMenu: _nextMenu, animate: _animate }); // 动画
    if (_nextMenu === -1) {
      options.map(item => this._removeSourceLayer(item.layerId)); // 删除图层
    }
  };

  // 复选框选中多个列表
  _selectPolice = async (item, e) => {
    e.stopPropagation();
    const { selectedTasks } = this.state;
    const _taskInd = selectedTasks.indexOf(item);
    const _isSelected = _taskInd > -1; // 点击之前是否已选中
    _isSelected ? selectedTasks.splice(_taskInd, 1) : selectedTasks.push(item); // 点击之前已选中，取消选中；点击之前未选中，选中
    await this.setState({ selectedTasks });
    this._intervalSearch(); // 定时请求
  };

  _intervalSearch = () => {
    const { selectedTasks } = this.state;
    if (selectedTasks.length === 0) {
      options.map(item => this._removeSourceLayer(item.layerId)); // 删除图层
      return; // 如果选中长度为0，返回
    }
    this._intervalMod = 0; // 重置取余
    this._enableMove = false; // 禁止警车移动
    clearInterval(this._clockIntervalHandler); // 清除定时器
    this._fetchData(); // 向后台请求数据
    this._clockIntervalHandler = setInterval(
      this._intervalFunc,
      carRerenderInterval
    ); // 定时器，以小车动一次为基准
  };

  _intervalFunc = () => {
    this._intervalMod = this._intervalMod + 1; // 递增
    if (this._intervalMod % policeCarRatio === 0) {
      this._fetchPoliceCar(); // 请求警车额数据
    }
    if (this._intervalMod % policeCarRatio >= carDelayRatio) {
      // todo 小车延时 carDelayInterval 毫秒显示
      !this._isLoading && this._drawPoliceCars(); // 如果请求回来了，重绘
    }
    if (this._intervalMod >= handheldRatio) {
      // 假设手持设备更新频率最慢，重置定时取余
      this._intervalMod = 0; // 重置定时取余
      // 获取手持设备数据
    }
  };

  _fetchData = () => {
    const { selectedTasks } = this.state;
    for (let item of options) {
      if (selectedTasks.indexOf(item) <= -1) {
        this._removeSourceLayer(item.layerId);
        continue;
      } // 删除对应图层
      if (item.value === 'policman') {
      }
      if (item.value === 'policecar') {
        this._fetchPoliceCar();
      }
    }
  };

  _fetchPoliceCar = async () => {
    // todo 如果当前缩放层级小于最小显示层级，返回
    const _param = {}; // 请求参数
    const _startTime = new Date().getTime(); // 开始请求的时间
    this._isLoading = true; // 开始请求
    const { res, err } = await FetchLocationCar(_param); // 向后台请求数据
    const _endTime = new Date().getTime(); // 结束请求时间
    const _reqTime = _endTime - _startTime; // 请求时间
    let _timeout = 0; // 超时时间
    if (_reqTime > carDelayInterval) {
      _timeout = _reqTime - carDelayInterval; // 请求时间大于 carDelayInterval 延时时间
    }
    console.log('%c ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', 'color: green');
    if (err || !IsArray(res)) return; // 保护
    this._nextPoliceCar = {}; // 下一秒车子位置
    for (let carInfo of res) {
      const { roadPoints, flag, objectID } = carInfo; // 解构
      if (roadPoints.length === 0) continue; // 如果没有道路，结束当前循环
      if (flag === '2') {
        const _lineFeatures = LineString(roadPoints, { objectID });
        const _lineLen = LineDistance(_lineFeatures, units); // 道路长度，单位：千米
        const _speed =
          (_lineLen / (policeCarInterval - _timeout)) * carRerenderInterval; // 汽车行驶速度，单位：千米 / 秒
        this._nextPoliceCar[objectID] = {
          count: 0, // 该字段记录 警车 在该道路上行驶到哪个点
          speed: _speed, // 该字段记录小车
          lineLen: _lineLen, // 道路总长度
          features: _lineFeatures, // 该字段记录道路的 feature
          flag: flag // 该字段记录 flag
        };
      }
    }
    this._isLoading = false; // 结束请求，处理结束
    // 如果请求时间大于 carDelayInterval 延时时间，重绘 =====> 保护
    if (_reqTime > carDelayInterval) {
      this._drawPoliceCars();
    }
  };

  _drawPoliceCars = () => {
    this._curPoliceCar = this._nextPoliceCar; // 将下一个状态赋值给当前状态
    if (IsEmpty(this._curPoliceCar)) return; // 保护
    const _policeCarOption = options.filter(
      item => item.value === 'policecar'
    )[0]; // 警车 option
    const _features = Object.keys(this._curPoliceCar).map(key => {
      const _policeCarInfo = this._curPoliceCar[key];
      const { count, features, speed, lineLen } = _policeCarInfo;
      let _feature;
      if (count * speed >= lineLen) {
        _feature = TurfAlong(features, count * speed, units); // count * speed 是行驶的距离
      } else {
        _feature = TurfAlong(features, lineLen, units); // 如果行驶距离大于当前距离，暂停在那
      }
      _policeCarInfo.count++;
      return _feature;
    });
    DrawIconPoint(_MAP_, {
      id: _policeCarOption.layerId,
      features: _features,
      iconImage: 'security-car'
    }); // 绘制待点击的点
  };

  _removeSourceLayer = layerId => {
    _MAP_.getLayer(layerId) && _MAP_.removeLayer(layerId).removeSource(layerId); // 删除所有 layer 和 source
  };
}

const options = [
  {
    value: 'policman',
    name: '警员',
    color: '#EF9DA1',
    layerId: 'MENU_LIST_POLICE_FORCE_MAN'
  },
  {
    value: 'policecar',
    name: '警车',
    color: '#9B5C8B',
    layerId: 'MENU_LIST_POLICE_FORCE_CAR'
  }
];

const policeCarInterval = 10 * 1000; // 警车请求间隔，单位：毫秒
const carDelayInterval = 5 * 1000; // 警车延时时间，单位：毫秒
const carRerenderInterval = 20; // 警车移动时间间隔，单位：毫秒 ==========> 一定要可以被 1000 整除！！！！！
const handheldIntereval = 30 * 1000; // 手持设备请求时间间隔，单位：毫秒

const policeCarRatio = policeCarInterval / carRerenderInterval; // 请求警车数据时间间隔 与 小车动一次时间间隔 的比例
const handheldRatio = handheldIntereval / carRerenderInterval; // 手持设备
const carDelayRatio = carDelayInterval / carRerenderInterval; // 警车延时刷新比

const units = 'kilometers';

const symbolLabelLayerId = 'symbol-ref';
const handheldStyle = {
  visibleLevel: 16,
  source: {
    MENU_LIST_POLICE_CAR_SOURCE: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        `${
          BaseConfig.tileHost
        }originMapServer/string?test=locationHandHeld&type=tms&zoom={z}&row={x}&column={y}`
      ]
    }
  },
  layers: [
    {
      id: 'MENU_LIST_POLICE_FORCE_CAR',
      type: 'symbol',
      source: 'MENU_LIST_POLICE_CAR_SOURCE',
      'source-layer': 'POI_LEVEL_8',
      layout: {
        'text-field': '{NAME}',
        visibility: 'visible',
        'symbol-placement': 'point',
        'text-size': 14,
        'icon-text-fit': 'both',
        'icon-text-fit-padding': [2, 4, 2, 4],
        'text-justify': 'center',
        'text-font': ['黑体'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport',
        'text-anchor': 'center',
        'text-keep-upright': false
      },
      paint: {
        'text-color': 'rgba(65, 65, 65, 0.9)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      },
      labelLayerId: symbolLabelLayerId
    }
  ]
};
