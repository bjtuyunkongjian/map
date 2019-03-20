import React, { Component } from 'react';
import TabNav from './tab-nav';
import PopulationTab from './population-tab';
import UnitTab from './unit-tab';
import BuildingTab from './building-tab';
import CaseTab from './case-tab';
import AlarmTab from './alarm-tab';

export default class LinkageDisplay extends Component {
  state = {
    animate: ''
  };

  render() {
    const { animate } = this.state;
    const _slide = animate === 'slide-in' ? '' : 'changed';
    return (
      <div className={`linkage-display ${animate}`}>
        <div className="tab-box">
          <TabNav />
          <PopulationTab />
          <UnitTab />
          <BuildingTab />
          <CaseTab />
          <AlarmTab />
        </div>
        <button className="control" onClick={this._toggleRightMenu}>
          <div className={`aspect-right ${_slide}`} />
        </button>
      </div>
    );
  }

  _toggleRightMenu = () => {
    const { animate } = this.state;
    this.setState({
      animate: animate === 'slide-in' ? 'slide-out' : 'slide-in'
    });
  };
}
