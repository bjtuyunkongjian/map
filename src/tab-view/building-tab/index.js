/**
 * @author sl 2019-03-07
 * @description 房屋面板
 * 1.  房屋饼状图
 * 2. 房屋密度图
 */

import React, { Component } from 'react';
import { GlobalEvent, GloEventName } from 'tuyun-utils';

import BuildingBar from './building-bar';
import BuildingDensity from './building-density';
import { GetCount } from './webapi';
import { BuildingLayerId } from './chart-info';
import { RemoveLayer } from './layer-control';

import Event, { EventName } from '../event';
import { DefaultTab, TabValue } from '../constant';

export default class BuildingTab extends Component {
  state = {
    curBar: DefaultTab
  };

  componentWillMount = () => this._dealWithEvent();
  componentDidMount = () => this._init();

  render() {
    const { curBar } = this.state;
    return (
      <div
        className={`tab-charts ${curBar !== TabValue.building ? 'hidden' : ''}`}
      >
        <BuildingBar />
        <BuildingDensity />
      </div>
    );
  }

  _init = () => {
    const { curBar } = this.state;
    if (curBar === TabValue.building) {
      this._fetchChartData(); // 获取图表数据
      this._addListener(); // 添加事件监听
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
    RemoveLayer(_MAP_, BuildingLayerId); // 切换选中tab，删除对应图层
    GlobalEvent.emit(GloEventName.closePopupBuiNameplate); // 关闭名牌弹窗
    GlobalEvent.emit(GloEventName.closePopupBuilding); // 关闭详情弹框
    await this.setState({ curBar: nextBar }); // 关闭对应弹窗
    if (TabValue.building === nextBar) {
      this._addListener(); // 增加监听
      const _zoom = _MAP_.getZoom();
      _MAP_.flyTo({ zoom: _zoom > 16 ? _zoom : 16 });
    } else {
      this._removeListener(); // 移除监听
    }
  };

  _fetchChartData = async () => {
    const { curBar } = this.state;
    if (TabValue.building !== curBar) return;
    const _bounds = _MAP_.getBounds();
    const _zoom = _MAP_.getZoom();
    // minX=120&maxX=125&minY=36.4&maxY=37&level=8.7
    const _param = `minX=${_bounds._sw.lng}&maxX=${_bounds._ne.lng}&minY=${
      _bounds._sw.lat
    }&maxY=${_bounds._ne.lat}&level=${_zoom}`;
    const { res, err } = await GetCount(_param);
    if (!res || err) return; // 保护
    const { fwbarData, fwdensity } = res;
    Event.emit(EventName.updateBuiChart, {
      buildingBarData: fwbarData || {},
      buildingDensity: fwdensity || {}
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
    // // 大于 16 级，可以点击，小于 16 级，看点的数量
    const { showPopupBuiNameplate } = GloEventName;
    const { lngLat, originalEvent, features } = e;
    const { code } = features[0].properties;

    GlobalEvent.emit(showPopupBuiNameplate, {
      visible: true,
      boxLeft: originalEvent.x,
      boxTop: originalEvent.y,
      lngLat: lngLat,
      code: code
    });
  };
}
