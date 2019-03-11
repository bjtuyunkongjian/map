import React, { Component } from 'react';
import { IoMdCheckmark } from 'react-icons/io';
import { TiUser } from 'react-icons/ti';
import {
  lineString as LineString,
  lineDistance as LineDistance,
  along as TurfAlong,
  point as TurfPoint
} from 'turf';
import { IsEmpty, IsArray, AddLevel, Event as GlobalEvent } from 'tuyun-utils';
import { BaseConfig } from 'tuyun-config';

import { FetchLocationCar, QueryDetail, FetchAllRoutes } from './webapi';
import Dialog from './dialog';
import SecurityRoute from './security-route';

import Event from '../event';
import { MenuItems } from '../constant';

export default class PoliceForce extends Component {
  state = {
    curMenu: -1,
    selectedTasks: [],
    animate: 'hidden',
    showDialog: false,
    dialogTitle: '警员信息',
    dialogInfo: [],
    selectedRoutePlan: [],
    routeList: []
  };

  _intervalStart = []; // 记录起始定时时间，第 0 位是请求定时时间
  _clockIntervalHandler = undefined; // 定时器句柄
  _intervalMod = 0; // 定时
  _curPoliceCar = {}; // 警车数据，当前
  _nextPoliceCar = {}; // 警车数据，下一刻数据
  _isLoadingPoliceCar = false; // 判断请求警车数据有没有回来
  _enableStart = false; // 可以开始
  _securityRoute = []; // 安保路线
  _selectedPoliceCar = undefined;
  _searchCarInfo = {}; // 搜索结果
  _searchManInfo = {}; // 搜索结果

  componentDidMount = () => this._init();
  componentWillUpdate = () => {
    const { selectedTasks } = this.state;
    const _selectedPoliceMan = !!selectedTasks.filter(
      item => item.value === 'policeman'
    )[0];
    const _selectedPoliceCar = !!selectedTasks.filter(
      item => item.value === 'policecar'
    )[0];
    GlobalEvent.emit(
      'change:TopSearch:disable',
      !_selectedPoliceMan || !_selectedPoliceCar
    );
  };

  render() {
    const {
      curMenu,
      selectedTasks,
      animate,
      showDialog,
      dialogTitle,
      dialogInfo,
      selectedRoutePlan,
      routeList
    } = this.state;
    const _selected = curMenu === MenuItems.policeForce;
    const _arrow = _selected ? 'arrow-down' : 'arrow-right';
    const _showRoute = !!selectedTasks.filter(
      item => item.value === 'securityRoute'
    )[0];
    return (
      <div className="menu-item content">
        <div className="item-label" onClick={this._selectMenu}>
          <TiUser />
          <span>警力</span>
          <div className={`arrow-box ${_selected ? 'changed' : ''}`}>
            <span className={`arrow ${_arrow}`} />
          </div>
        </div>

        <ul className={`police-force ${animate}`}>
          {options.map((item, index) => {
            const _isChecked = selectedTasks.indexOf(item) > -1;
            return (
              <li
                className={`work-item ${_isChecked ? 'checked' : ''}`}
                key={`work_option_${index}`}
                onClick={e => this._selectMenuItem(item, e)}
              >
                <div className={`checkbox ${_isChecked ? 'checked' : ''}`}>
                  {_isChecked ? <IoMdCheckmark /> : null}
                </div>
                {item.name}
              </li>
            );
          })}
        </ul>

        {_selected ? (
          <Dialog
            visible={showDialog}
            title={dialogTitle}
            onClose={this._closeDialog}
            dialogInfo={dialogInfo}
          />
        ) : null}

        {_selected && _showRoute ? (
          <SecurityRoute
            visible={_showRoute}
            selectedPlan={selectedRoutePlan}
            routeList={routeList}
            onSelect={this._selectSecurityRoute}
          />
        ) : null}
      </div>
    );
  }

