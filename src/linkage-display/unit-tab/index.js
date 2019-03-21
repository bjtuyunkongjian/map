/**
 * @author sl 2019-03-06
 * @name 单位面板
 * 1. 单位柱状图
 * 2. 特种单位饼状图
 * 3. 保护单位饼状图
 */

import React, { Component } from 'react';
import { Event as GlobalEvent, EventName as GloEventName } from 'tuyun-utils';

import { FetchChartData } from './webapi';
import UnitBar from './unit-bar';
import SpecialUnit from './special-unit';
import ProtectionUnit from './protection-unit';
import { UnitLayerId } from './chart-info';

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
    return (
      <div className={`tab-charts ${curBar !== TabValue.unit ? 'hidden' : ''}`}>
        <UnitBar
          curBar={curBar}
          selectedChart={chartInfo.name}
          selectedIndex={chartInfo.index}
          onSelect={this._selectChart}
          chartData={unitBarData}
        />
        <SpecialUnit
          curBar={curBar}
          selectedChart={chartInfo.name}
          selectedIndex={chartInfo.index}
          onSelect={this._selectChart}
          chartData={specialUintData}
        />
        <ProtectionUnit
          curBar={curBar}
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
      await this.setState({
        curBar: nextBar,
        chartInfo: { name: '', index: -1 }
      });
      if (TabValue.unit === nextBar) {
        this._fetchChartData(); // 获取图表数据
        this._addListener(); // 增加监听
      } else {
        this._removeListener(); // 移除监听
      }
    });
  };

  _fetchChartData = async () => {
    const { curBar } = this.state;
    if (TabValue.unit !== curBar) return;
    const _bounds = _MAP_.getBounds();
    const _zoom = _MAP_.getZoom();
    const { res, err } = await FetchChartData({
      points: _bounds,
      mapLevel: 20,
      flag: 2
    });
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
    _MAP_.on('click', this._clickPopLayer);
    // _MAP_.on('click', UnitLayerId, this._clickPopLayer);
  };

  _removeListener = () => {
    _MAP_.off('moveend', this._fetchChartData);
    _MAP_.off('click', UnitLayerId, this._clickPopLayer);
  };

  _clickPopLayer = e => {
    // const _zoom = _MAP_.getZoom();
    // // 大于 16.5 级，可以点击，小于 16.5 级，看点的数量
    // console.log(_zoom);
    const { showPopupBuilding } = GloEventName;
    const { lngLat, originalEvent } = e;
    GlobalEvent.emit(showPopupBuilding, {
      visible: true,
      boxLeft: originalEvent.x,
      boxTop: originalEvent.y,
      lngLat: lngLat,
      code: '681382501BD820DBE053B692300A522F'
    });
  };

  _selectChart = chartInfo => {
    const { closePopupUnit } = GloEventName;
    this.setState({ chartInfo });
    GlobalEvent.emit(closePopupUnit);
  };
}
