/**
 * @author sl 2019-03-06
 * @name 单位面板
 * 1. 单位柱状图
 * 2. 特种单位饼状图
 * 3. 保护单位饼状图
 */

import React, { Component } from 'react';
import UnitBar from './unit-bar';
import SpecialUnit from './special-unit';
import ProtectionUnit from './protection-unit';
import Event from '../event';

export default class UnitTab extends Component {
  state = { curBar: 'population' };

  componentDidMount = () => this._init();

  render() {
    const { curBar } = this.state;
    if (curBar !== barName) return null;
    return (
      <div className="tab-charts">
        <UnitBar />
        <SpecialUnit />
        <ProtectionUnit />
      </div>
    );
  }

  _init = () => {
    Event.on('change:curBar', nextBar => {
      const { curBar } = this.state;
      if (nextBar === curBar) return;
      this.setState({ curBar: nextBar });
    });
  };
}

const barName = 'unit'; // 对应条形图名称
