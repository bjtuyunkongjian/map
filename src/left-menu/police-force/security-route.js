import React, { Component } from 'react';
import { FetchAllRoutes, FetchRouteInfo } from '../menu-list/webapi';

export default class SecurityRoute extends Component {
  state = {
    routeList: [],
    selectedPlan: []
  };

  _carRoutes = {}; // 安保路线
  _colorIndex = 0; // 颜色索引

  render() {
    const { routeList, selectedPlan } = this.state;
    return (
      <div className="security-route">
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
    _carRoutes[originName] = _newFeatures;
    this._securityRoute.push(_newFeatures);
  };
}

const colorArr = ['#ff0056', '#e66f51', '#2a9d8e', '#264653'];
