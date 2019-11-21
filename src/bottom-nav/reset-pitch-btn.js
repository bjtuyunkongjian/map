/**
 * 一键还原倾斜度
 */

import React, { Component } from 'react';
import { FaArrowRight } from 'react-icons/fa';
export default class Restore extends Component {
  _curPitch = 0;

  render() {
    const tips = '点击还原倾斜度（按住鼠标右键并拖动可倾斜视角）';
    return (
      <div className="reset-pitch-btn" onClick={this._changeMap}>
        <div className="icon-box">
          <FaArrowRight size={15} className="icon" />
        </div>
        <span className="tip">{tips}</span>
      </div>
    );
  }

  _changeMap = () => {
    _MAP_ && _MAP_.flyTo({ pitch: 0 });
  };
}
