/**
 * 放大
 *  */
import React, { Component } from 'react';
import { IoMdAdd } from 'react-icons/io';

export default class ZoomInBtn extends Component {
  state = {};

  render() {
    return (
      <div className="zoom-in-btn">
        <IoMdAdd size={18} />
      </div>
    );
  }
}
