/**
 * @author sl204984
 * 线选
 */

import React, { Component } from 'react';

export default class LineSelect extends Component {
  state = {
    curMenu: -1
  };

  render() {
    return (
      <div className="menu-item" onClick={this._selectMenu}>
        线选
      </div>
    );
  }

  _selectMenu = e => {
    e.stopPropagation();
  };
}
