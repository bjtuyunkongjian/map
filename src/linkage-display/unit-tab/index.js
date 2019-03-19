/**
 * @author sl 2019-03-06
 * @name 单位面板
 * 1. 单位柱状图
 * 2. 特种单位饼状图
 * 3. 保护单位饼状图
 */

import React, { Component } from 'react';

import { FetchChartData } from './webapi';
import UnitBar from './unit-bar';
import SpecialUnit from './special-unit';
import ProtectionUnit from './protection-unit';

import Event, { EventName } from '../event';
import { DefaultTab, TabValue } from '../constant';

export default class UnitTab extends Component {
  state = {
    curBar: DefaultTab,
    chartInfo: {
      name: '',
      index: -1
    },
    unitBarData: {},
    specialUintData: {},
    protectUnitData: {}
  };

  componentDidMount = () => this._init();

  render() {
    const {
      curBar,
      chartInfo,
      unitBarData,
      specialUintData,
      protectUnitData
    } = this.state;
    if (curBar !== TabValue.unit) return null;
    return (
      <div className="tab-charts">
        <UnitBar
          selectedChart={chartInfo.name}
          selectedIndex={chartInfo.index}
          onSelect={this._selectChart}
          chartData={unitBarData}
        />
        <SpecialUnit
          selectedChart={chartInfo.name}
          selectedIndex={chartInfo.index}
          onSelect={this._selectChart}
          chartData={specialUintData}
        />
        <ProtectionUnit
          selectedChart={chartInfo.name}
          selectedIndex={chartInfo.index}
          onSelect={this._selectChart}
          chartData={protectUnitData}
        />
      </div>
    );
  }

  _init = () => {
    const { curBar } = this.state;
    this._dealWithEvent(); // 处理 Event 事件
    if (curBar === TabValue.unit) {
      this._addListener(); // 添加事件监听
      this._fetchChartData(); // 获取图表数据
    }
  };

  _dealWithEvent = () => {
    Event.on(EventName.changeNav, async nextBar => {
      const { curBar } = this.state;
      if (nextBar === curBar) return;
      await this.setState({ curBar: nextBar });
      if (TabValue.unit === nextBar) {
        this._fetchChartData(); // 获取图表数据
        this._addListener();
      } else {
        this._removeListener();
      }
    });
  };

  _fetchChartData = async () => {
    console.log('fetchChartData');
    const { curBar } = this.state;
    if (TabValue.unit !== curBar) return;
    const _bounds = _MAP_.getBounds();
    // const _zoom = _MAP_.getZoom();
    const { res, err } = await FetchChartData({
      points: _bounds,
      mapLevel: 20,
      flag: 2
    });
    console.log(res);
    if (!res || err) return; // 保护
    const { dwbarData, tedwpieData, baohudwpieData } = res;
    this.setState({
      unitBarData: dwbarData || {},
      specialUintData: tedwpieData || {},
      protectUnitData: baohudwpieData || {}
    });
  };

  _addListener = () => {
    _MAP_.on('moveend', this._fetchChartData);
  };

  _removeListener = () => {
    _MAP_.off('moveend', this._fetchChartData);
  };

  _selectChart = chartInfo => {
    this.setState({ chartInfo });
  };
}
