import React, { Component } from 'react';
import { GlobalEvent, GloEventName } from 'tuyun-utils';

import TabNav from './tab-nav';
import PopulationTab from './population-tab';
import UnitTab from './unit-tab';
import BuildingTab from './building-tab';
import CaseTab from './case-tab';
import AlarmTab from './alarm-tab';
import Event, { EventName } from './event';
import { TabValue, TabArr } from './constant';

export default class LinkageDisplay extends Component {
  state = {
    visible: false,
    animate: '' // slide-in，滑入，显示在屏幕中；slide-out，划出，不显示在屏幕中。是不是有点问题
  };

  _curTabName = '';

  componentWillMount = () => this._dealWithEvent();
  componentDidMount = () => this._init();

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
    const { animate, visible } = this.state;

    const _slide = animate === 'slide-in' ? '' : 'changed';
    const _clsName = visible ? `linkage-display ${animate}` : 'hidden';
    return (
      <div className={_clsName}>
        <div className="tab-box">
          <TabNav />
          <PopulationTab />
          <UnitTab />
          <BuildingTab />
          <CaseTab />
          <AlarmTab />
        </div>
        <button className="control" onClick={this._toggleRightMenu}>
          <div className={`aspect-right ${_slide}`} />
        </button>
      </div>
    );
  }

  _init = () => {};

  _dealWithEvent = () => {
    const { toggleLinkage } = GloEventName;
    GlobalEvent.on(toggleLinkage, this._onToggleLinkage); // 显示右侧联动数据
  };

  _onToggleLinkage = async ({ visible = false, tabName = '' } = {}) => {
    const { animate, visible: curVisible } = this.state;
    if (tabName === this._curTabName && visible === curVisible) return; // 重复点击保护
    if (visible && animate !== 'slide-in') {
      this.setState({ animate: 'slide-in', visible });
    } else {
      this.setState({ visible });
    }
    if (!visible) {
      Event.emit(EventName.changeNav, '');
      // GlobalEvent.emit(GloEventName.changeMapTemplate, ''); // 切换模板
      return;
    }
    let _tab;
    if (tabName === 'population') {
      _tab = TabArr.find(item => item.value === TabValue.population);
    } else if (tabName === 'unit') {
      _tab = TabArr.find(item => item.value === TabValue.unit);
    } else if (tabName === 'house') {
      _tab = TabArr.find(item => item.value === TabValue.building);
    } else if (tabName === 'case') {
      _tab = TabArr.find(item => item.value === TabValue.case);
    }
    Event.emit(EventName.changeNav, _tab.value);
    GlobalEvent.emit(GloEventName.changeMapTemplate, _tab.template); // 切换模板
  };

  _toggleRightMenu = () => {
    const { animate } = this.state;
    this.setState({
      animate: animate === 'slide-in' ? 'slide-out' : 'slide-in'
    });
  };
}