  _init = () => {
    _MAP_.on('click', handheldLayerId, async e => {
      const { objectID } = e.features[0].properties;
      if (!objectID) return;
      const { res, err } = await QueryDetail({ objectid: objectID });
      if (err || !res) return;
      const { devicetypebig_name, name, policetypebig_name } = res;
      const _deviceType = `设备名称：${devicetypebig_name || '暂无'}`;
      const _callNum = `呼号：${name || '暂无'}`;
      const _policeType = `警种类型：${policetypebig_name || '暂无'}`;
      this.setState({
        showDialog: true,
        dialogTitle: '警员信息',
        dialogInfo: [_deviceType, _callNum, _policeType]
      }); // 点击手持设备事件
    });

    _MAP_.on('click', policecarLayerId, async e => {
      const { objectID } = e.features[0].properties;
      if (!objectID) return;
      const { res, err } = await QueryDetail({ objectid: objectID });
      if (err || !res) return;
      const { devicetypebig_name, name, policetypebig_name } = res;
      const _deviceType = `设备名称：${devicetypebig_name || '暂无'}`;
      const _carNum = `设备号：${name || '暂无'}`;
      const _policeType = `警种类型：${policetypebig_name || '暂无'}`;
      this.setState({
        showDialog: true,
        dialogTitle: '警车信息',
        dialogInfo: [_deviceType, _carNum, _policeType]
      }); // 点击警车事件
    });

    _MAP_.on('click', manSearchResultLayerId, async e => {
      const { objectID } = e.features[0].properties;
      if (!objectID) return;
      const { res, err } = await QueryDetail({ objectid: objectID });
      if (err || !res) return;
      const { devicetypebig_name, name, policetypebig_name } = res;
      const _deviceType = `设备名称：${devicetypebig_name || '暂无'}`;
      const _carNum = `设备号：${name || '暂无'}`;
      const _policeType = `警种类型：${policetypebig_name || '暂无'}`;
      this.setState({
        showDialog: true,
        dialogTitle: '警车信息',
        dialogInfo: [_deviceType, _carNum, _policeType]
      }); // 点击警车事件
    });

    Event.on('change:curMenu', async nextMenu => {
      const { curMenu } = this.state;
      if (
        nextMenu === MenuItems.securityRoute &&
        curMenu === MenuItems.policeForce
      ) {
        const _animate = 'menu-up';
        await this.setState({
          curMenu: -1,
          animate: _animate,
          selectedTasks: [],
          showDialog: false
        }); // 重置
        // 警力动画，重置定时器并删除所有图层
        this._resetInterval(); // 重置定时器
        this._removePolicecarLayer(); // 删除警车图层
        this._removeHandheldLayer(); // 删除手持设备图层
      }
    }); // 选择当前菜单

    GlobalEvent.on('change:LeftMenu:searchInfo', ({ carInfo, manInfo }) => {
      if (!IsEmpty(manInfo) || !IsEmpty(carInfo))
        _MAP_.flyTo({ zoom: 10, center: [116.932, 36.656] });
      this._searchCarInfo = carInfo;
      this._searchManInfo = manInfo;
      if (IsEmpty(manInfo)) {
        this._removeSearchManLayer(); // 删除对应图层
        _MAP_.getLayer(handheldLayerId) &&
          _MAP_.setLayoutProperty(handheldLayerId, 'visibility', 'visible');
        return;
      }
      // 搜索没有警员信息
      const _features = Object.keys(manInfo).map(key => {
        const { objectId, latitude, longitude } = manInfo[key];
        return TurfPoint([longitude, latitude], { objectID: objectId });
      });
      _MAP_.getLayer(handheldLayerId) &&
        _MAP_.setLayoutProperty(handheldLayerId, 'visibility', 'none');
      if (!_MAP_.getSource(manSearchResultLayerId)) {
        _MAP_.addLayer(
          {
            id: manSearchResultLayerId,
            type: 'symbol',
            source: {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: _features
              }
            },
            layout: {
              'icon-image': 'ic_map_policeman',
              'icon-size': 1
            },
            labelLayerId: symbolLabelLayerId
          },
          symbolLabelLayerId
        );
      } else {
        _MAP_.getSource(manSearchResultLayerId).setData({
          type: 'FeatureCollection',
          features: _features
        });
      }
    });
  };

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
      curMenu === MenuItems.policeForce ? -1 : MenuItems.policeForce; // 下一个状态
    _nextMenu !== -1 && Event.emit('change:curMenu', _nextMenu); // 发射下一个状态
    if (curMenu === _nextMenu) return; // 重复点击不做任何操作
    // 菜单栏展开动画
    let _animate;
    if (_nextMenu === MenuItems.policeForce) {
      _animate = 'menu-down';
    } else if (curMenu === MenuItems.policeForce) {
      _animate = 'menu-up';
    } else {
      _animate = 'hidden';
    }
    await this.setState({
      curMenu: _nextMenu,
      animate: _animate,
      selectedTasks: [],
      showDialog: false
    }); // 重置
    // 警力动画，重置定时器并删除所有图层
    this._resetInterval(); // 重置定时器
    this._removePolicecarLayer(); // 删除警车图层
    this._removeHandheldLayer(); // 删除手持设备图层
  };

  // 复选框选中多个列表
  _selectMenuItem = async (item, e) => {
    e.stopPropagation();
    const { selectedTasks } = this.state;

    const _taskInd = selectedTasks.indexOf(item);
    const _isSelected = _taskInd > -1; // 点击之前是否已选中
    _isSelected ? selectedTasks.splice(_taskInd, 1) : selectedTasks.push(item); // 点击之前已选中，取消选中；点击之前未选中，选中
    await this.setState({ selectedTasks }); // 设置state
    // 如果选中路线
    if (item.value === 'securityRoute') {
      this._selectRoute();
      return;
    }
    this._intervalSearch(); // 定时请求
    if (item.value === 'policeman' && !_isSelected) {
      _MAP_.flyTo({ zoom: visibleLevel });
    }
  };

  _selectRoute = async () => {
    const { selectedTasks } = this.state;
    const _selected = selectedTasks.filter(
      item => item.value === 'securityRoute'
    )[0];
    if (_selected) {
      this._fetchAllRoutes();
    }
  };

  _fetchAllRoutes = async () => {
    // 如果没有安保路线，从后端获取安保路线
    const { res: allRoutes, err: allRoutesErr } = await FetchAllRoutes(); // 获取所有道路
    if (!allRoutes || allRoutesErr) return;
    const _dateLen = ('' + new Date().getTime()).length; // 日期长度
    const _routeList = allRoutes.map(item => {
      const _name = item.substr(0, item.length - _dateLen - 1);
      const _timeStep = item.substr(-_dateLen);
      const _dateTime = parseInt(_timeStep);
      const _newDate = new Date(_dateTime);
      const _year = _newDate.getFullYear();
      const _month = _newDate.getMonth() + 1;
      const _date = _newDate.getDate();
      return {
        name: _name,
        date: `${_year}-${_month}-${_date}`,
        timeStep: _timeStep,
        originName: item
      };
    });
    await this.setState({ routeList: _routeList });
  };

  _intervalSearch = () => {
    const { selectedTasks } = this.state;
    // 如果未选中任何选项
    if (
      selectedTasks.length === 0 ||
      (selectedTasks.length === 1 &&
        selectedTasks.filter(item => item.value === 'securityRoute')[0])
    ) {
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
      // if (flag === '2' || flag === '3') {
      let _objIdArr = IsArray(objectID) ? objectID : [objectID];
      if (this._curPoliceCar[_objIdArr[0]]) {
        const { coords } = this._curPoliceCar[_objIdArr[0]];
        if (coords && coords.length > 0) {
          _trajectory.unshift(coords[coords.length - 1]);
        }
      }
      const _lineFeatures = LineString(_trajectory, { objectID: _objIdArr }); // 生成 features
      const _lineLen = LineDistance(_lineFeatures, units); // 道路长度，单位：千米
      const _speed = _lineLen / _drivenTime; // 汽车行驶速度，单位：千米 / 毫秒
      let _addedFeatures,
        _addedLineLen = 0;
      if (this._curPoliceCar[_objIdArr[0]]) {
        const { features, lineLen, addedFeatures } = this._curPoliceCar[
          _objIdArr[0]
        ];
        if (lineLen < tailCarCount * carDistance) {
          // 前一段路长度不足，将上上段路补上
          const _addedCoords = addedFeatures
            ? addedFeatures.geometry.coordinates
            : [];
          const _originCoords = features ? features.geometry.coordinates : [];
          const _coords = [..._addedCoords, ..._originCoords];
          _addedFeatures = LineString(_coords, { objectID: _objIdArr });
        } else {
          // 前一段道路足够长，直接将前一段道路补上
          _addedFeatures = features;
        }
        _addedLineLen = _addedFeatures
          ? LineDistance(_addedFeatures, units)
          : 0;
      }
      this._nextPoliceCar[_objIdArr[0]] = {
        count: 0, // 该字段记录 警车 在该道路上行驶到哪个点
        flag: flag, // 该字段记录 flag
        speed: _speed, // 该字段记录小车
        lineLen: _lineLen, // 道路总长度
        features: _lineFeatures, // 该字段记录道路的 feature
        coords: _trajectory, // 坐标
        objectID: _objIdArr, // 警车 id
        addedFeatures: _addedFeatures, // 添加的 feature
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
      // if (key != '29999') return; // 显示固定的 objectid
      if (!IsEmpty(this._searchCarInfo) && !this._searchCarInfo[key]) return; // 如果搜索车结果不为空并且没有对应的车，返回

      if (objectIdRoadMap[key]) {
        // 未选中头尾车，返回
        const { selectedRoutePlan } = this.state;
        const { roadName } = objectIdRoadMap[key]; // 头尾车
        const _selected = selectedRoutePlan.filter(
          item => item.originName === roadName
        )[0];
        if (!_selected) return;
      }

      const _policeCarInfo = this._curPoliceCar[key];
      const {
        count,
        features,
        speed,
        addedFeatures,
        addedLineLen,
        objectID
      } = _policeCarInfo;
      // 计算头车信息
      const _moveDistance = count * carRerenderInterval * speed; // count * carRerenderInterval 是行驶时间，单位毫秒
      const _headFeature = TurfAlong(features, _moveDistance, units); // 生成头车 feature
      _headFeature.properties.objectID = objectID[0];
      _headFeature.properties.img = objectIdRoadMap[key]
        ? 'ic_map_wheel'
        : 'ic_map_headcar';
      _headFeatures.push(_headFeature);
      _policeCarInfo.count++;

      // 计算时间
      const _now = new Date();
      const _timeStamp = _now.getTime();
      const _year = _now.getFullYear();
      const _mouth = _now.getMonth();
      const _date = _now.getDate();
      const _startTime = new Date(
        _year,
        _mouth,
        _date,
        ...tailCarFollowingTime.start
      );
      const _endTime = new Date(
        _year,
        _mouth,
        _date,
        ...tailCarFollowingTime.end
      );
      if (!objectIdRoadMap[key]) return; // 如果没有id，不需要尾车
      if (_timeStamp < _startTime || _timeStamp > _endTime) return; // 如果不在该时间段之内，不添加尾车
      // 计算尾车信息
      const _hasAddedLine = !(IsEmpty(addedFeatures) || addedLineLen === 0); // 是否有添加的路线
      for (let i = tailCarCount; i > 0; i--) {
        let _tailFeature;
        const _distanceDiff = _moveDistance - i * carDistance; // 距离差值
        if (_distanceDiff <= 0) {
          if (_hasAddedLine) {
            let _len = addedLineLen + _distanceDiff; // 距离差值为负值，定义中间变量，记录离添加道路起点的距离
            _len = _len > 0 ? _len : 0; // 如果该值为负值，定为 0
            _tailFeature = TurfAlong(addedFeatures, _len, units); // 尾车 feature

            if (i === tailCarCount) {
              _tailFeature.properties.objectID = objectID[objectID.length - 1]; //尾车， 添加 objectid
              _tailFeature.properties.img = 'ic_map_wheel'; // 添加尾车图标
            } else {
              _tailFeature.properties.img = 'ic_map_wheel'; // 添加中间车图标
            }
            _tailFeatures.push(_tailFeature);
          }
        } else {
          _tailFeature = TurfAlong(features, _distanceDiff, units); // 距离差值为正值，直接计算
          if (i === tailCarCount) {
            _tailFeature.properties.objectid = objectID[objectID.length - 1]; // 添加 objectid
            _tailFeature.properties.img = 'ic_map_wheel'; // 添加尾车图标
          } else {
            _tailFeature.properties.img = 'ic_map_wheel'; // 添加中间车图标
          }
          _tailFeatures.push(_tailFeature);
        }
      }
    });
    const _features = [..._headFeatures, ..._tailFeatures];
    this._drawIconPoint(_features); // 绘制待点击的点
  };

  _addHandheldLayer = () => {
    this._addSourceFunc();
    _MAP_.on('zoomend', this._addSourceFunc);
  };

  _addSourceFunc = () => {
    AddLevel(_MAP_, handheldStyle); // 添加图层
    if (!IsEmpty(this._searchManInfo)) {
      _MAP_.getLayer(handheldLayerId) &&
        _MAP_.setLayoutProperty(handheldLayerId, 'visibility', 'none');
    }
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

  _removeSearchManLayer = () => {
    _MAP_.getSource(manSearchResultLayerId) &&
      _MAP_
        .removeLayer(manSearchResultLayerId)
        .removeSource(manSearchResultLayerId); // 删除对应图层
  };

  _drawIconPoint = features => {
    if (!_MAP_.getSource(policecarLayerId)) {
      _MAP_.addLayer(
        {
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
            'icon-image': ['get', 'img'],
            'icon-size': 1.3,
            'icon-padding': 0,
            'icon-allow-overlap': true
          }
        }
        // lineNameRef
      );
    } else {
      _MAP_.getSource(policecarLayerId).setData({
        type: 'FeatureCollection',
        features: features
      });
    }
  };

  _selectSecurityRoute = selectedRoutePlan => {
    this.setState({ selectedRoutePlan });
  };

  _closeDialog = () => {
    this.setState({ showDialog: false });
  };
}

