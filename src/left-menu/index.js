import React, { Component } from 'react';
import WorkContent from './menu-list/work-content';
import PoliceData from './menu-list/police-data';
import Camera from './menu-list/camera';
import PoliceCase from './menu-list/police-case';
import CallPolice from './menu-list/call-police';
import Police from './menu-list/police';
import SecurityRoute from './menu-list/security-route';
import CommonFacility from './menu-list/facility';
import ImportantPalce from './menu-list/palce';
export default class LeftMenu extends Component {
  state = {
    animate: ''
  };

  render() {
    const { animate } = this.state;

    return (
      <div className={`left-menu ${animate}`}>
        <div className="menu-box">
          <WorkContent />
          <PoliceData />
          <Camera />
          <PoliceCase />
          <CallPolice />
          <Police />
          <SecurityRoute />
          <CommonFacility />
          <ImportantPalce />
        </div>
        <button
          className="control"
          onClick={() =>
            this.setState({
              animate:
                animate === 'menu-slide-out'
                  ? 'menu-slide-in'
                  : 'menu-slide-out'
            })
          }
        >
          <span
            className={`aspect-left ${
              animate === 'menu-slide-out' ? 'changed' : ''
            }`}
          />
        </button>
      </div>
    );
  }
}
