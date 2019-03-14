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