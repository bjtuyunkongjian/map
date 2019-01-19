import React, { Component } from 'react';
import { FetchAllRoutes, FetchRouteInfo } from './webapi';
import { DrawRoad, DrawIconPoint } from './security-route-layer';
import Turf, {
  lineDistance as LineDistance,
  lineString as LineString,
  point as TurfPoint,
  along as TurfAlong
} from 'turf';
import { IoMdCheckmark } from 'react-icons/io';

export default class ViewRoute extends Component {
  state = {
    routeList: [],
    selectedPlan: []
  };

  _carRoutes = {}; // []: {carId: '', roadId: ''}
  _animateInterval = undefined; // 动画定时器
  _colorIndex = 0; // 记录使用的是第几个颜色

  componentDidMount = () => this._init();

  componentWillUnmount = () => this._reset();

  render() {
    const { routeList, selectedPlan } = this.state;
    return (
      <div className="view-route">
        <div className="title">重大安保轨迹</div>
        <ul className="table-wrap">
          {routeList.map((item, index) => {
            const _isChecked = selectedPlan.indexOf(item) > -1;
            return (
              <li
                className="table-row"
                key={`route_list_${index}`}
                onClick={() => this._selectRoute(item)}
              >
                <div className={`checkbox ${_isChecked ? 'checked' : ''}`}>
                  {_isChecked ? <IoMdCheckmark /> : null}
                </div>
                <div className="table-name">{item.name}</div>
                <div className="table-date">{item.date}</div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  _init = async () => {
    this._fetchAllRoutes(); // 获取所有道路
  };

  _reset = () => {
    clearInterval(this._animateInterval); // 清空定时器
    this._removeSourceLayer(carId); // 删除小车图层
    this._removeSourceLayer(roadId); // 删除道路图层
  };

  _fetchAllRoutes = async () => {
    const { res, err } = await FetchAllRoutes();
    if (!res || err) return console.log('获取重大安保轨迹失败');
    const _dateLen = ('' + new Date().getTime()).length;
    const _routeList = res.map(item => {
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
    this.setState({ routeList: _routeList });
  };

  // 选中道路
  _selectRoute = async routePlan => {
    const { selectedPlan } = this.state;
    const { originName } = routePlan;
    const _index = selectedPlan.indexOf(routePlan); // 当前点击安保路线在选中安保路线中的索引
    const _isChecked = selectedPlan.indexOf(routePlan) > -1; // 判断选中安保路线中是否已经有点击的路线
    _isChecked ? selectedPlan.splice(_index, 1) : selectedPlan.push(routePlan); // 如果显示已选中，删除；如果未选中，添加
    await this.setState({ selectedPlan }); // 设置选中方案
    const _carRoute = this._carRoutes[originName];
    if (_carRoute) {
      // 已加载过该条道路，如果有选中的路线方案，重绘道路和小车
      _carRoute.drivenLength = 0; // 重置小车移动距离
      if (!_isChecked) {
        const _startCoords = _carRoute.startCoords; // 计算该条道路起始点坐标
        _MAP_.flyTo({ center: _startCoords, zoom: 15 }); // 如果是选中该条道路，飞到该条道路起始位置
      }
      if (selectedPlan.length > 0) {
        this._drawRoad(); // 重新绘制路线
        this._animateCar(); // 小车动画
      } else {
        clearInterval(this._animateInterval); // 清空定时器
        this._removeSourceLayer(carId); // 删除小车图层
        this._removeSourceLayer(roadId); // 删除道路图层
        this._carRoutes[originName].drivenLength = 0; // 重置该图层行驶过的路程
      }
    } else {
      this._fetchRouteInfo(originName); // 如果未加载过该条道路，去后端加载该条道路，请求结束后重绘
    }
  };

  // 获取道路信息
  _fetchRouteInfo = async originName => {
    const { res, err } = await FetchRouteInfo({ fileName: originName }); // 去后端请求数据
    if (!res || err) return console.log('获取重大安保轨迹详情失败');
    const { features } = res;
    const _roadCoords = [];
    for (let feature of features) {
      const { coordinates } = feature.geometry;
      for (let coords of coordinates) {
        _roadCoords.push(coords);
      }
    }
    const _lineColor = colorArr[this._colorIndex]; // 线条颜色
    console.log(_lineColor, this._colorIndex);
    this._colorIndex =
      this._colorIndex === colorArr.length - 1 ? 0 : this._colorIndex + 1;
    const _newFeatures = LineString(_roadCoords, {
      lineColor: _lineColor // todo set color
    }); // 生成 features
    const _roadLen = LineDistance(_newFeatures, units); // 道路总长
    this._carRoutes[originName] = {
      features: _newFeatures, // 该字段记录 features
      drivenLength: 0, // 行驶长度
      roadLength: _roadLen, // 道路总长度
      lineColor: _lineColor, // 该字段记录线条颜色
      startCoords: _roadCoords[0], // 该字段记录起始坐标
      endCoords: _roadCoords[_roadCoords.length - 1] // 该字段记录道路最后一个坐标
    };
    _MAP_.flyTo({ center: _roadCoords[0], zoom: 15 }); // 以刚点击的路线的起点为中心点
    this._drawRoad(); // 重新绘制路线
    this._animateCar(); // 小车动画
  };

  // 绘制路线
  _drawRoad = () => {
    const { selectedPlan } = this.state;
    const _features = [];
    for (let item of selectedPlan) {
      const { originName } = item;
      if (!this._carRoutes[originName]) continue;
      const { features } = this._carRoutes[originName];
      _features.push(features);
    }
    if (!_MAP_.getSource(roadId)) {
      _MAP_.addLayer(
        {
          id: roadId,
          type: 'line',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: _features
            }
          },
          layout: {
            'line-join': 'round',
            'line-cap': 'round'
          },
          paint: {
            'line-color': ['get', 'lineColor'],
            'line-width': 8,
            'line-opacity': 0.5
          }
        },
        lineTopRef
      );
    } else {
      _MAP_.getSource(roadId).setData({
        type: 'FeatureCollection',
        features: _features
      });
    }
  };

  // 警车动画
  _animateCar = () => {
    const intrevalTime = 10; // 单位：毫秒
    this._animateInterval = setInterval(() => {
      const { selectedPlan } = this.state;
      const _speedPerInterval = (carSpeed * intrevalTime) / 1000; // 每个定时器间隔行驶的距离
      const _features = [];
      for (let item of selectedPlan) {
        const { originName } = item;
        if (!this._carRoutes[originName]) continue; // 保护
        const {
          features,
          drivenLength,
          roadLength,
          endCoords
        } = this._carRoutes[originName]; // 解构
        let _feature; // 计算呢小车位置
        if (roadLength <= drivenLength) {
          _feature = TurfPoint(endCoords); // 如果超出总长度，直接赋值最后一个值
        } else {
          _feature = TurfAlong(features, drivenLength, units); // 如果没有超出总长度，计算当前的 feature
        }
        this._carRoutes[originName].drivenLength += _speedPerInterval; // 下一个节点
        _features.push(_feature);
      }
      this._drawIconPoint(_features);
    }, intrevalTime);
  };

  _drawIconPoint = features => {
    if (!_MAP_.getSource(carId)) {
      _MAP_.addLayer({
        id: carId,
        type: 'symbol',
        source: {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: features
          }
        },
        layout: {
          'icon-image': 'ic_map_policecar'
        }
      });
    } else {
      _MAP_.getSource(carId).setData({
        type: 'FeatureCollection',
        features: features
      });
    }
  };

  _removeSourceLayer = layerId => {
    _MAP_.getLayer(layerId) && _MAP_.removeLayer(layerId).removeSource(layerId); // 删除所有 layer 和 source
  };
}

const carSpeed = 16.6 / 1000; // 汽车运行速度， 多少 units 每秒
const units = 'kilometers'; // 单位
const carId = 'MENU_LIST_VIEW_ROUTE_CAR_'; // 汽车 id
const roadId = 'MENU_LIST_VIEW_ROUTE_ROAD_'; // 道路 id
const colorArr = ['#f19ec2', '#89c997', '#aa89bd', '#7ecef4'];
const lineTopRef = 'line-top-ref';
const lineNameRef = 'line-name-ref';
