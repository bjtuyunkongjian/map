import React, { Component } from 'react';
import Event from './event';
import { IoIosCar } from 'react-icons/io';
export default class PoliceCar extends Component {
  render() {
    return (
      <div className="menu-item" onClick={() => {}}>
        <div className="item-label">
          <IoIosCar />
          车辆
          <span className="arrow arrow-right" />
        </div>
      </div>
    );
  }
}
