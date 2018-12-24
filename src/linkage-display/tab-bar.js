import React, { Component } from 'react';

export default class Tabs extends Component {
  state = {};
  render() {
    return (
      <ul className="tab-bar">
        {tabs.map((item, index) => (
          <li
            className={`tab-item ${index === 0 ? 'selected' : ''}`}
            key={`tab_${index}`}
          >
            {item.label}
          </li>
        ))}
      </ul>
    );
  }
}

const tabs = [{ label: '人口' }, { label: '案件' }, { label: '报警' }];
