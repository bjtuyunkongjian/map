import React, { Component } from 'react';
import Event from './event';
import { IoMdCheckmark } from 'react-icons/io';
import { TiUser } from 'react-icons/ti';
import MenuItem from './menu-item';
import { FetchGPSPolice } from './webapi';
import {
  point as TurfPoint,
  lineString as LineString,
  lineDistance as LineDistance,
  along as TurfAlong // 'kilometers
} from 'turf';
import { IsEmpty, IsArray } from 'tuyun-utils';

export default class WorkContent extends Component {
  state = {
    curMenu: -1,
    datanum: {},
    selectedTasks: [],
    animate: 'hidden'
  };

  _intervalStart = []; // 记录起始定时时间，第 0 位是请求定时时间
  _intervalHandler = undefined; // 定时器句柄
  _intervalMod = 0; // 定时
  _curPoliceCar = {}; // 警车数据，当前
  _nextPoliceCar = {}; // 警车数据，下一刻数据

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
    clearInterval(this._intervalHandler); // 每次点击，关闭时清除定时器
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
    clearInterval(this._intervalHandler); // 清除定时器
    this._fetchData(); // 向后台请求数据
    this._intervalHandler = setInterval(this._intervalFunc, carMoveInterval); // 定时器，以小车动一次为基准
  };

  _intervalFunc = () => {
    this._intervalMod = this._intervalMod + 1; // 递增
    const _policeCarRatio = policeCarInterval / carMoveInterval; // 请求警车数据时间间隔 与 小车动一次时间间隔 的比例
    if (this._intervalMod % _policeCarRatio === 0) {
      this._fetchPolice(); // 请求警车额数据
    }
    if (this._intervalMod % _policeCarRatio === 5) {
      // todo 小车延时五秒显示
      // this._drawPoliceCars(); // 绘制警车
    }
  };

  _fetchData = () => {
    const { selectedTasks } = this.state;
    for (let item of options) {
      selectedTasks.indexOf(item) > -1
        ? this._fetchPolice()
        : this._removeSourceLayer(item.layerId);
    }
  };

  _fetchPolice = async () => {
    // todo 如果当前缩放层级小于最小显示层级，返回
    const _param = {}; // 请求参数
    const { res, err } = await FetchGPSPolice(_param); // 向后台请求数据
    console.log(res);
    console.log('%c ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~', 'color: green');
    if (err || !IsArray(res)) return; // 保护
    this._nextPoliceCar = {}; // 下一秒车子位置
    for (let carInfo of res) {
      const { roadPoints, flag, objectID } = carInfo; // 解构
      if (roadPoints.length === 0) continue; // 如果没有道路，结束当前循环
      if (flag === '2') {
        const _lineString = LineString(roadPoints, { objectID });
        const _lineLen = LineDistance(_lineString); // 道路长度，单位：千米
        const _speed = (_lineLen / policeCarInterval) * 1000; // 汽车行驶速度，单位：千米 / 秒
        this._nextPoliceCar[objectID] = {
          count: 0, // 该字段记录 警车 在该道路上行驶到哪个点
          speed: _speed, // 该字段记录小车
          lineLen: _lineLen, // 道路总长度
          features: _lineString // 该字段记录道路的 feature
        };
      }
    }
  };

  _drawPoliceCars = () => {
    this._curPoliceCar = this._nextPoliceCar;
    if (IsEmpty(this._curPoliceCar)) return;
    DrawIconPoint(_MAP_, {
      id: option.layerId,
      features: _features,
      iconImage: 'security-car'
    }); // 绘制待点击的点
    if (!_MAP_.getSource(option.layerId)) {
      _MAP_.addLayer({
        id: option.layerId,
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: _features
          }
        },
        paint: {
          'circle-radius': {
            base: 10,
            stops: [[10, 10], [20, 30]]
          },
          'circle-color': '#e55e5e'
        }
      });
    } else {
      _MAP_.getSource(option.layerId).setData({
        type: 'FeatureCollection',
        features: _features
      });
    }
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
const carMoveInterval = 1 * 1000; // 警车移动时间间隔，单位：毫秒
const handheldIntereval = 30 * 1000; // 手持设备请求时间间隔，单位：毫秒
