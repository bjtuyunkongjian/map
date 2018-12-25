/**
 * @author sl204984
 * 框选
 */

import React, { Component } from 'react';

export default class FrameSelect extends Component {
  state = {
    curMenu: -1
  };

  render() {
    return (
      <div className="menu-item" onClick={this._selectMenu}>
        框选
      </div>
    );
  }

  _selectMenu = e => {
    e.stopPropagation();
  };
}
