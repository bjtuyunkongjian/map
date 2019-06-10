/**
 * @author sl
 * @description 安保路线
 */
import React, { Component } from 'react';
import { IoIosCar } from 'react-icons/io';

import Event from '../event';
import NewRoute from './new-route'; // 新建安保路线
import ViewRoute from './view-route'; // 查看安保路线

import { MenuItems } from '../constant';

export default class PoliceCar extends Component {
  state = {
    curMenu: -1,
    selectedOpt: '',
    animate: 'hidden'
  };

  _roadFeatures = []; // 选中的路
  _roadNode = []; // 选中路的节点，撤销使用
  _lineRingFeatures = []; // 环形路
  _toSelectFeatures = []; // 待选择的点

  componentDidMount = () => this._init();

  render() {
    const { curMenu, selectedOpt, animate } = this.state;
    const _selected = curMenu === MenuItems.securityRoute;
    const _arrow = _selected ? 'arrow-down' : 'arrow-right';
    return (
      <div className="menu-item">
        <div className="item-label" onClick={this._selectMenu}>
          <IoIosCar />
          <span>安保路线</span>
          <div className={`arrow-box ${_selected ? 'changed' : ''}`}>
            <span className={`arrow ${_arrow}`} />
          </div>
        </div>

        <ul className={`route-container ${animate}`}>
          {options.map((item, index) => (
            <li
              className={`route-item ${
                selectedOpt === item.value ? 'checked' : ''
              }`}
              key={`data_option_${index}`}
              onClick={() => this._selectMenuItem(item.value)}
            >
              {item.name}
            </li>
          ))}
        </ul>

        {selectedOpt === 'newRoute' ? <NewRoute /> : null}
        {selectedOpt === 'viewRoute' ? <ViewRoute /> : null}
      </div>
    );
  }

  _init = () => {
    Event.on('change:curMenu', this._dealWithEvent); // 选择当前菜单
  };

  // 发送菜单改变事件
  _selectMenu = () => {
    const { curMenu } = this.state;
    Event.emit(
      'change:curMenu',
      curMenu === MenuItems.securityRoute ? -1 : MenuItems.securityRoute
    );
  };

  _dealWithEvent = nextMenu => {
    const { curMenu } = this.state;
    if (curMenu === nextMenu) return; // 重复点击不做任何操作
    let _animate;
    if (nextMenu === MenuItems.securityRoute) {
      _animate = 'menu-down';
    } else if (curMenu === MenuItems.securityRoute) {
      _animate = 'menu-up';
    } else {
      _animate = 'hidden';
    }
    this.setState({ curMenu: nextMenu, selectedOpt: '', animate: _animate });
  };

  _selectMenuItem = value => {
    this.setState({ selectedOpt: value });
  };
}

const options = [
  {
    value: 'newRoute',
    name: '新建'
  },
  {
    value: 'viewRoute',
    name: '模拟'
  }
];
