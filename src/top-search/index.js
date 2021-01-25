import React, { Component } from 'react';

import SearchNav from './search-nav';
import SearchInputGeocode from './search-input-geocode';
import SearchInputGeocodeReverse from './search-input-geocode-reverse';
import SearchBtn from './search-btn';
import ResultListGeoCode from './result-list-geocode';
import ResultListGeoCodeReverse from './result-list-geocode-reverse';

export default class TopSearch extends Component {


  render() {
    return (
      <div className="top-search">
        <SearchNav />
        <SearchInputGeocode />
        <SearchInputGeocodeReverse />
        <SearchBtn />
        <ResultListGeoCode />
        <ResultListGeoCodeReverse />
      </div>
    );
  }
}
