/**
 * 一键还原倾斜度，角度
 */

import React, { Component } from 'react';
import { FaBullseye } from 'react-icons/fa';
export default class Restore extends Component {
  _curPitch = 0;

  render() {
    const tips = '点击还原倾斜度';
    return (
      <div className="restoreFast" onClick={() => this._changeMap()}>
        <FaBullseye className="icon" />
        <span className="tip">{tips}</span>
      </div>
    );
  }

  _changeMap = () => {
    this._curPitch = _MAP_.getPitch();
    this._rotate();
  };

  _rotate = () => {
    this._curPitch = this._curPitch > 1 ? this._curPitch - 1 : 0;
    _MAP_.setPitch(this._curPitch); // 旋转
    this._curPitch > 0 && requestAnimationFrame(this._rotate);
  };
}
