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
  along as TurfAlong
} from 'turf';
import { IsEmpty, IsArray } from 'tuyun-utils';
import { BaseConfig } from 'tuyun-config';
import { AddLevel } from 'tuyun-utils';

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
  _isLoadingPoliceCar = false; // 判断请求警车数据有没有回来
  _enableStart = false; // 可以开始

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

  _resetInterval = () => {
    this._intervalMod = 0; // 重置
    this._curPoliceCar = {}; // 警车数据，当前
    this._nextPoliceCar = {}; // 警车数据，下一刻数据
    this._enableStart = false; // 重置
    clearInterval(this._clockIntervalHandler); // 清除定时器
  }; // 重置定时器

  _selectMenu = async () => {
    const { curMenu } = this.state;
    const _nextMenu =
      curMenu === MenuItem.policeForce ? -1 : MenuItem.policeForce; // 下一个状态
    _nextMenu !== -1 && Event.emit('change:curMenu', _nextMenu); // 发射下一个状态
    if (curMenu === _nextMenu) return; // 重复点击不做任何操作
    // 菜单栏展开动画
    let _animate;
    if (_nextMenu === MenuItem.policeForce) {
      _animate = 'menu-down';
    } else if (curMenu === MenuItem.policeForce) {
      _animate = 'menu-up';
    } else {
      _animate = 'hidden';
    }
    await this.setState({ curMenu: _nextMenu, animate: _animate }); // 动画
    // 警力动画，重置定时器并删除所有图层
    this._resetInterval(); // 重置定时器
    this._removePolicecarLayer(); // 删除警车图层
    this._removeHandheldLayer(); // 删除手持设备图层
  };

  // 复选框选中多个列表
  _selectPolice = async (item, e) => {
    e.stopPropagation();
    const { selectedTasks } = this.state;

    const _taskInd = selectedTasks.indexOf(item);
    const _isSelected = _taskInd > -1; // 点击之前是否已选中
    _isSelected ? selectedTasks.splice(_taskInd, 1) : selectedTasks.push(item); // 点击之前已选中，取消选中；点击之前未选中，选中
    await this.setState({ selectedTasks }); // 设置state
    this._intervalSearch(); // 定时请求
    if (item.value === 'policeman' && !_isSelected) {
      _MAP_.flyTo({ zoom: visibleLevel });
    }
  };

  _intervalSearch = () => {
    const { selectedTasks } = this.state;
    // 如果未选中任何选项
    if (selectedTasks.length === 0) {
      this._removePolicecarLayer();
      this._removeHandheldLayer(); // 删除图层
      return;
    }
    this._resetInterval(); // 清空定时器
    this._fetchData(); // 向后台请求数据
    this._clockIntervalHandler = setInterval(
      this._intervalFunc,
      carRerenderInterval
    ); // 定时器，以小车动一次为基准
  };

  _intervalFunc = () => {
    const { selectedTasks } = this.state;
    const _handheldSelected = selectedTasks.filter(
      item => item.value === 'policeman'
    )[0]; // 选中警员
    const _selectedPolicecar = selectedTasks.filter(
      item => item.value === 'policecar'
    )[0]; // 选中警员
    _selectedPolicecar && this._drawPoliceCars(); // 选中警车，每过 carRerenderInterval 毫秒重绘警车
    this._intervalMod = this._intervalMod + 1; // 递增
    if (this._intervalMod % policeCarRatio === 0) {
      _selectedPolicecar && this._fetchPoliceCar(); // 选中警车，请求警车额数据
    }
    if (this._intervalMod % policeCarRatio === carDelayRatio) {
      // 每经过一个 carDelayRatio ，也就是 carDelayInterval 毫秒，如果没有在加载警车数据，将下一个数据赋值给当前数据
      !this._isLoadingPoliceCar && (this._curPoliceCar = this._nextPoliceCar);
    }
    if (this._intervalMod >= handheldRatio) {
      // 假设手持设备更新频率最慢，重置定时取余
      this._intervalMod = 0; // 重置定时取余
      if (_handheldSelected) {
        this._removeHandheldLayer(); // 删除手持设备图层
        this._addHandheldLayer(); // 添加手持设备图层
      } else {
        this._removeHandheldLayer(); // 删除手持设备图层
      }
    }
  };

  _fetchData = () => {
    const { selectedTasks } = this.state;
    for (let item of options) {
      const _selected = selectedTasks.indexOf(item) > -1; // 是否选中
      if (item.value === 'policeman') {
        _selected ? this._addHandheldLayer() : this._removeHandheldLayer(); // 选中警员
      }
      if (item.value === 'policecar') {
        _selected ? this._fetchPoliceCar() : this._removePolicecarLayer(); // 选中警车
      }
    }
  };

  _fetchPoliceCar = async () => {
    const _param = {}; // 请求参数
    const _startTime = new Date().getTime(); // 开始请求的时间
    this._isLoadingPoliceCar = true; // 开始请求
    const { res, err } = await FetchLocationCar(_param); // 向后台请求数据
    if (!res || err) return; // 保护
    const _endTime = new Date().getTime(); // 结束请求时间
    const _reqTime = _endTime - _startTime; // 请求时间
    let _timeout = 0; // 超时时间
    if (_reqTime > carDelayInterval) {
      _timeout = _reqTime - carDelayInterval; // 请求时间大于 carDelayInterval 延时时间
    }
    if (err || !IsArray(res)) return; // 保护
    let _drivenTime; // 行驶时间
    if (!this._enableStart) {
      _drivenTime = policeCarInterval - _reqTime;
    } else {
      _drivenTime = policeCarInterval - _timeout;
    }
    this._nextPoliceCar = {}; // 下一秒车子位置
    for (let carInfo of res) {
      const { roadPoints, flag, objectID, gpsPoints } = carInfo; // 解构
      let _trajectory; // 轨迹
      if (roadPoints.length === 0) {
        _trajectory = gpsPoints;
        // continue; // 如果没有道路，结束当前循环
      } else {
        _trajectory = roadPoints;
      }
      // if (flag === '2') {
      let _objIdArr = IsArray(objectID) ? objectID : [objectID];
      const _lineFeatures = LineString(_trajectory, { objectID: _objIdArr }); // 生成 features
      const _lineLen = LineDistance(_lineFeatures, units); // 道路长度，单位：千米
      const _speed = _lineLen / _drivenTime; // 汽车行驶速度，单位：千米 / 毫秒
      let _addFeatures,
        _addedLineLen = 0;
      if (this._curPoliceCar[_objIdArr[0]]) {
        const { features, lineLen, addedFeatures } = this._curPoliceCar[
          _objIdArr[0]
        ];
        if (lineLen < tailCarCount * carDistance) {
          // 前一段路长度不足，将上上段路补上
          const _coords = [
            addedFeatures.geometry.coordinates,
            features.geometry.coordinates
          ];
          _addFeatures = LineString(_coords, { objectID: _objIdArr });
        } else {
          // 前一段道路足够长，直接将前一段道路补上
          _addFeatures = features;
        }
        _addedLineLen = LineDistance(_addFeatures, units);
      }
      this._nextPoliceCar[_objIdArr[0]] = {
        count: 0, // 该字段记录 警车 在该道路上行驶到哪个点
        flag: flag, // 该字段记录 flag
        speed: _speed, // 该字段记录小车
        lineLen: _lineLen, // 道路总长度
        features: _lineFeatures, // 该字段记录道路的 feature
        coords: _trajectory, // 坐标
        objectID: _objIdArr, // 警车 id
        addedFeatures: _addFeatures, // 添加的 feature
        addedLineLen: _addedLineLen // 添加道路的长度
      };
      // }
    }
    this._isLoadingPoliceCar = false; // 结束请求，处理结束
    // 如果请求时间大于 carDelayInterval 延时时间，重绘 =====> 保护
    if (!this._enableStart) {
      this._enableStart = true;
      this._curPoliceCar = this._nextPoliceCar;
    } else if (_reqTime > carDelayInterval) {
      this._curPoliceCar = this._nextPoliceCar;
    }
  };

  _drawPoliceCars = () => {
    if (IsEmpty(this._curPoliceCar)) return; // 保护
    const _headFeatures = [];
    const _tailFeatures = [];
    Object.keys(this._curPoliceCar).map(key => {
      const _policeCarInfo = this._curPoliceCar[key];
      const {
        count,
        features,
        speed,
        addedFeatures,
        addedLineLen
      } = _policeCarInfo;
      const _moveDistance = count * carRerenderInterval * speed; // count * carRerenderInterval 是行驶时间，单位毫秒
      const _headFeature = TurfAlong(features, _moveDistance, units); // 生成头车 feature
      _headFeatures.push(_headFeature);
      _policeCarInfo.count++;
      if (IsEmpty(addedFeatures) || addedLineLen === 0) return;
      for (let i = tailCarCount; i > 0; i--) {
        let _tailFeature;
        const _distanceDiff = _moveDistance - i * carDistance; // 距离差值
        if (_distanceDiff < 0) {
          let _len = addedLineLen + _distanceDiff; // 距离差值为负值，定义中间变量，记录离添加道路起点的距离
          _len = _len > 0 ? _len : 0; // 如果该值为负值，定为 0
          _tailFeature = TurfAlong(_len, _moveDistance, units); // 尾车 feature
        } else {
          _tailFeature = TurfAlong(features, _distanceDiff, units); // 距离差值为正值，直接计算
        }
        _tailFeatures.push(_tailFeature);
      }
    });
    const _features = [..._tailFeatures, ..._headFeatures];
    this._drawIconPoint(_features); // 绘制待点击的点
  };

  _addHandheldLayer = () => {
    this._addSourceFunc();
    // _MAP_.flyTo({ zoom: visibleLevel });
    _MAP_.on('zoomend', this._addSourceFunc);
  };

  _addSourceFunc = () => {
    AddLevel(_MAP_, handheldStyle); // 添加图层
  };

  _removeHandheldLayer = () => {
    _MAP_.off('zoomend', this._addSourceFunc);
    _MAP_.getLayer(handheldLayerId) &&
      _MAP_.removeLayer(handheldLayerId).removeSource(handheldSource);
  };

  _removePolicecarLayer = () => {
    _MAP_.getLayer(policecarLayerId) &&
      _MAP_.removeLayer(policecarLayerId).removeSource(policecarLayerId); // 删除所有 layer 和 source
  };

  _drawIconPoint = features => {
    if (!_MAP_.getSource(policecarLayerId)) {
      _MAP_.addLayer({
        id: policecarLayerId,
        type: 'symbol',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: features
          }
        },
        layout: {
          'icon-image': 'ic_map_policecar',
          'icon-size': 1.3
        }
      });
    } else {
      _MAP_.getSource(policecarLayerId).setData({
        type: 'FeatureCollection',
        features: features
      });
    }
  };
}

