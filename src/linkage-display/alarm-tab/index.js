/**
 * @author sl 2019-03-07
 * @name 报警面板
 */
import React, { Component } from 'react';
import Event, { EventName } from '../event';
import { DefaultTab, TabValue } from '../constant';
import AlarmDensity from './alarm-density';
import AlarmBar from './alarm-bar';

export default class AlarmTab extends Component {
  state = { curBar: DefaultTab };

  componentDidMount = () => this._init();

  render() {
    const { curBar } = this.state;
    if (curBar !== TabValue.alarm) return null;
    return (
      <div className="tab-charts">
        <AlarmBar />
        <AlarmDensity />
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

const alarm = {
  alarmDensity: {
    criminalLevel: 0,
    orderLevel: 0,
    groupLevel: 0,
    disasterLevel: 0
  }, // 密度
  alarmDistri: {
    criminalAlarm: 3, // 刑事案件
    groupAlarm: 2, // 群体性案件
    disasterAlarm: 1, // 自然灾害案件
    orderAlarm: 3 // 治安案件
  } // 数量
};
