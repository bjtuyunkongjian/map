import React, { Component } from 'react';
import WorkContent from './work-content';
import PoliceData from './police-data';
import PoliceCase from './police-case';
import CallPolice from './call-police';
import PoliceForce from './police-force';
import SecurityRoute from './security-route';
// import CommonFacility from './public-facility';
import VehicleType from './vehicle-type';
import ImportantPlace from './important-place';
export default class LeftMenu extends Component {
  state = {
    animate: ''
  };

  render() {
    const { animate } = this.state;
    const _slide = animate === 'menu-slide-in' ? '' : 'changed';
    return (
      <div className={`left-menu ${animate}`}>
        <div className="menu-box">
          <WorkContent />
          <PoliceData />
          <PoliceCase />
          <CallPolice />
          <PoliceForce />
          <SecurityRoute />
          {/* <CommonFacility /> */}
          <VehicleType />
          <ImportantPlace />
        </div>
        <button className="control" onClick={this._toggleLeftMenu}>
          <span className={`aspect-left ${_slide}`} />
        </button>
      </div>
    );
  }

  _toggleLeftMenu = () => {
    const { animate } = this.state;
    this.setState({
      animate: animate === 'menu-slide-in' ? 'menu-slide-out' : 'menu-slide-in'
    });
  };
}
