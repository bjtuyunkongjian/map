import React, { Component } from 'react';
import { GlobalEvent, GloEventName } from 'tuyun-utils';

import Event, { EventName } from './event';
import { DefaultTab, TabArr } from './constant';

export default class imTabNav extends Component {
  state = {
    curTab: DefaultTab
  };

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { curTab } = this.state;
    return (
      <ul className="tab-nav">
        {TabArr.map((item, index) => (
          <li
            className={`nav-item ${item.value === curTab ? 'selected' : ''}`}
            key={`tab_${index}`}
            onClick={() => this._changeTab(item)}
          >
            {item.label}
          </li>
        ))}
      </ul>
    );
  }

  _dealWithEvent = async () => {
    Event.on(EventName.changeNav, nextBar => {
      const { curTab } = this.state;
      if (nextBar === curTab) return;
      this.setState({ curTab: nextBar });
    });
  };

  _changeTab = tabOpt => {
    const { curTab } = this.state;
    if (tabOpt.value === curTab) return;
    GlobalEvent.emit(GloEventName.toggleTabView, {
      visible: true,
      tabName: tabOpt.value,
      color: tabOpt.color
    });
    // Event.emit(EventName.changeNav, tabOpt); // 切换 tab
  };
}
