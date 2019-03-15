/**
 * @author sl
 * @name 重点人员的详细分类
 */

import React, { Component } from 'react';
import { Event as GlobalEvent } from 'tuyun-utils';

export default class KeyPopDetail extends Component {
  state = {
    visible: true,
    selectedIndex: -1
  };

  render() {
    const { visible } = this.state;
    if (!visible) return null;
    return (
      <div className="keypop-detail">
        {[1, 2, 3].map((item, index) => {
          return (
            <div
              key={`menu_item_${index}`}
              className="menu-item"
              onClick={this._selectMenu}
            >
              标绘
            </div>
          );
        })}
      </div>
    );
  }

  _selectMenu = e => {
    e.stopPropagation();
  };
}
