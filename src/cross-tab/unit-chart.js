import React, { Component } from 'react';
import { TuyunMultiBar } from 'tuyun-kit';

import Event, { EventName } from './event';

export default class UnitChart extends Component {
  state = { visible: false, series: [] };

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { visible, series } = this.state;
    if (!visible) return null;
    return (
      <li className="charts-item">
        <TuyunMultiBar
          showLegend={false}
          title={{ text: '单位' }}
          xAxis={[
            { name: '全部', code: 'qbdw' },
            { name: '普通', code: 'ptdw' },
            { name: '特种', code: 'tzdw' },
            { name: '保护', code: 'bhdw' }
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
    Event.on(EventName.changeData, ({ unit }) => {
      this.setState({ series: unit });
    });
  };
}
