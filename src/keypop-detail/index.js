/**
 * @author sl
 * @name 重点人员的详细分类
 */

import React, { Component } from 'react';
import { Event as GlobalEvent, EventName as GloEventName } from 'tuyun-utils';

export default class KeyPopDetail extends Component {
  state = {
    visible: false,
    selectedIndex: -1
  };

  componentDidMount = () => this._init();

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

  _init = () => {
    GlobalEvent.on(GloEventName.toggleKeyPopDetail, ({ visible, name }) => {
      console.log(visible, name);
      this.setState({ visible });
    });
  };

  _selectMenu = e => {
    e.stopPropagation();
  };
}
