/**
 * @author sl 2019-03-07
 * @description 案件柱状图
 * 1. 全部
 * 2. 刑事
 * 3. 案前
 */

import React, { Component } from 'react';
import { TuyunBar } from 'tuyun-kit';
import { IsEmpty, GlobalEvent, GloEventName } from 'tuyun-utils';

import Event, { EventName } from '../event';
import { DefaultTab, TabValue } from '../constant';

export default class CaseBar extends Component {
  state = {
    selectedCode: '',
    curBar: DefaultTab,
    chartData: []
  };

  componentWillMount = () => this._dealWithEvent();

  componentDidMount = () => this._init();

  render() {
    const { curBar, chartData, selectedCode } = this.state;
    if (curBar !== TabValue.case) return null;
    return (
      <div className="charts-box">
        <TuyunBar
          height={180}
          title={{ text: '案件分布' }}
          // legend={{ text: `案件总数：${_total}` }}
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
    Event.on(EventName.updateCaseChart, this._onUpdateCaseChart);
    Event.on(EventName.changeCaseTendency, this._onCancelSelect); // 更改案件趋势，取消选中
    // Event.on(EventName.changeCaseMulti, this._onCancelSelect); // 更改案件多发区域，取消选中
    Event.on(EventName.changeCaseDensity, this._onCancelSelect); // 更改案件密度，取消选中
  };

  _onChangeNav = async nextBar => {
    const { curBar } = this.state;
    if (nextBar === curBar) return;
    await this.setState({ curBar: nextBar, selectedCode: '', chartData: [] });
    GlobalEvent.emit(GloEventName.toggleCaseDetail, {});
  };

  _onUpdateCaseChart = ({ caseDistribution }) => {
    const _chartData = [];
    caseDistribution.sort((x, y) => y.code - x.code); // 按 code 进行排序
    for (let item of caseDistribution) {
      const _index = caseDistribution.indexOf(item);
      if (IsEmpty(item)) continue;
      const { code, count, name, hasSecType } = item;
      _chartData.push({
        label: name,
        value: count || 0,
        startColor: colorArr[_index].start,
        endColor: colorArr[_index].end,
        code,
        hasSecType
      });
    }
    this.setState({ chartData: _chartData });
  };

  _onCancelSelect = () => {
    this.setState({ selectedCode: '' });
    GlobalEvent.emit(GloEventName.toggleCaseDetail, { code: '' });
  };

  _onClickBar = async param => {
    const { selectedCode } = this.state;
    const { curCell } = param;
    const { code, hasSecType } = curCell;
    const _code = selectedCode === code ? '' : code;
    await this.setState({ selectedCode: _code });
    const _param = { code: _code, hasSecType };
    Event.emit(EventName.changeCaseDistribution, _param); // 更改案件趋势
    GlobalEvent.emit(GloEventName.toggleCaseDetail, _param); // 显示详情
  };
}

const colorArr = [
  { end: '#E0C3FC', start: '#8EC5FC' },
  { end: '#84FAB0', start: '#8FD3F4' },
  { end: '#D4FC79', start: '#96E6A1' }
];
