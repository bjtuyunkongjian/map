/**
 * @author 郝艺红
 * @name 一标三实
 */

import React, { Component } from 'react';
import { IsArray, Event as GlobalEvent } from 'tuyun-utils';
import { IoIosPeople, IoMdCheckmark } from 'react-icons/io';

import PopOption from './pop-option';
import UnitOption from './unit-option';
import HouseOption from './house-option';

import HouseMessage from './house-message';
import UnitMessage from './unit-message';

export default class PoliceData extends Component {
  state = {
    expanded: false,
    animate: 'hidden'
  };

  componentDidMount = () => this._init();

  render() {
    const { expanded, animate } = this.state;
    const _arrow = expanded ? 'arrow-down' : 'arrow-right';
    return (
      <div className="menu-item police-data">
        <div className="item-label data" onClick={this._selectMenu}>
          <IoIosPeople />
          <span>一标三实</span>
          <div className={`arrow-box ${expanded ? 'changed' : ''}`}>
            <span className={`arrow arrow-right ${_arrow}`} />
          </div>
        </div>
        <ul className={`data-container ${animate}`}>
          <PopOption />
          <UnitOption />
          <HouseOption />
        </ul>
        <HouseMessage />
        {/* {selectedOpt === 'unit' ? <UnitMessage /> : null} */}
      </div>
    );
  }

  // 点击事件
  _init = () => {};

  // 发送菜单改变事件
  _selectMenu = () => {
    const { expanded } = this.state;
    const _animate = !expanded ? 'menu-down' : 'menu-up';
    this.setState({ expanded: !expanded, animate: _animate }); // 修改 state
  };
}
