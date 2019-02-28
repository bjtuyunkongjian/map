import React, { Component } from 'react';
import TabBar from './tab-bar';
import PopulationTab from './population-tab';
import CaseTab from './case-tab';
import AlarmTab from './alarm-tab';

export default class LinkageDisplay extends Component {
  state = {
    animate: ''
  };
  render() {
    const { animate } = this.state;
    const _slide = animate === 'slide-out' ? 'changed' : '';
    return (
      <div className={`linkage ${animate}`}>
        <div className="linkage-display">
          <TabBar />
          <PopulationTab />
          <CaseTab />
          <AlarmTab />
        </div>
        <button className="control" onClick={this._toggleRightMenu}>
          <span className={`aspect-right ${_slide}`} />
        </button>
      </div>
    );
  }
  _toggleRightMenu = () => {
    const { animate } = this.state;
    this.setState({
      animate: animate === 'slide-out' ? 'slide-in' : 'slide-out'
    });
  };
}
