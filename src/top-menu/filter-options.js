/**
 * @author sl204984
 * 过滤
 */

import React, { Component } from 'react';

import Event from './event';

export default class FilterOptions extends Component {
  state = {
    curIndex: -1
  };

  componentWillMount() {
    Event.on('change:curIndex', curIndex => {
      this.setState({ curIndex });
    });
  }

  render() {
    return (
      <div className="menu-item" onClick={this._selectMenu}>
        筛选
      </div>
    );
  }

  _selectMenu = () => {
    const { curIndex } = this.state;
    Event.emit(
      'change:curIndex',
      curIndex === menuItemIndex ? -1 : menuItemIndex
    );
    // Event.emit('aaa', 2);
    // this.setState({
    //   curIndex: curIndex === menuItemIndex ? -1 : menuItemIndex
    // });
  };
}

const menuItemIndex = 2;
