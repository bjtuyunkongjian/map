import React, { Component } from 'react';
import { TuyunMultiBar } from 'tuyun-kit';
import Event, { EventName } from './event';
import { GlobalEvent, GloEventName } from 'tuyun-utils';
export default class PopulationChart extends Component {
  state = { visible: false, series: [], selectedValue: '' };

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { visible, series, selectedValue } = this.state;
    if (!visible) return null;
    return (
      <li className="charts-item">
        <TuyunMultiBar
          showLegend={false}
          title={{ text: '人口' }}
          xAxis={[
            { name: '全部', code: 'population:qbrk' },
            { name: '常驻', code: 'population:czrk' },
            { name: '流动', code: 'population:ldrk' },
            { name: '重点', code: 'population:zdrk' }
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
    Event.on(EventName.changeData, ({ population }) => {
      this.setState({ series: population });
    });
    Event.on(EventName.changeSelectedBar, async nextVal => {
      const { selectedValue } = this.state;
      if (nextVal === selectedValue) return;
      this.setState({ selectedValue: nextVal });
      GlobalEvent.emit(GloEventName.closePopupPopulation);
    });
  };

  _clickBar = barInfo => {
    const { code } = barInfo.curSeries.cellInfo;
    const { selectedValue } = this.state;
    Event.emit(EventName.changeSelectedBar, selectedValue === code ? '' : code);
  };
}
