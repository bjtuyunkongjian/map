/**
 * @author sl 2019-03-06
 * @name 人口面板
 * 1. 人口柱状图
 * 2. 重点人员饼状图
 * 3. 人口密度图
 */

import React, { Component } from 'react';
import { Event as GlobalEvent, EventName as GloEventName } from 'tuyun-utils';

import TotalPopulation from './total-population';
import KeyPersonnel from './key-personnel';
import PopulationDensity from './population-density';
import { FetchChartData } from './webapi';
import { PopulationLayerId, ChartName } from './chart-info';

import Event, { EventName } from '../event';
import { DefaultTab, TabValue } from '../constant';

export default class PopulationTab extends Component {
  state = {
    curBar: DefaultTab,
    chartInfo: {
      name: '',
      index: -1
    },
    totalPopData: {},
    popdensityData: {},
    poppieData: {}
  };

  componentDidMount = () => this._init();

  render() {
    const {
      curBar,
      chartInfo,
      totalPopData,
      popdensityData,
      poppieData
    } = this.state;
    if (curBar !== TabValue.population) return null;
    return (
      <div className="tab-charts">
        <TotalPopulation
          selectedChart={chartInfo.name}
          selectedIndex={chartInfo.index}
          onSelect={this._selectChart}
          chartData={totalPopData}
        />
        <KeyPersonnel
          selectedChart={chartInfo.name}
          selectedIndex={chartInfo.index}
          onSelect={this._selectChart}
          chartData={poppieData}
        />
        <PopulationDensity
          selectedChart={chartInfo.name}
          selectedIndex={chartInfo.index}
          onSelect={this._selectChart}
          chartData={popdensityData}
        />
      </div>
    );
  }

  _init = async () => {
    const { curBar } = this.state;
    this._dealWithEvent(); // 处理 Event 事件
    if (curBar === TabValue.population) {
      this._fetchChartData(); // 获取图表数据
      this._addListener(); // 添加事件监听
    }
  };

  _dealWithEvent = () => {
    Event.on(EventName.changeNav, async nextBar => {
      const { curBar } = this.state;
      if (nextBar === curBar) return;

      if (TabValue.population === nextBar) {
        await this.setState({
          curBar: nextBar,
          chartInfo: { name: '', index: -1 } // 设置
        });
        this._fetchChartData();
        this._addListener();
      } else {
        await this.setState({ curBar: nextBar });
        this._removeListener();
        this._hideDetail(); // 隐藏房屋详情
      }
    });
  };

  _fetchChartData = async () => {
    const { curBar } = this.state;
    if (TabValue.population !== curBar) return;
    const _bounds = _MAP_.getBounds();
    const _zoom = _MAP_.getZoom();
    const { res, err } = await FetchChartData({
      points: _bounds,
      mapLevel: 20,
      flag: 1
    });
    if (!res || err) return; // 保护
    const { popbarData, popdensityData, popieData } = res;
    this.setState({
      totalPopData: popbarData || {},
      popdensityData: popdensityData || {},
      poppieData: popieData || {}
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

  _hideDetail = () => {
    GlobalEvent.emit(GloEventName.toggleKeyPopDetail, {
      visible: false,
      layerId: PopulationLayerId
    }); // 关闭
  };
}
