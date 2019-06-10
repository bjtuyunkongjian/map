/**
 * @author sl 2019-03-06
 * @description 保护单位饼状图
 */

import React, { Component } from 'react';
import { TuyunPie } from 'tuyun-kit';
import { GlobalEvent, GloEventName } from 'tuyun-utils';

import { ChartName } from './chart-info';

import { DefaultTab, TabValue } from '../constant';
import Event, { EventName } from '../event';

export default class ProtectionUnit extends Component {
  state = {
    selectedChart: '',
    selectedValue: '',
    chartData: [],
    curBar: DefaultTab
  };

  componentWillMount = () => this._dealWithEvent();
  componentDidMount = () => this._init();

  render() {
    const { selectedChart, chartData, curBar, selectedValue } = this.state;
    if (curBar !== TabValue.unit) return null;
    const _selectVal =
      selectedChart === ChartName.protectUnit ? selectedValue : '';
    let _total = 0;
    chartData.map(item => {
      _total += item.count || 0;
    });

    return (
      <div className="charts-box">
        <TuyunPie
          height={200}
          title={{ text: '保护单位' }}
          legend={{ text: `总数：${_total}` }}
          data={chartData}
          selectedKey="code"
          selectedValue={_selectVal}
          onClick={this._clickPie}
        />
      </div>
    );
  }

  _init = () => {};

  _dealWithEvent = () => {
    Event.on(EventName.changeNav, this._onChangeNav); // 切换 tab
    Event.on(EventName.updateUniChart, this._onUpdateUniChart); // 更新数据
    Event.on(EventName.changeUniSelected, this._onChangeUniSelected); // 切换选中的图表
  };

  /**
   * 切换 tab：
   * 1. 重置当前选中的 tab
   * 2. 重置选中的图表
   */
  _onChangeNav = nextBar => {
    const { curBar } = this.state;
    if (nextBar === curBar) return; // 重复点击保护
    this.setState({
      curBar: nextBar,
      selectedChart: '',
      selectedValue: '',
      chartData: []
    });
    GlobalEvent.emit(GloEventName.toggleDetailUnit, { visible: false }); // 不显示
  };

  /**
   * 更新数据
   */
  _onUpdateUniChart = ({ protectUnitData }) => {
    for (let item of protectUnitData) {
      item.label = item.name;
      item.value = item.count;
      item.hasSecType = !!item.hasThirdType;
    }
    this.setState({ chartData: protectUnitData });
  };

  _onChangeUniSelected = async ({ selectedChart, selectedValue }) => {
    await this.setState({ selectedChart, selectedValue });
  };

  _clickPie = barInfo => {
    const { selectedChart, selectedValue } = this.state;
    const { curSector } = barInfo;
    const { code, hasSecType } = curSector;
    let _selectedVal;
    if (selectedChart === ChartName.protectUnit) {
      _selectedVal = selectedValue === code ? '' : code;
    } else {
      _selectedVal = code;
    }
    GlobalEvent.emit(GloEventName.toggleDetailUnit, {
      visible: !!_selectedVal,
      code: _selectedVal,
      unitType: 'protect',
      hasSecType
    }); // 子类
    Event.emit(EventName.changeUniSelected, {
      selectedChart: ChartName.protectUnit,
      selectedValue: _selectedVal
    });
  };
}
