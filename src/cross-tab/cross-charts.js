import React, { Component } from 'react';

import PopulationChart from './population-chart';
import CaseChart from './case-chart';
import SituationChart from './situation-chart';

export default class JurisdictionCharts extends Component {
  _visible = false;

  render() {
    return (
      <ul className="charts-box">
        <PopulationChart />
        <CaseChart />
        <SituationChart />
      </ul>
    );
  }
}
