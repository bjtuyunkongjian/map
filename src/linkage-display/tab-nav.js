import React, { Component } from 'react';
import { Event as GlobalEvent, EventName as GloEventName } from 'tuyun-utils';

import Event, { EventName } from './event';
import { DefaultTab, TabValue, TabArr } from './constant';

export default class TabNav extends Component {
  state = {
    curBar: DefaultTab
  };

  componentDidMount() {
    this._init();
  }

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

  _init = async () => {
    Event.on(EventName.changeNav, nextBar => {
      const { curBar } = this.state;
      if (nextBar === curBar) return;
      this.setState({ curBar: nextBar });
    });
    GlobalEvent.on(GloEventName.toggleLinkageTab, ({ tabName }) => {
      if (tabName === 'population') {
        this._changeTab(TabValue.population);
      } else if (tabName === 'unit') {
        this._changeTab(TabValue.unit);
      } else if (tabName === 'house') {
        this._changeTab(TabValue.building);
      }
    }); // 显示右侧联动数据人口
  };

  _changeTab = nextBar => {
    const { curBar } = this.state;
    if (nextBar === curBar) return;
    this.setState({ curBar: nextBar });
    Event.emit(EventName.changeNav, nextBar);
    this._closePopup();
  };

  _closePopup = () => {
    GlobalEvent.emit(GloEventName.closePopupPopNameplate);
    GlobalEvent.emit(GloEventName.closePopupUnitNameplate);
    GlobalEvent.emit(GloEventName.closePopupBuiNameplate);
    GlobalEvent.emit(GloEventName.closePopupPopulation);
    GlobalEvent.emit(GloEventName.closePopupUnit);
    GlobalEvent.emit(GloEventName.closePopupBuilding);
  };
}
