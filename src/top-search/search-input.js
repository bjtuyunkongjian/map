import React, { Component } from 'react';
import Event from './event';

export default class SearchInput extends Component {
  state = {};
  render() {
    return (
      <input
        type="text"
        placeholder="图云搜索"
        className="search-input"
        disabled={false}
        onChange={this._onChange}
      />
    );
  }
  _onChange = e => {
    Event.emit('change:inputVal', e.target.value);
  };
}
