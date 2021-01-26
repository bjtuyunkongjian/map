import React, { Component } from 'react';
import { MdHighlightOff } from 'react-icons/md';

import Event, { EventName } from './event';
import { PostGeocodeReverse } from './webapi';
import { SearchValue } from './constant';

export default class SearchInput extends Component {
  state = {
    inputVal: '',
    curNav: {},
  };

  componentWillMount = () => this._dealWithEvent();
  componentDidMount = () => this._init();

  render() {
    const { inputVal, curNav } = this.state;
    if(curNav.value !== SearchValue.geocodeReverse) return null;
    const _isHidden = inputVal ? '' : 'hidden';
    return (
      <div className="search-input-box">
        <input
          type="text"
          placeholder="经度,纬度"
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
    Event.on(EventName.clickSearchBtn, async () => {
      const { inputVal, curNav } = this.state;
      if(curNav.value !== SearchValue.geocodeReverse) return;
      const { res, err } = await PostGeocodeReverse(inputVal); 
      console.log(res, err);

    });
  };

  _onChange = e => {
    const { value } = e.target;
    this.setState({ inputVal: value });
  };

  _clearInput = () => {
    this.setState({ inputVal: '' });
  };

  _onKeyUp = async e => {
    if (e.keyCode !== 13) return;
    Event.emit(EventName.clickSearchBtn);
  };
}
