import React, { Component } from 'react';
import { TuyunMultiBar } from 'tuyun-kit';
import { GlobalEvent, GloEventName } from 'tuyun-utils';
import Event, { EventName } from './event';

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
          title={{ text: '案件' }}
          xAxis={[
            { name: '全部', code: 'case:qbaj' },
            { name: '刑事', code: 'case:xsaj' },
            { name: '行政', code: 'case:xzaj' }
          ]}
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
    Event.on(EventName.changeData, ({ case: caseSeries }) => {
      this.setState({ series: caseSeries });
    });
    Event.on(EventName.changeSelectedBar, async nextVal => {
      const { selectedValue } = this.state;
      if (nextVal === selectedValue) return;
      this.setState({ selectedValue: nextVal });
      GlobalEvent.emit(GloEventName.closePopupCase);
    });
  };

  _clickBar = barInfo => {
    const { code } = barInfo.curSeries.cellInfo;
    const { selectedValue } = this.state;
    Event.emit(EventName.changeSelectedBar, selectedValue === code ? '' : code);
  };
}
