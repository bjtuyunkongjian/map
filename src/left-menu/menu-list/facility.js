import React, { Component } from 'react';
import Event from './event';
import { IoMdBusiness } from 'react-icons/io';
export default class CommonFacility extends Component {
  render() {
    return (
      <div
        className="menu-item"
        onClick={() => {
          Event.emit('aaa');
        }}
      >
        <div className="item-label">
          <IoMdBusiness />
          公共设施
          <span className="arrow arrow-right" />
        </div>
      </div>
    );
  }
}
