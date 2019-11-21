import React, { Component } from 'react';
import { GlobalEvent, GloEventName } from 'tuyun-utils';

import SearchInput from './search-input';
import SearchBtn from './search-btn';
import CityInfo from './city-info';
import CityList from './city-list';
import SearchNav from './search-nav';
import BaseSearch from './base-search';
import PolySearch from './poly-search';

export default class TopSearch extends Component {
  state = { showUi: true };

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { showUi } = this.state;

    return (
      <div className={showUi ? 'top-search' : 'hidden'}>
        <SearchNav />
        <CityInfo />
        <BaseSearch />
        <PolySearch />
        <SearchInput />
        <SearchBtn />
        <CityList />
      </div>
    );
  }

  _dealWithEvent = () => {
    const { toggleAllUi } = GloEventName;
    GlobalEvent.on(toggleAllUi, ({ visible }) => {
      this.setState({ showUi: visible });
    });
  };
}
