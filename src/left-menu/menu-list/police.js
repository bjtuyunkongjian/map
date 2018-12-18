import React, { Component } from 'react';
import Event from '../event';
import { TiUser } from 'react-icons/ti';
export default class Police extends Component {
  render() {
    return (
      <div
        className="menu-item"
        onClick={() => {
          Event.emit('aaa');
        }}
      >
        <TiUser />
        警力
        <span className="arrow arrow-right" />
      </div>
    );
  }
}
