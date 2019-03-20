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
import { PopulationLayerId } from './chart-info';

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
        this._hideDetail(); // 隐藏人口详情
        this._removeSourceLayer(PopulationLayerId); // 删除图层
        this._closePopup(); // 隐藏弹框
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
    _MAP_.on('click', PopulationLayerId, this._clickChart);
  };

  _removeListener = () => {
    _MAP_.off('moveend', this._fetchChartData);
    _MAP_.off('click', PopulationLayerId, this._clickChart);
  };

  _clickChart = e => {
    const _zoom = _MAP_.getZoom();
    // 大于 16.5 级，可以点击，小于 16.5 级，看点的数量
    console.log(_zoom);
    const { showPopupPopulation } = GloEventName;
    const { lngLat, originalEvent } = e;
    GlobalEvent.emit(showPopupPopulation, {
      visible: true,
      boxLeft: originalEvent.x,
      boxTop: originalEvent.y,
      lngLat: lngLat,
      code: '681382501BD820DBE053B692300A522F'
    });
  };

  _selectChart = chartInfo => {
    this.setState({ chartInfo });
  };

  _hideDetail = () => {
    GlobalEvent.emit(GloEventName.toggleKeyPopDetail, {
      visible: false,
      layerId: PopulationLayerId
    }); // 关闭详情弹框
  };

  _closePopup = () => {
    GlobalEvent.emit(GloEventName.closePopupPopulation);
  };

  _removeSourceLayer = layerId => {
    _MAP_.getLayer(layerId) && _MAP_.removeLayer(layerId).removeSource(layerId); // 删除所有 layer 和 source
  };
}
