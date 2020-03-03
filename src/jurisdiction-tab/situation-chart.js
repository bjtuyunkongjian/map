import React, { Component } from 'react';
import { TuyunMultiBar } from 'tuyun-kit';
import { GlobalEvent, GloEventName } from 'tuyun-utils';
import Event, { EventName } from './event';

export default class SituationChart extends Component {
  state = { visible: false, series: [], selectedValue: '' };

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { visible, series, selectedValue } = this.state;
    if (!visible) return null;
    return (
      <li className="charts-item">
        <TuyunMultiBar
          showLegend={false}
          title={{ text: '警情' }}
          xAxis={[
            { name: '全部', code: 'situation:qbjq' },
            { name: '交通', code: 'situation:jtjq' },
            { name: '治安', code: 'situation:zajq' },
            { name: '刑事', code: 'situation:xsjq' }
          ]}
          hslColorArr={[[210, 39, 49]]}
          series={series || []}
          height={220}
          onClick={this._clickBar}
          selectedKey="code"
          selectedValue={selectedValue}
        />
      </li>
    );
  }

  _dealWithEvent = () => {
    Event.on(EventName.toggleVisible, ({ visible }) => {
      this.setState({ visible: visible });
    });
    Event.on(EventName.changeData, ({ situation }) => {
      this.setState({ series: situation });
    });
    Event.on(EventName.changeSelectedBar, async nextVal => {
      const { selectedValue } = this.state;
      if (nextVal === selectedValue) return;
      this.setState({ selectedValue: nextVal });
      GlobalEvent.emit(GloEventName.closePopupSituation);
    });
  };

  _clickBar = barInfo => {
    const { code } = barInfo.curSeries.cellInfo;
    const { selectedValue } = this.state;
    Event.emit(EventName.changeSelectedBar, selectedValue === code ? '' : code);
  };
}
