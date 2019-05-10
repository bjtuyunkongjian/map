/**
 * @author sl 2019-03-07
 * @description 案件面板
 */
import React, { Component } from 'react';
import TotalCase from './total-case';
import Event, { EventName } from '../event';
import { DefaultTab, TabValue } from '../constant';

export default class CaseTab extends Component {
  state = { curBar: DefaultTab };

  componentDidMount = () => this._init();

  render() {
    const { curBar } = this.state;
    if (curBar !== TabValue.case) return null;
    return (
      <div className="tab-charts">
        <TotalCase />
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
