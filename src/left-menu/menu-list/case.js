import React, { Component } from 'react';
import Event from './event';
import { IoIosMail } from 'react-icons/io';
export default class Case extends Component {
  render() {
    return (
      <div
        className="menu-item"
        onClick={() => {
          Event.emit('aaa');
        }}
      >
        <IoIosMail />
        案件
        <span className="arrow arrow-right" />
      </div>
    );
  }
}
