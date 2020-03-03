import React, { Component } from 'react';
import { IoMdSearch } from 'react-icons/io';
import Event, { EventName } from './event';

export default class SearchBtn extends Component {
  _searchNav = {};
  _inputVal = undefined;
  _searchVal = undefined;
  _uuid = -1;

  render() {
    return (
      <div className="search-btn" onClick={this._searchDevice}>
        <IoMdSearch className="search-icon" />
      </div>
    );
  }

  _searchDevice = () => Event.emit(EventName.clickSearchBtn);
}
