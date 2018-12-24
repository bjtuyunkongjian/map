import React, { Component } from 'react';
import TabBar from './tab-bar';
import TotalPopulation from './total-population';
import AgeDistribution from './age-distribution';

export default class LinkageDisplay extends Component {
  render() {
    return (
      <div className="linkage-display">
        <TabBar />
        <TotalPopulation />
        <AgeDistribution />
      </div>
    );
  }
}
