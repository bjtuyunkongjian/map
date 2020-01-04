import React, { Component } from 'react';
import Event, { EventName } from './event';
import { DefaultSearch, SearchArr } from './constant';

export default class SearchNav extends Component {
  state = {
    curNav: DefaultSearch
  };

  componentWillMount = () => this._dealWithEvent();
  componentDidMount = () => this._init();

  render() {
    const { curNav } = this.state;
    return (
      <ul className="search-nav">
        {SearchArr.map((item, index) => {
          return (
            <li
              className={`search-item ${item === curNav ? 'selected' : ''}`}
              key={`search_${index}`}
              onClick={() => this._changeTab(item)}
            >
              {item.label}
            </li>
          );
        })}
      </ul>
    );
  }

  _init = () => {
    const _nav = SearchArr.find(item => item.value === DefaultSearch);
    if (!_nav) return;
    Event.emit(EventName.changeSearchNav, _nav); // 切换 nav
  };

  _dealWithEvent = async () => {
    Event.on(EventName.changeSearchNav, nextNav => {
      const { curNav } = this.state;
      if (nextNav === curNav) return;
      this.setState({ curNav: nextNav });
    });
  };

  _changeTab = nextNav => {
    const { curNav } = this.state;
    if (nextNav === curNav) return;
    this.setState({ curNav: nextNav });
    Event.emit(EventName.changeSearchNav, nextNav); // 切换 nav
    const _tab = SearchArr.find(item => item === nextNav);
    if (!_tab) return;
  };
}
