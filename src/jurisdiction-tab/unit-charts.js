import React, { Component } from 'react';
import { TuyunMultiBar } from 'tuyun-kit';
import Event, { EventName } from './event';
import { GlobalEvent, GloEventName } from 'tuyun-utils';
export default class UnitChart extends Component {
  state = { visible: false, series: [], selectedValue: '' };

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { visible, series, selectedValue } = this.state;
    if (!visible) return null;
    return (
      <li className="charts-item">
        <TuyunMultiBar
          showLegend={false}
          title={{ text: '单位' }}
          xAxis={[
            { name: '全部', code: 'unit:qbdw' },
            { name: '普通', code: 'unit:ptdw' },
            { name: '特种', code: 'unit:tzdw' },
            { name: '保护', code: 'unit:bhdw' },
            { name: '九小场所', code: 'unit:jxcs' }
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
    Event.on(EventName.changeData, ({ unit }) => {
      this.setState({ series: unit });
    });
    Event.on(EventName.changeSelectedBar, async nextVal => {
      const { selectedValue } = this.state;
      if (nextVal === selectedValue) return;
      this.setState({ selectedValue: nextVal });
      GlobalEvent.emit(GloEventName.closePopupUnit);
    });
  };

  _clickBar = barInfo => {
    const { code } = barInfo.curSeries.cellInfo;
    const { selectedValue } = this.state;
    Event.emit(EventName.changeSelectedBar, selectedValue === code ? '' : code);
  };
}
