/**
 * @author sl 2019-03-07
 * @name 房屋面板
 * 1.  房屋饼状图
 * 2. 房屋密度图
 */

import React, { Component } from 'react';
import Event, { EventName } from '../event';
import { DefaultTab, TabValue } from '../constant';
import BuildingBar from './building-bar';

export default class BuildingTab extends Component {
  state = { curBar: DefaultTab };

  componentDidMount = () => this._init();

  render() {
    const { curBar } = this.state;
    return (
      <div
        className={`tab-charts ${curBar !== TabValue.building ? 'hidden' : ''}`}
      >
        <BuildingBar curBar={curBar} />
      </div>
    );
  }

  _init = () => {
    Event.on(EventName.changeNav, nextBar => {
      const { curBar } = this.state;
      if (nextBar === curBar) return;
      this.setState({ curBar: nextBar });
    });
  };
}
