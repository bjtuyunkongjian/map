import React, { Component } from 'react';
import { FetchAllRoutes } from './webapi';

export default class ViewRoute extends Component {
  state = {
    routeList: []
  };

  componentDidMount = () => this._init();

  render() {
    const { routeList } = this.state;
    return (
      <div className="view-route">
        重大安保轨迹
        {routeList.map((item, index) => {
          return <div key={`route_list_${index}`}>{item}</div>;
        })}
      </div>
    );
  }

  _init = async () => {
    const { res, err } = await FetchAllRoutes();
    if (!res || err) return console.log('获取重大安保轨迹失败');
    this.setState({ routeList: res });
  };
}
