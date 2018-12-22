/**
 * @author sl204984
 * 框选
 */

import React, { Component } from 'react';

export default class FrameSelect extends Component {
  state = {
    curIndex: -1
  };
  render() {
    return (
      <div className="menu-item" onClick={this._selectMeun}>
        框选
      </div>
    );
  }

  _selectMeun = () => {};
}
