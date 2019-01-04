import React, { Component } from 'react';
import Event from './event';

export default class TabBar extends Component {
  state = {
    curBar: 'population'
  };

  componentDidMount() {
    this._init();
  }

  componentWillUnmount() {
    console.log('TabBar unmount');
  }

  render() {
    const { curBar } = this.state;
    return (
      <ul className="tab-bar">
        {tabs.map((item, index) => (
          <li
            className={`tab-item ${item.value === curBar ? 'selected' : ''}`}
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
    // Event.on('change:curBar', nextBar => {
    //   const { curBar } = this.state;
    //   if (nextBar === curBar) return;
    //   // this.setState({ curBar: nextBar });
    // });
  };

  _changeTab = curBar => {
    console.log('curBar', curBar);
    this.setState({ curBar: curBar });
    Event.emit('change:curBar', curBar);
  };
}

const tabs = [
  { label: '人口', value: 'population' },
  { label: '案件', value: 'case' },
  { label: '报警', value: 'alarm' }
];
