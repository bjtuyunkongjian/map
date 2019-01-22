import React, { Component } from 'react';
import { IoMdShareAlt, IoMdSearch } from 'react-icons/io';
import CityInfo from './city-info';
import CityList from './city-list';

export default class TopSearch extends Component {
  render() {
    return (
      <div className="top-search">
        <CityInfo />
        <input type="text" placeholder="图云搜索" className="search-input" />
        <IoMdShareAlt
          className="route-icon"
          onClick={() => {
            _MAP_.flyTo({ center: [117.015378, 36.639001], zoom: 17 });
          }}
        />
        <div className="search-btn">
          <IoMdSearch className="search-icon" />
        </div>

        <CityList />
      </div>
    );
  }
}
