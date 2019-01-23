import React, { Component } from 'react';
import { FetchAllRoutes, FetchRouteInfo } from '../menu-list/webapi';
import { lineString as LineString } from 'turf';
import { IoMdCheckmark } from 'react-icons/io';

export default class SecurityRoute extends Component {
  static defaultProps = {
    visible: false,
    selectedPlan: [],
    routeList: []
  };

  _carRoutes = {}; // 安保路线
  _colorIndex = 0; // 颜色索引
  _securityRoute = []; // 当前显示的安保路线
  _carStateMap = {}; // 车辆状态

  componentDidMount = () => this._init();

  componentWillUnmount = () => this._reset();

  render() {
    const { visible, selectedPlan, routeList } = this.props;
    if (!visible) return null;
    return (
      <div className="security-route">
        <div className="title">重大安保轨迹</div>
        <ul className="table-wrap">
          {routeList.map((item, index) => {
            const _isChecked = selectedPlan.indexOf(item) > -1;
            const _selectedVal = this._carStateMap[item.originName];
            return (
              <li className="table-row" key={`route_list_${index}`}>
                <div
                  className={`checkbox ${_isChecked ? 'checked' : ''}`}
                  onClick={() => this._selectRoute(item)}
                >
                  {_isChecked ? <IoMdCheckmark /> : null}
                </div>
                <div
                  className="table-name"
                  onClick={() => this._selectRoute(item)}
                >
                  {item.name}
                </div>
                <select
                  className="table-select"
                  value={_selectedVal}
                  onChange={e => {
                    this._carStateMap[item.originName] = e.target.value;
                    storage.setItem(
                      storageKey,
                      JSON.stringify(this._carStateMap)
                    );
                  }}
                >
                  <option value="toStart">未出发</option>
                  <option value="started">已出发</option>
                  <option value="arrived">已到达</option>
                </select>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  _init = () => {
    const _storageString = storage.getItem(storageKey);
    this._carStateMap = _storageString ? JSON.parse(_storageString) : {};
    this._fetchAllRoutes();
  };

  _reset = () => {
    this._removeSecurityRouteLayer();
  };

  _fetchAllRoutes = async () => {
    const { res, err } = await FetchAllRoutes(); // 获取所有道路
    if (!res || err) return;
    const _dateLen = ('' + new Date().getTime()).length; // 日期长度
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

  _selectRoute = item => {
    const { selectedPlan, onSelect } = this.props;
    const _index = selectedPlan.indexOf(item);
    const _selected = _index > -1;
    if (_selected) {
      // 之前选中，删除选项
      selectedPlan.splice(_index, 1);
    } else {
      // 之前不选中，添加选项
      selectedPlan.push(item);
    }
    onSelect(selectedPlan);
    if (this._carRoutes[item.originName]) {
      const { coords } = this._carRoutes[item.originName];
      !_selected && _MAP_.flyTo({ center: coords[0], zoom: 15 });
      this._drawRoad(); // 已存在当前道路
    } else {
      this._fetchRouteDetail(item.originName); // 未存在当前道路
    }
  };

  _fetchRouteDetail = async originName => {
    const { res, err } = await FetchRouteInfo({ fileName: originName }); // 去后端请求数据
    if (!res || err) return;
    const { features } = res;
    const _roadCoords = [];
    for (let feature of features) {
      const { coordinates } = feature.geometry;
      for (let coords of coordinates) {
        _roadCoords.push(coords);
      }
    }
    const _lineColor = colorArr[this._colorIndex]; // 线条颜色
    this._colorIndex =
      this._colorIndex === colorArr.length - 1 ? 0 : this._colorIndex + 1;
    const _newFeatures = LineString(_roadCoords, {
      lineColor: _lineColor // todo set color
    });
    this._carRoutes[originName] = {
      features: _newFeatures,
      coords: _roadCoords
    };
    _MAP_.flyTo({ center: _roadCoords[0], zoom: 15 }); // 以刚点击的路线的起点为中心点
    this._drawRoad();
  };

  _drawRoad = () => {
    const { selectedPlan } = this.props;
    const _features = [];
    for (let item of selectedPlan) {
      const { originName } = item;
      if (!this._carRoutes[originName]) continue;
      _features.push(this._carRoutes[originName].features);
    }
    if (!_MAP_.getSource(securityRouteLayerId)) {
      _MAP_.addLayer(
        {
          id: securityRouteLayerId,
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
      _MAP_.getSource(securityRouteLayerId).setData({
        type: 'FeatureCollection',
        features: _features
      });
    }
  };

  _removeSecurityRouteLayer = () => {
    _MAP_.getLayer(securityRouteLayerId) &&
      _MAP_
        .removeLayer(securityRouteLayerId)
        .removeSource(securityRouteLayerId); // 删除所有 layer 和 source
  };
}

const colorArr = ['#ff0056', '#e66f51', '#2a9d8e', '#264653'];

const securityRouteLayerId = 'MENU_LIST_SECURITY_ROUTE';
const lineTopRef = 'line-top-ref';
const storage = window.localStorage;
const storageKey = 'tuyun:carStateMap';
