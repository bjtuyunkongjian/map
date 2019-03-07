import React, { Component } from 'react';
import Event, { EventName } from './event';
import { DefaultTab, TabArr } from './constant';

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

  _init = () => {
    Event.on(EventName.changeNav, nextBar => {
      const { curBar } = this.state;
      if (nextBar === curBar) return;
      this.setState({ curBar: nextBar });
    });
  };

  _changeTab = curBar => {
    this.setState({ curBar: curBar });
    Event.emit(EventName.changeNav, curBar);
  };
}
