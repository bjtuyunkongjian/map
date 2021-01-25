import React, { Component } from 'react';

import SearchNav from './search-nav';
import SearchInput from './search-input';
import SearchBtn from './search-btn';
import ResultList from './result-list';

export default class TopSearch extends Component {


  render() {
    return (
      <div className="top-search">
        <SearchNav />
        <SearchInput />
        <SearchBtn />
        <ResultList />
      </div>
    );
  }
}
