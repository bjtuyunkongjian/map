import React, { Component } from 'react';
import TabBar from './tab-bar';
import PopulationTab from './population-tab';

export default class LinkageDisplay extends Component {
  render() {
    return (
      <div className="linkage-display">
        <TabBar />
        <PopulationTab />
      </div>
    );
  }
}
