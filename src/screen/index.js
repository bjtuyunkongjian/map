import React, { Component } from 'react';

import TopNav from './top-nav';

export default class Screen extends Component {
  state = {};
  render() {
    return (
      <div className="screen">
        <TopNav />
      </div>
    );
  }
}
