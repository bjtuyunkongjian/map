import React, { Component } from 'react';
import { IoMdSearch } from 'react-icons/io';
import { SearchDevice } from './webapi';

export default class SearchBtn extends Component {
  state = {};

  render() {
    return (
      <div className="search-btn" onClick={this._searchDevice}>
        <IoMdSearch className="search-icon" />
      </div>
    );
  }

  _searchDevice = async () => {
    const _param = {
      devices: ['鲁A9212警']
    };
    const { res, err } = await SearchDevice(_param);
    console.log(res, err);
  };
}