const handheldLayerId = 'MENU_LIST_POLICE_FORCE_MAN';
const handheldSource = 'MENU_LIST_POLICE_CAR_SOURCE';
const policecarLayerId = 'MENU_LIST_POLICE_FORCE_CAR';
const options = [
  {
    value: 'policeman',
    name: '警员',
    color: '#EF9DA1',
    layerId: handheldLayerId
  },
  {
    value: 'policecar',
    name: '警车',
    color: '#9B5C8B',
    layerId: policecarLayerId
  }
];

const policeCarInterval = 10 * 1000; // 警车请求间隔，单位：毫秒
const carDelayInterval = 5 * 1000; // 警车延时时间，单位：毫秒
const carRerenderInterval = 20; // 警车移动时间间隔，单位：毫秒 ==========> 一定要可以被 1000 整除！！！！！
const handheldIntereval = 30 * 1000; // 手持设备请求时间间隔，单位：毫秒

const policeCarRatio = policeCarInterval / carRerenderInterval; // 请求警车数据时间间隔 与 小车动一次时间间隔 的比例
const handheldRatio = handheldIntereval / carRerenderInterval; // 手持设备
const carDelayRatio = carDelayInterval / carRerenderInterval; // 警车延时刷新比

const tailCarCount = 3; // 尾车数量
const carDistance = 10; // 两辆车的车距

const units = 'kilometers'; // 计算单位

const symbolLabelLayerId = 'symbol-ref';
// 手持设备样式配置
const visibleLevel = 15;
const handheldStyle = {
  visibleLevel: visibleLevel,
  source: {
    [handheldSource]: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        `${
          BaseConfig.bffHost
        }GPSServer/string?test=locationHandHeld&type=tms&zoom={z}&row={x}&column={y}`
      ],
      minzoom: visibleLevel
    }
  },
  layers: [
    {
      id: handheldLayerId,
      type: 'symbol',
      source: handheldSource,
      'source-layer': 'handHeld',
      layout: {
        'icon-image': 'ic_map_policeman',
        'icon-size': 1
      },
      labelLayerId: symbolLabelLayerId
    }
  ]
};
