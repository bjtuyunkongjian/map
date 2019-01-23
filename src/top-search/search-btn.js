import React, { Component } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { SearchDevice } from './webapi';
import Event from './event';

export default class SearchBtn extends Component {
  state = {};

  _inputVal = undefined;

  componentDidMount = () => this._init();

  render() {
    return (
      <div className="search-btn" onClick={this._searchDevice}>
        <IoMdSearch className="search-icon" />
      </div>
    );
  }

  _init = () => {
    Event.on('change:inputVal', value => {
      this._inputVal = value;
    });
  };

  _searchDevice = async () => {
    const _devices = this._inputVal.split(',');
    const _param = { devices: _devices };
    const { res, err } = await SearchDevice(_param);
    console.log(res, err);
  };
}
