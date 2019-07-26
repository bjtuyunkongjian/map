import React, { Component } from 'react';
import { GlobalEvent, GloEventName, GlobalConst } from 'tuyun-utils';

import Event, { EventName } from './event';
import { DefaultTab, TabArr, TabValue } from './constant';

export default class TabNav extends Component {
  state = {
    curBar: DefaultTab
  };

  componentWillMount = () => this._dealWithEvent();

  componentDidMount = () => this._init();

  render() {
    const { curBar } = this.state;
    return (
      <ul className="tab-nav">
        {TabArr.map((item, index) => (
          <li
            className={`nav-item ${item.value === curBar ? 'selected' : ''}`}
            key={`tab_${index}`}
            onClick={() => this._changeTab(item.value)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    );
  }

  _init = () => {
    const _tab = TabArr.find(item => item.value === DefaultTab);
    if (!_tab) return;
    const { template } = _tab;
    _MAP_.on('style.load', () => {
      GlobalEvent.emit(GloEventName.changeMapTemplate, template); // 切换模板
    });
  };

  _dealWithEvent = async () => {
    Event.on(EventName.changeNav, nextBar => {
      const { curBar } = this.state;
      if (nextBar === curBar) return;
      this.setState({ curBar: nextBar });
    });
  };

  _changeTab = nextBar => {
    const { curBar } = this.state;
    if (nextBar === curBar) return;
    this.setState({ curBar: nextBar });
    Event.emit(EventName.changeNav, nextBar); // 切换 tab
    const _tab = TabArr.find(item => item.value === nextBar);
    if (!_tab) return;
    this._changeMapTempalte(_tab); // 切换模板
    this._togglePoliceData(_tab); //  切换一标三实
  };

  _changeMapTempalte = curTab => {
    const { changeMapTemplate } = GloEventName;
    GlobalEvent.emit(changeMapTemplate, curTab.template);
  };

  _togglePoliceData = curTab => {
    const { toggleLMPoliceData } = GloEventName;
    let _selectedOpt = {};
    // let _expand = false;
    if (curTab.value === TabValue.population) {
      _selectedOpt = GlobalConst.policeData.popOption;
      // _expand = true;
    } else if (curTab.value === TabValue.unit) {
      _selectedOpt = GlobalConst.policeData.unitOption;
      // _expand = true;
    } else if (curTab.value === TabValue.building) {
      _selectedOpt = GlobalConst.policeData.buildingOption;
      // _expand = true;
    }
    GlobalEvent.emit(toggleLMPoliceData, {
      selectedOpt: _selectedOpt,
      cancelEmit: true
    });
  };
}
