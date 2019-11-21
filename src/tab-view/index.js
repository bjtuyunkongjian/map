import React, { Component } from 'react';
import { GlobalEvent, GloEventName } from 'tuyun-utils';

import TabNav from './tab-nav';
import PopulationTab from './population-tab';
import UnitTab from './unit-tab';
import BuildingTab from './building-tab';
import CaseTab from './case-tab';
import PosituationTab from './posituation-tab';
import Event, { EventName } from './event';

export default class TabView extends Component {
  state = {
    showUi: true,
    visible: false,
    animate: '' // slide-in，滑入，显示在屏幕中；slide-out，划出，不显示在屏幕中。是不是有点问题
  };

  _curTabName = '';
  _selectedTabs = [];

  componentWillMount = () => this._dealWithEvent();

  componentWillUpdate = (_, nextState) => {
    const { animate: curAni } = this.state;
    const { animate: nextAni } = nextState;
    if (curAni !== nextAni) {
      const _hidden = nextAni === 'slide-out'; // 滑出，不显示，隐藏
      const { toggleHideDetailPopulation, toggleHideCaseDetail } = GloEventName;
      GlobalEvent.emit(toggleHideDetailPopulation, { hidden: _hidden });
      GlobalEvent.emit(toggleHideCaseDetail, { hidden: _hidden });
    }
  };

  render() {
    const { animate, visible, showUi } = this.state;
    const _slide = animate === 'slide-in' ? '' : 'changed';
    const _clsName = visible ? `tab-view ${animate}` : 'hidden';
    return (
      <div className={_clsName} style={showUi ? {} : { right: '-100%' }}>
        <div className="tab-box">
          <TabNav />
          <PopulationTab />
          <UnitTab />
          <BuildingTab />
          <CaseTab />
          <PosituationTab />
        </div>
        <button className="control" onClick={this._toggleRightMenu}>
          <div className={`aspect-right ${_slide}`} />
        </button>
      </div>
    );
  }

  _dealWithEvent = () => {
    const { toggleTabView, closeTabView, toggleAllUi } = GloEventName;
    GlobalEvent.on(toggleTabView, this._onToggleTabView); // 显示右侧联动数据
    GlobalEvent.on(closeTabView, () => {
      this._selectedTabs = [];
      this._curTabName = '';
      this.setState({ visible: false, animate: '' });
      Event.emit(EventName.changeNav, '');
    }); // 关闭右侧联动数据
    GlobalEvent.on(toggleAllUi, ({ visible }) => {
      this.setState({ showUi: visible });
    });
  };

  _onToggleTabView = async ({ visible = false, tabName = '', color } = {}) => {
    GlobalEvent.emit(GloEventName.closeCompareTab); // 关闭比对碰撞
    GlobalEvent.emit(GloEventName.closeJurisdictionData); // 关闭辖区数据
    GlobalEvent.emit(GloEventName.changeLMVehicleType); // 关闭两客一危
    const { animate, visible: curVisible } = this.state;
    if (tabName === this._curTabName && visible === curVisible) return; // 重复点击保护
    this._figureToSelectTab(visible, tabName, color); // 计算选中的 tab
    const _showTab = this._selectedTabs.length > 0;
    if (_showTab && animate !== 'slide-in') {
      this.setState({ animate: 'slide-in', visible: _showTab });
    } else {
      this.setState({ visible: _showTab });
    }
    if (!_showTab) {
      Event.emit(EventName.changeNav, '');
      return;
    }
    // 切换导航
    Event.emit(EventName.changeNav, this._selectedTabs[0].value);
  };

  _figureToSelectTab = (visible, tabName, color) => {
    // 存储加载的 tab
    if (!tabName) return;
    const _tabInd = this._selectedTabs.findIndex(
      item => item.tabName === tabName
    );
    if (visible) {
      if (_tabInd < 0) {
        this._selectedTabs.unshift({ tabName, value: tabName, visible, color }); // 之前没有，添加
      } else {
        this._selectedTabs.unshift(...this._selectedTabs.splice(_tabInd, 1)); // 之前有，移到第一位
      }
    } else {
      this._selectedTabs.splice(_tabInd, 1); // 删除对应的tab
    }
  };

  _toggleRightMenu = () => {
    const { animate } = this.state;
    this.setState({
      animate: animate === 'slide-in' ? 'slide-out' : 'slide-in'
    });
  };
}
