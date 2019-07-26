import React, { Component } from 'react';
import { GoRadioTower } from 'react-icons/go';
import Event from '../event';

export default class ImportantPalce extends Component {
  render() {
    return (
      <div
        className="menu-item"
        onClick={() => {
          Event.emit('aaa');
        }}
      >
        <div className="item-label">
          <GoRadioTower />
          <span>重要场所</span>
          <div className="arrow-box">
            <span className="arrow arrow-right" />
          </div>
        </div>
      </div>
    );
  }
}
