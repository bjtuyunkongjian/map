import React, { Component } from 'react';
import { GlobalEvent, GloEventName } from 'tuyun-utils';

import Event, { EventName } from './event';
import { DefaultTab, TabValue, TabArr } from './constant';

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

  _dealWithEvent = async () => {
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
      } else if (tabName === 'case') {
        this._changeTab(TabValue.case);
      }
    }); // 显示右侧联动数据人口
  };

  _init = () => {
    const _template = TabArr.filter(item => item.value === DefaultTab)[0]
      .template;
    _MAP_.on('style.load', () => {
      _template !== '服务民生' &&
        GlobalEvent.emit(GloEventName.changeMapTemplate, _template); // 切换模板
    });
  };

  _changeTab = nextBar => {
    const { curBar } = this.state;
    const _template = TabArr.filter(item => item.value === nextBar)[0].template;
    GlobalEvent.emit(GloEventName.changeMapTemplate, _template); // 切换模板
    if (nextBar === curBar) return;
    this.setState({ curBar: nextBar });
    Event.emit(EventName.changeNav, nextBar);
  };
}
