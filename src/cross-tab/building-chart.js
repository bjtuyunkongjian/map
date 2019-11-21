import React, { Component } from 'react';
import { TuyunMultiBar } from 'tuyun-kit';

import Event, { EventName } from './event';

export default class BuildingChart extends Component {
  state = { visible: false, series: [] };

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { visible, series } = this.state;
    if (!visible) return null;
    return (
      <li className="charts-item">
        <TuyunMultiBar
          showLegend={false}
          title={{ text: '房屋' }}
          series={series || []}
          height={220}
          hslColorArr={[[210, 39, 49]]}
          xAxis={[
            { name: '出租', code: 'czfw' },
            { name: '自住', code: 'zzfw' },
            { name: '空置', code: 'xzfw' }
          ]}
        />
      </li>
    );
  }

  _dealWithEvent = () => {
    Event.on(EventName.toggleVisible, ({ visible }) => {
      this.setState({ visible: visible });
    });

    Event.on(EventName.changeData, ({ building }) => {
      this.setState({ series: building });
    });
  };
}
