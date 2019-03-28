/**
 * @author sl 2019-03-06
 * @description 人口面板
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
import { RemoveLayer } from './layer-control';

import Event, { EventName } from '../event';
import { DefaultTab, TabValue } from '../constant';

export default class PopulationTab extends Component {
  state = { curBar: DefaultTab };

  componentDidMount = () => this._init();

  render() {
    const { curBar } = this.state;
    const _selected = curBar === TabValue.population;
    return (
      <div className={`tab-charts ${_selected ? '' : 'hidden'}`}>
        <TotalPopulation />
        <KeyPersonnel />
        <PopulationDensity />
      </div>
    );
  }

  _init = () => {
    const { curBar } = this.state;
    this._dealWithEvent(); // 处理切换面板事件
    if (curBar === TabValue.population) {
      this._fetchChartData(); // 获取图表数据
      this._addListener(); // 添加事件监听
    }
  };

  _dealWithEvent = () => {
    Event.on(EventName.changeNav, this._onChangeNav);
  };

  _onChangeNav = async nextBar => {
    const { curBar } = this.state;
    if (nextBar === curBar) return; // 重复点击保护
    RemoveLayer(_MAP_, PopulationLayerId); // 切换图表，先删除当前图层
    GlobalEvent.emit(GloEventName.closePopupPopNameplate); // 关闭铭牌弹窗
    GlobalEvent.emit(GloEventName.closePopupPopulation); // 关闭详情弹窗
    await this.setState({ curBar: nextBar });
    if (TabValue.population === nextBar) {
      this._fetchChartData(); // 获取图表数据
      this._addListener(); // 增加监听
    } else {
      this._hideDetail(); // 隐藏人口详情
      this._removeListener(); // 移除监听
    }
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
    Event.emit(EventName.updatePopChart, {
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
    // // 大于 16 级，可以点击，小于 16 级，看点的数量
    const { lngLat, originalEvent, features } = e;
    const { code, enableClick } = features[0].properties;
    if (_zoom > 16) {
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

  _hideDetail = () => {
    const { toggleKeyPopDetail } = GloEventName;
    GlobalEvent.emit(toggleKeyPopDetail, {
      visible: false,
      layerId: PopulationLayerId
    }); // 关闭详情弹框
  };
}
