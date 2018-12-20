import React, { Component } from 'react';
import Event from './event';
import { IoIosCall } from 'react-icons/io';
export default class CallPolice extends Component {
  render() {
    return (
      <div className="menu-item" onClick={() => {}}>
        <div className="item-label">
          <IoIosCall />
          报警
          <span className="arrow arrow-right" />
        </div>
      </div>
    );
  }
}
