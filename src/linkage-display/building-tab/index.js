/**
 * @author sl 2019-03-07
 * @name 房屋面板
 * 1.  房屋饼状图
 * 2. 房屋密度图
 */

import React, { Component } from 'react';
import { Event as GlobalEvent, EventName as GloEventName } from 'tuyun-utils';

import BuildingBar from './building-bar';
import { FetchChartData } from './webapi';
import { BuildingLayerId } from './chart-info';

import Event, { EventName } from '../event';
import { DefaultTab, TabValue } from '../constant';

export default class BuildingTab extends Component {
  state = {
    curBar: DefaultTab,
    chartInfo: { name: '', index: -1 },
    buildingBarData: {}
  };

  componentDidMount = () => this._init();

  render() {
    const { curBar, chartInfo, buildingBarData } = this.state;
    return (
      <div
        className={`tab-charts ${curBar !== TabValue.building ? 'hidden' : ''}`}
      >
        <BuildingBar
          curBar={curBar}
          selectedChart={chartInfo.name}
          selectedIndex={chartInfo.index}
          onSelect={this._selectChart}
          chartData={buildingBarData}
        />
      </div>
    );
  }

  _init = () => {
    Event.on(EventName.changeNav, nextBar => {
      const { curBar } = this.state;
      if (nextBar === curBar) return;
      this.setState({ curBar: nextBar });
    });
  };

  _dealWithEvent = () => {
    Event.on(EventName.changeNav, async nextBar => {
      const { curBar } = this.state;
      if (nextBar === curBar) return;
      await this.setState({
        curBar: nextBar,
        chartInfo: { name: '', index: -1 }
      });
      if (TabValue.building === nextBar) {
        this._fetchChartData(); // 获取图表数据
        this._addListener(); // 增加监听
      } else {
        this._removeListener(); // 移除监听
      }
    });
  };

  _fetchChartData = async () => {
    const { curBar } = this.state;
    if (TabValue.building !== curBar) return;
    const _bounds = _MAP_.getBounds();
    const _zoom = _MAP_.getZoom();
    const { res, err } = await FetchChartData({
      points: _bounds,
      mapLevel: 20,
      flag: 3
    });
    if (!res || err) return; // 保护
    const { dwbarData } = res;
    this.setState({
      buildingBarData: dwbarData || {}
    });
  };

  _addListener = () => {
    _MAP_.on('moveend', this._fetchChartData);
    _MAP_.on('click', BuildingLayerId, this._clickBuildingLayer);
  };

  _removeListener = () => {
    _MAP_.off('moveend', this._fetchChartData);
    _MAP_.off('click', BuildingLayerId, this._clickBuildingLayer);
  };

  _clickBuildingLayer = e => {
    // const _zoom = _MAP_.getZoom();
    // // 大于 16.5 级，可以点击，小于 16.5 级，看点的数量
    // console.log(_zoom);
    const { showPopupUnit } = GloEventName;
    const { lngLat, originalEvent } = e;
    GlobalEvent.emit(showPopupUnit, {
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
