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

    return (
      <div
        className={`tab-charts ${
          curBar !== TabValue.population ? 'hidden' : ''
        }`}
      >
        <TotalPopulation
          curBar={curBar}
          selectedChart={chartInfo.name}
          selectedIndex={chartInfo.index}
          onSelect={this._selectChart}
          chartData={totalPopData}
        />
        <KeyPersonnel
          curBar={curBar}
          selectedChart={chartInfo.name}
          selectedIndex={chartInfo.index}
          onSelect={this._selectChart}
          chartData={poppieData}
        />
        <PopulationDensity
          curBar={curBar}
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
      if (nextBar === curBar) return; // 重复点击保护
      await this.setState({
        curBar: nextBar,
        chartInfo: { name: '', index: -1 }
      });
      if (TabValue.population === nextBar) {
        this._fetchChartData();
        this._addListener();
      } else {
        this._removeListener();
        this._hideDetail(); // 隐藏人口详情
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
      mapLevel: _zoom,
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
    _MAP_.on('click', PopulationLayerId, this._clickPopLayer);
  };

  _removeListener = () => {
    _MAP_.off('moveend', this._fetchChartData);
    _MAP_.off('click', PopulationLayerId, this._clickPopLayer);
  };

  _clickPopLayer = e => {
    const _zoom = _MAP_.getZoom();
    // // 大于 16.5 级，可以点击，小于 16.5 级，看点的数量
    const { lngLat, originalEvent, features } = e;
    const { code, enableClick } = features[0].properties;
    if (_zoom > 16.5) {
      const { showPopupPopNameplate } = GloEventName;
      GlobalEvent.emit(showPopupPopNameplate, {
        visible: true,
        boxLeft: originalEvent.x,
        boxTop: originalEvent.y,
        lngLat: lngLat,
        code: code
      });
    } else if (enableClick) {
      // todo 判断类型显示人口详情
      const { showPopupPopulation } = GloEventName;
      GlobalEvent.emit(showPopupPopulation, {
        visible: true,
        boxLeft: originalEvent.x,
        boxTop: originalEvent.y,
        lngLat: lngLat,
        code: code
      });
    }
  };

  _selectChart = chartInfo => {
    const { closePopupPopNameplate } = GloEventName;
    this.setState({ chartInfo });
    GlobalEvent.emit(closePopupPopNameplate);
  };

  _hideDetail = () => {
    const { toggleKeyPopDetail } = GloEventName;
    GlobalEvent.emit(toggleKeyPopDetail, {
      visible: false,
      layerId: PopulationLayerId
    }); // 关闭详情弹框
  };
}
