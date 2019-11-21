import React, { Component } from 'react';
import { MdHighlightOff } from 'react-icons/md';

import Event, { EventName } from './event';
import { SearchValue } from './constant';

export default class SearchInput extends Component {
  state = {
    inputVal: '',
    curNav: {},
    curType: {}
  };

  componentWillMount = () => this._dealWithEvent();
  componentDidMount = () => this._init();

  render() {
    const { inputVal, curNav, curType } = this.state;
    const _isHidden = inputVal ? '' : 'hidden';
    if (curNav.value === SearchValue.polygon) return null;
    return (
      <div className="search-input-box">
        <input
          type="text"
          placeholder={curType.placeholder || '图云搜索'}
          className="search-input"
          value={inputVal}
          onChange={this._onChange}
          onKeyUp={this._onKeyUp}
        />
        <div className={`search-clear ${_isHidden}`} onClick={this._clearInput}>
          <MdHighlightOff />
        </div>
      </div>
    );
  }

  _init = () => {};

  _dealWithEvent = () => {
    Event.on(EventName.changeSearchNav, nextNav => {
      const { curNav } = this.state;
      if (nextNav === curNav) return;
      this.setState({ curNav: nextNav });
    });
    Event.on(EventName.changeSearchType, nextType => {
      this.setState({ curType: nextType });
    });
  };

  _onChange = e => {
    this.setState({ inputVal: e.target.value });
    if (!e.target.value) {
    }
    Event.emit(EventName.changeInputVal, e.target.value);
  };

  _clearInput = () => {
    this.setState({ inputVal: '' });
    Event.emit(EventName.changeInputVal, '');
  };

  _onKeyUp = async e => {
    if (e.keyCode !== 13) return;
    Event.emit(EventName.clickSearchBtn);
  };
}
