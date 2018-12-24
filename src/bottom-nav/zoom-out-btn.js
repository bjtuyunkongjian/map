/**
 * 缩小
 *  */
import React, { Component } from 'react';
import { IoMdRemove } from 'react-icons/io';

export default class ZoomOutBtn extends Component {
  state = {};

  render() {
    return (
      <div className="zoom-out-btn">
        <IoMdRemove size={18} />
      </div>
    );
  }
}
