/**
 * 一键还原倾斜度，角度
 */

import React, { Component } from "react";
import { FaBullseye } from "react-icons/fa";
export default class Restore extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const tips = "点击还原倾斜度";
    return (
      <div className="restoreFast" onClick={() => this._changeMap()}>
        <FaBullseye className="icon" />
        <span className="tip">{tips}</span>
      </div>
    );
  }

  _changeMap = e => {
    _MAP_.setPitch(0);
    _MAP_.setBearing(0);
  };
}
