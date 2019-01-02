import React, { Component } from 'react';
import WorkContent from './menu-list/work-content';
import PoliceData from './menu-list/police-data';
import Camera from './menu-list/camera';
import Case from './menu-list/case';
import CallPolice from './menu-list/call-police';
import Police from './menu-list/police';
import PoliceCar from './menu-list/police-car';
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
          <Case />
          <CallPolice />
          <Police />
          {/* <PoliceCar /> */}
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
          <span className="aspect-left" />
        </button>
      </div>
    );
  }
}
