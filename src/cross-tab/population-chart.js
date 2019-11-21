import React, { Component } from 'react';
import { TuyunMultiBar } from 'tuyun-kit';

import Event, { EventName } from './event';

export default class PopulationChart extends Component {
  state = { visible: false, series: [] };

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { visible, series } = this.state;
    if (!visible) return null;
    return (
      <li className="charts-item">
        <TuyunMultiBar
          showLegend={false}
          title={{ text: '人口' }}
          xAxis={[
            { name: '总人口', code: 'qbrk' },
            { name: '常驻', code: 'czrk' },
            { name: '流动', code: 'ldrk' },
            { name: '重点', code: 'zdrk' }
          ]}
          hslColorArr={[[210, 39, 49]]}
          series={series || []}
          height={220}
        />
      </li>
    );
  }

  _dealWithEvent = () => {
    Event.on(EventName.toggleVisible, ({ visible }) => {
      this.setState({ visible: visible });
    });
    Event.on(EventName.changeData, ({ population }) => {
      this.setState({ series: population });
    });
  };
}
