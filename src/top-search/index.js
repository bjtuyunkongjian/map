import React, { Component } from 'react';
import { IoMdShareAlt, IoMdSearch } from 'react-icons/io';

export default class TopSearch extends Component {
  render() {
    return (
      <div className="top-search">
        <input type="text" placeholder="图云搜索" className="search-input" />
        <IoMdShareAlt className="route-icon" />
        <div className="search-btn">
          <IoMdSearch className="search-icon" />
        </div>
      </div>
    );
  }
}
