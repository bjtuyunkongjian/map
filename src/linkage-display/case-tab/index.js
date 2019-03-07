/**
 * @author sl 2019-03-07
 * @name 案件面板
 */
import React, { Component } from 'react';
import TotalCase from './total-case';
import Event, { defaultTab } from '../event';

export default class CaseTab extends Component {
  state = { curBar: defaultTab };

  componentDidMount = () => this._init();

  render() {
    const { curBar } = this.state;
    if (curBar !== barName) return null;
    return (
      <div className="tab-charts">
        <TotalCase />
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

const barName = 'case'; // 对应条形图名称
