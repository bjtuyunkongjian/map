/**
 * 缩小
 *  */
import React, { Component } from 'react';
import { IoMdRemove } from 'react-icons/io';

export default class ZoomOutBtn extends Component {
  state = {};

  render() {
    return (
      <div className="zoom-out-btn" onClick={this._changeMap}>
        <IoMdRemove size={18} />
      </div>
    );
  }

  _changeMap = () => {
    const _curZoom = _MAP_.getZoom();
    _MAP_ && _MAP_.zoomTo(_curZoom - 1);
  };
}
