import React, { Component } from 'react';
import { IoMdShareAlt } from 'react-icons/io';
import SearchInput from './search-input';
import SearchBtn from './search-btn';
import CityInfo from './city-info';
import CityList from './city-list';

export default class TopSearch extends Component {
  render() {
    return (
      <div className="top-search">
        <CityInfo />
        <SearchInput />
        <IoMdShareAlt
          className="route-icon"
          onClick={() => {
            _MAP_.flyTo({ center: [117.015378, 36.639001], zoom: 17 });
          }}
        />
        <SearchBtn />
        <CityList />
      </div>
    );
  }
}
