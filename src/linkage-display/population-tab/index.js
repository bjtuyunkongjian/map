/**
 * @author sl 2019-03-06
 * @name 人口面板
 * 1. 人口柱状图
 * 2. 重点人员饼状图
 * 3. 人口密度图
 */

import React, { Component } from 'react';
import TotalPopulation from './total-population';
import KeyPersonnel from './key-personnel';
import PopulationDensity from './population-density';
import Event, { EventName } from '../event';
import { DefaultTab, TabValue } from '../constant';

export default class PopulationTab extends Component {
  state = {
    curBar: DefaultTab
  };

  componentDidMount = () => this._init();

  render() {
    const { curBar } = this.state;
    if (curBar !== TabValue.population) return null;
    return (
      <div className="tab-charts">
        <TotalPopulation />
        <KeyPersonnel />
        <PopulationDensity />
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

// pop ====> 人口
// case ====> 案件
// alarm =====> 报警

const case_ = {
  caseDensity: { casedLevel: 1, caseaLevel: 3, casebLevel: 5, casecLevel: 4 }, // ABCD 四类 密度
  caseDistri: { aNum: 31, bNum: 51, dNum: 15, cNum: 39 } // ABCD 四类 数量
};

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
