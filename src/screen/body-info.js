import React, { Component } from 'react';

import LeftMap from './left-map';
import RightChart from './right-chart';

export default class BodyInfo extends Component {
  state = {};

  render() {
    return (
      <div className="body-info">
        <LeftMap />
        <RightChart />
      </div>
    );
  }
}