const handheldLayerId = 'MENU_LIST_POLICE_FORCE_MAN';
const handheldSource = 'MENU_LIST_POLICE_CAR_SOURCE';
const policecarLayerId = 'MENU_LIST_POLICE_FORCE_CAR';
const securityRouteLayerId = 'MENU_LIST_SECURITY_ROUTE';
const manSearchResultLayerId = 'MAN_SEARCH_RESULT_LAYER_ID';
const options = [
  {
    value: 'policeman',
    name: '警员',
    layerId: handheldLayerId
  },
  {
    value: 'policecar',
    name: '警车',
    layerId: policecarLayerId
  },
  {
    value: 'securityRoute',
    name: '路线',
    layerId: securityRouteLayerId
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
const carDistance = 20 / 1000; // 两辆车的车距，单位：千米

const units = 'kilometers'; // 计算单位

const symbolLabelLayerId = 'symbol-ref';
const lineNameRef = 'line-name-ref';

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

const objectIdRoadMap = {
  '37010000000118234': {
    roadName: '舜耕山庄_1548319270213'
  },
  '37010000000118193': {
    roadName: '颐正大厦_1548325328859'
  },
  '37010000000118199': {
    roadName: '珍珠泉宾馆_1548319062920'
  },
  '37010000000061044': {
    roadName: '蓝海御华_1548325668029'
  },
  '37010000000118507': {
    roadName: '新闻大厦_1548319394926'
  },
  '37010000000118609': {
    roadName: '蓝海大饭店_1548726516459'
  },
  '37010000000118586': {
    roadName: '政协大厦_1548727605809'
  },
  '37010000000118602': {
    roadName: '中豪大酒店_1548727961283'
  }
}; // [ObjectId] : {roadName: 'xxxxxx'}
// 37010000000118168 备用
// 37010000000118507 新闻大厦
// 蓝海大饭店 20002 37010000000118609
// 政协大厦 20001 37010000000118586
// 中豪大酒店 20000 37010000000118602
// 备用
// 20003 37010000000118597
// 20004 37010000000118578
// 20005 37010000000118614

const tailCarFollowingTime = {
  start: [6, 0],
  end: [23, 0]
};
