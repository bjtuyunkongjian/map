import React, { Component } from 'react';
import TabNav from './tab-nav';
import PopulationTab from './population-tab';
import UnitTab from './unit-tab';

export default class LinkageDisplay extends Component {
  state = {
    animate: ''
  };
  render() {
    const { animate } = this.state;
    const _slide = animate === 'slide-out' ? 'changed' : '';
    return (
      <div className={`linkage-display ${animate}`}>
        <div className="tab-box">
          <TabNav />
          <PopulationTab />
          <UnitTab />
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
      animate: animate === 'slide-out' ? 'slide-in' : 'slide-out'
    });
  };
}
