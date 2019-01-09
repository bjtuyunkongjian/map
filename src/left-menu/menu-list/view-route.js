import React, { Component } from 'react';
import { FetchAllRoutes, FetchRouteInfo } from './webapi';
import {
  RouteLayers,
  CreatePointFeature,
  DrawRoad,
  DrawIconPoint
} from './security-route-layer';
import turf from 'turf';

export default class ViewRoute extends Component {
  state = {
    routeList: []
  };

  componentDidMount = () => this._init();

  componentWillUnmount = () => this._reset();

  render() {
    const { routeList } = this.state;
    return (
      <div className="view-route">
        <div className="title">重大安保轨迹</div>
        <ul className="table-wrap">
          {routeList.map((item, index) => {
            return (
              <li
                className="table-row"
                key={`route_list_${index}`}
                onClick={() => this._fetchRouteInfo(item)}
              >
                <div className="table-name">{item.name}</div>
                <div className="table-date">{item.date}</div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  _init = () => {
    this._fetchAllRoutes();
  };

  _reset = () => {
    Object.keys(RouteLayers).map(key => {
      const _val = RouteLayers[key];
      _MAP_.getLayer(_val) && _MAP_.removeLayer(_val).removeSource(_val); // 删除所有 layer 和 source
    });
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
        timeStep: _timeStep
      };
    });
    this.setState({ routeList: _routeList });
  };

  _fetchRouteInfo = async routeItem => {
    const _routeName = routeItem.name + '_' + routeItem.timeStep;
    const { res, err } = await FetchRouteInfo({ fileName: _routeName });
    if (!res || err) return console.log('获取重大安保轨迹详情失败');
    const { features } = res;
    _MAP_.flyTo({ center: features[0].geometry.coordinates[0], zoom: 15 }); // 以起点为中心点
    DrawRoad(_MAP_, {
      id: RouteLayers.selectedRoute,
      features: features,
      lineColor: '#888',
      lineWidth: 8
    });
  };

  _divideRoute = () => {
    console.log('%c _divideRoute', 'color: green');
    let ind = 0;
    setInterval(() => {
      const _feature = CreatePointFeature({
        coordinates: [res[ind].x, res[ind].y]
      });
      ind++;
      DrawIconPoint(_MAP_, {
        id: RouteLayers.securityCar,
        features: [_feature],
        iconImage: 'security-car'
      });
    }, 10);
  };
}
