import React, { Component } from 'react';
import { FetchAllRoutes, FetchRouteInfo, DivideRoute } from './webapi';
import { CreatePointFeature } from './security-route-layer';

export default class ViewRoute extends Component {
  state = {
    routeList: [
      { name: '安保路线1安保路线1安保路线1安保路线1', date: '18-12-12' },
      { name: '安保路线1', date: '18-12-12' },
      { name: '安保路线1', date: '18-12-12' }
    ]
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

  _reset = () => {};

  _fetchAllRoutes = async () => {
    const { res, err } = await FetchAllRoutes();
    if (!res || err) return console.log('获取重大安保轨迹失败');
    const _dateLen = ('' + new Date().getTime()).length;
    const _routeList = res.map(item => {
      const _name = item.substr(0, a.length - _dateLen - 1);
      const _dateTime = parseInt(item.substr(_dateLen));
      const _newDate = new Date(_dateTime);
      const _year = _newDate.getFullYear();
      const _month = _newDate.getMonth() + 1;
      const _date = _newDate.getDate();
      return {
        name: _name,
        date: `${_year}-${_month}-${_date}`
      };
    });
    this.setState({ routeList: _routeList });
  };

  _fetchRouteInfo = async routeName => {
    const { res, err } = await FetchRouteInfo({ fileName: routeName });
    if (!res || err) return console.log('获取重大安保轨迹详情失败');
    console.log(res);
  };

  _divideRoute = async () => {
    console.log('%c _divideRoute', 'color: green');
    const { res, err } = await DivideRoute({ coordinates: routeCoord });
    console.log(res, err);
    let ind = 0;
    setInterval(() => {
      const _feature = CreatePointFeature({
        coordinates: [res[ind].x, res[ind].y]
      });
      ind++;
      if (!_MAP_.getSource('RouteLayers.routeStart'))
        _MAP_.addLayer({
          id: 'RouteLayers.routeStart',
          type: 'circle',
          source: {
            type: 'geojson',
            data: {
              type: 'FeatureCollection',
              features: [_feature]
            }
          },
          paint: {
            'circle-radius': {
              base: 5,
              stops: [[10, 5], [20, 20]]
            },
            'circle-color': '#e55e5e'
          }
        });
      else
        _MAP_.getSource('RouteLayers.routeStart').setData({
          type: 'FeatureCollection',
          features: [_feature]
        });
    }, 10);
  };
}
