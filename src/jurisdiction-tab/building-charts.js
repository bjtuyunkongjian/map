import React, { Component } from 'react';
import { TuyunMultiBar } from 'tuyun-kit';
import Event, { EventName } from './event';
import { GlobalEvent, GloEventName } from 'tuyun-utils';

export default class BuildingChart extends Component {
  state = { visible: false, series: [], selectedValue: '' };

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { visible, series, selectedValue } = this.state;
    if (!visible) return null;
    return (
      <li className="charts-item">
        <TuyunMultiBar
          showLegend={false}
          title={{ text: '房屋' }}
          xAxis={[
            { name: '出租', code: 'building:czfw' },
            { name: '自住', code: 'building:zzfw' },
            { name: '闲置', code: 'building:xzfw' }
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
    Event.on(EventName.changeData, ({ building }) => {
      this.setState({ series: building });
    });
    Event.on(EventName.changeSelectedBar, async nextVal => {
      const { selectedValue } = this.state;
      if (nextVal === selectedValue) return;
      this.setState({ selectedValue: nextVal });
      GlobalEvent.emit(GloEventName.closePopupBuilding);
    });
  };

  _clickBar = barInfo => {
    const { code } = barInfo.curSeries.cellInfo;
    const { selectedValue } = this.state;
    Event.emit(EventName.changeSelectedBar, selectedValue === code ? '' : code);
  };
}
