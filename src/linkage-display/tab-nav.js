import React, { Component } from 'react';
import Event from './event';

export default class TabNav extends Component {
  state = {
    curBar: 'population'
  };

  componentDidMount() {
    this._init();
  }

  render() {
    const { curBar } = this.state;
    return (
      <ul className="tab-nav">
        {tabs.map((item, index) => (
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
    Event.on('change:curBar', nextBar => {
      const { curBar } = this.state;
      if (nextBar === curBar) return;
      this.setState({ curBar: nextBar });
    });
  };

  _changeTab = curBar => {
    this.setState({ curBar: curBar });
    Event.emit('change:curBar', curBar);
  };
}

const tabs = [
  { label: '人口', value: 'population' },
  { label: '单位', value: 'unit' },
  { label: '案件', value: 'case' },
  { label: '报警', value: 'alarm' }
];
