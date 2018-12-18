import React, { Component } from 'react';
import Event from '../event';
import { IoIosEye } from 'react-icons/io';
export default class Camera extends Component {
  render() {
    return (
      <div
        className="menu-item"
        onClick={() => {
          Event.emit('aaa');
        }}
      >
        <IoIosEye />
        摄像头
        <span className="arrow arrow-right" />
      </div>
    );
  }
}
