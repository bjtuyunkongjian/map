import React, { Component } from 'react';
import { Event as GlobalEvent, EventName as GloEventName } from 'tuyun-utils';

import TabNav from './tab-nav';
import PopulationTab from './population-tab';
import UnitTab from './unit-tab';
import BuildingTab from './building-tab';
import CaseTab from './case-tab';
import AlarmTab from './alarm-tab';

export default class LinkageDisplay extends Component {
  state = {
    animate: 'slide-in' // slide-in，滑入，显示在屏幕中；slide-out，划出，不显示在屏幕中。是不是有点问题
  };

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
    const { animate } = this.state;
    const _slide = animate === 'slide-in' ? '' : 'changed';
    return (
      <div className={`linkage-display ${animate}`}>
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

  _init = () => {
    const { toggleLinkage } = GloEventName;
    GlobalEvent.on(toggleLinkage, ({ visible }) => {
      const { animate } = this.state;
      visible && animate !== 'slide-in' && this._toggleRightMenu();
    }); // 显示右侧联动数据
  };

  _toggleRightMenu = () => {
    const { animate } = this.state;
    this.setState({
      animate: animate === 'slide-in' ? 'slide-out' : 'slide-in'
    });
  };
}
