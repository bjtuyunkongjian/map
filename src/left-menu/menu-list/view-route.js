import React, { Component } from 'react';
import { FetchAllRoutes, FetchRouteInfo } from './webapi';

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
        重大安保轨迹
        {routeList.map((item, index) => {
          return (
            <div
              key={`route_list_${index}`}
              onClick={() => this._fetchRouteInfo(item)}
            >
              {item}
            </div>
          );
        })}
      </div>
    );
  }

  _init = async () => {
    const { res, err } = await FetchAllRoutes();
    if (!res || err) return console.log('获取重大安保轨迹失败');
    this.setState({ routeList: res });
  };

  _reset = () => {};

  _fetchRouteInfo = async routeName => {
    const { res, err } = await FetchRouteInfo({ fileName: routeName });
    if (!res || err) return console.log('获取重大安保轨迹详情失败');
    console.log(res);
  };
}
