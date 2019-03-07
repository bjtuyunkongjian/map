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
