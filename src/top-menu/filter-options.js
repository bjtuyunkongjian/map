/**
 * @author sl204984
 * 过滤
 */

import React, { Component } from 'react';

import Event from './event';
import MenuItems from './menu-items';

export default class FilterOptions extends Component {
  state = {
    curMenu: -1
  };

  componentWillMount() {
    Event.on('change:curMenu', curMenu => {
      this.setState({ curMenu });
    });
  }

  render() {
    const { curMenu } = this.state;
    return (
      <div
        className={`menu-item${
          curMenu === MenuItems.filterOptions ? ' checked' : ''
        }`}
        onClick={this._selectMenu}
      >
        筛选
      </div>
    );
  }

  _selectMenu = () => {
    const { curMenu } = this.state;
    Event.emit(
      'change:curMenu',
      curMenu === MenuItems.filterOptions ? -1 : MenuItems.filterOptions
    );
  };
}
