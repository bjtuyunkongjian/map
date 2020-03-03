/**
 * 放大
 *  */
import React, { Component } from 'react';
import { IoMdAdd } from 'react-icons/io';

export default class ZoomInBtn extends Component {
  state = {};

  render() {
    return (
      <div className="zoom-in-btn" onClick={this._changeMap}>
        <IoMdAdd size={18} />
      </div>
    );
  }

  _changeMap = () => {
    const _curZoom = _MAP_.getZoom();
    _MAP_ && _MAP_.zoomTo(_curZoom + 1);
  };
}
