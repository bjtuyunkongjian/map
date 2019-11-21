/**
 * @author sl 2017-03-07
 * @description 警情数量柱状图
 * 1. 全部警情
 * 2. 群众求助类
 * 3. 交通类
 * 4. 治安类
 * 5. 刑事类
 */

import React, { Component } from 'react';
import { TuyunBar } from 'tuyun-kit';
import { IsEmpty, GlobalEvent, GloEventName } from 'tuyun-utils';
import Event, { EventName } from '../event';
import { DefaultTab, TabValue } from '../constant';

export default class SituationBar extends Component {
  state = {
    selectedCode: '',
    curBar: DefaultTab,
    chartData: []
  };
  componentWillMount = () => this._dealWithEvent();

  componentDidMount = () => this._init();
  render() {
    const { curBar, chartData, selectedCode } = this.state;
    if (curBar !== TabValue.posituation) return null;
    return (
      <div className="charts-box">
        <TuyunBar
          height={180}
          title={{ text: '警情分布' }}
          data={chartData}
          dutyRatio={0.5}
          selectedKey="code"
          selectedValue={selectedCode}
          onClick={this._onClickBar}
        />
      </div>
    );
  }
  _init = () => {};

  _dealWithEvent = () => {
    Event.on(EventName.changeNav, this._onChangeNav);
    Event.on(EventName.updatePosituationChart, this._onUpdateSituationChart);
    Event.on(EventName.changePosituationTendency, this._onCancelSelect); // 更改警情趋势，取消选中
    Event.on(EventName.changePosituationDensity, this._onCancelSelect); // 更改警情平均密度，取消选中
  };

  _onChangeNav = async nextBar => {
    const { curBar } = this.state;
    if (nextBar === curBar) return;
    await this.setState({ curBar: nextBar, selectedCode: '', chartData: [] });
    GlobalEvent.emit(GloEventName.toggleSituatuinDetail, {});
  };

  _onUpdateSituationChart = ({ policeDistribution }) => {
    const _chartData = [];
    for (let item of policeDistribution) {
      if (IsEmpty(item)) continue;
      const { code, count, name, hasSecType } = item;
      _chartData.push({
        label: name,
        value: count || 0,
        code,
        hasSecType
      });
    }
    this.setState({ chartData: _chartData });
  };

  _onCancelSelect = () => {
    this.setState({ selectedCode: '' });
    GlobalEvent.emit(GloEventName.toggleSituatuinDetail, { code: '' });
  };

  _onClickBar = async param => {
    const { selectedCode } = this.state;
    const { curCell } = param;
    const { code, hasSecType } = curCell;
    const _code = selectedCode === code ? '' : code;
    await this.setState({ selectedCode: _code });
    const _param = { code: _code, hasSecType };
    Event.emit(EventName.changePosituationDistribution, _param); // 更改警情趋势
    GlobalEvent.emit(GloEventName.toggleSituatuinDetail, _param); // 显示警情详情
  };
}
