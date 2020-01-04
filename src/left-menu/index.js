import React, { Component } from 'react';
import { GlobalEvent, GloEventName } from 'tuyun-utils';

import Logo from './logo';
import Population from './population'; //人口
import Building from './building'; //房屋
import Unit from './unit'; //单位
import PoliceCase from './police-case'; //案件
import PoliceSituation from './police-situation'; //警情
import PoliceForce from './police-force'; //警力
import SecurityRoute from './security-route'; //安保路线
import VehicleType from './vehicle-type'; //两客一危
import CrossResearch from './cross-research';
import JurisdictionData from './jurisdiction-data'; //辖区数据
import CompareCollision from './compare-collision'; //比对碰撞
import Camera from './camera'; //摄像头
import DistributeControl from './distribute-control'; // 布控显示

export default class LeftMenu extends Component {
  state = {
    animate: '',
    showUi: true
  };

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { animate, showUi } = this.state;

    const _slide = animate === 'menu-slide-out' ? 'changed' : '';
    return (
      <div className={showUi ? `left-menu ${animate}` : 'hidden'}>
        <Logo />
        <div className="menu-box">
          <Population />
          <Unit />
          <Building />
          <PoliceCase />
          <PoliceSituation />
          <PoliceForce />
          <SecurityRoute />
          <VehicleType />
          <DistributeControl />
          <CrossResearch />
          <JurisdictionData />
          <CompareCollision />
          <Camera />
        </div>
        <button className="control" onClick={this._toggleLeftMenu}>
          <span className={`aspect-left ${_slide}`} />
        </button>
      </div>
    );
  }

  _dealWithEvent = () => {
    const { toggleAllUi } = GloEventName;
    GlobalEvent.on(toggleAllUi, ({ visible }) => {
      this.setState({ showUi: visible });
    });
  };

  _toggleLeftMenu = () => {
    const { animate } = this.state;
    this.setState({
      animate: animate === 'menu-slide-out' ? 'menu-slide-in' : 'menu-slide-out'
    });
  };
}
