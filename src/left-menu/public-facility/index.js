import React, { Component } from 'react';
import { IoMdBusiness } from 'react-icons/io';

import Event from '../event';

export default class PublicFacility extends Component {
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
          <span>公共设施</span>
          <div className="arrow-box">
            <span className="arrow arrow-right" />
          </div>
        </div>
      </div>
    );
  }
}
