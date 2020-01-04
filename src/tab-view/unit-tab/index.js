/**
 * @author sl 2019-03-06
 * @description 单位面板
 * 1. 单位柱状图
 * 2. 特种单位饼状图
 * 3. 保护单位饼状图
 */

import React, { Component } from 'react';
import { GlobalEvent, GloEventName, LayerIds, RemoveLayer } from 'tuyun-utils';

import { GetCount } from './webapi';
import UnitBar from './unit-bar';
import SpecialUnit from './special-unit';
import ProtectionUnit from './protection-unit';

import Event, { EventName } from '../event';
import { DefaultTab, TabValue } from '../constant';

export default class UnitTab extends Component {
  state = { curBar: DefaultTab };

  componentDidMount = () => this._init();
  componentWillMount = () => this._dealWithEvent();
  componentWillUnmount = () => this._removeListener();

  render() {
    const { curBar } = this.state;
    return (
      <div className={`tab-charts ${curBar !== TabValue.unit ? 'hidden' : ''}`}>
        <UnitBar />
        <SpecialUnit />
        <ProtectionUnit />
      </div>
    );
  }

  _init = () => {
    const { curBar } = this.state;
    if (curBar === TabValue.unit) {
      this._addListener(); // 添加事件监听
      this._fetchChartData(); // 获取图表数据
    }
  };

  _dealWithEvent = () => {
    Event.on(EventName.changeNav, this._onChangeNav);
  };

  /**
   * 点击顶部tab切换：
   * 1. 重复点击保护
   * 2. 删除图层
   * 3. 关闭对应弹窗（铭牌、铭牌详情）
   * 4. 设置当前选中的 tab
   * 5. 如果选中当前 tab，获取对应的图表数据，增加监听；如果未选中当前图表数据，删除图层，移除监听
   */
  _onChangeNav = async nextBar => {
    const { curBar } = this.state;
    if (nextBar === curBar) return; // 重复点击保护
    const { unit: unitLayerIds } = LayerIds;
    RemoveLayer(_MAP_, unitLayerIds.point); // 切换选中tab，删除对应图层
    RemoveLayer(_MAP_, unitLayerIds.namePlate); // 切换选中tab，删除对应图层
    GlobalEvent.emit(GloEventName.closePopupUnitNameplate); // 关闭名牌弹窗
    GlobalEvent.emit(GloEventName.closePopupUnit); // 关闭详情弹框
    await this.setState({ curBar: nextBar }); // 关闭对应弹窗
    if (TabValue.unit === nextBar) {
      this._fetchChartData(); // 获取图表数据
      this._addListener(); // 增加监听
    } else {
      this._removeListener(); // 移除监听
    }
  };

  _fetchChartData = async () => {
    const { curBar } = this.state;
    if (TabValue.unit !== curBar) return;
    const _bounds = _MAP_.getBounds();
    const _zoom = _MAP_.getZoom();
    // minX=120&maxX=121&minY=36.4&maxY=36.5&level=9.5
    const _param = `minX=${_bounds._sw.lng}&maxX=${_bounds._ne.lng}&minY=${_bounds._sw.lat}&maxY=${_bounds._ne.lat}&level=${_zoom}`;
    const { res, err } = await GetCount(_param);
    if (!res || err) return; // 保护
    const { dwbarData, tedwpieData, baohudwpieData } = res;
    Event.emit(EventName.updateUniChart, {
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
}
