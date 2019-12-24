import React, { Component } from 'react';

import TopNav from './top-nav';
import BodyInfo from './body-info';

export default class Screen extends Component {
  state = {};
  render() {
    return (
      <div className="screen">
        <TopNav />
        <BodyInfo />
      </div>
    );
  }
}
