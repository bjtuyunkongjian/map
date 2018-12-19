import React, { Component } from 'react';
import { IoIosBriefcase } from 'react-icons/io';

import Event from './event';
import MenuItems from './menu-items';

export default class ToolBox extends Component {
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
    const _selected = MenuItems.toolbox === curMenu;
    return (
      <div
        className={`menu-item tool-box ${_selected ? 'checked' : ''}`}
        onClick={this._selectMenu}
      >
        <IoIosBriefcase />
        工具箱
        <ul className={`option-container ${_selected ? '' : 'hidden'}`}>
          {toolboxOptions.map((item, index) => (
            <li
              className="option-item"
              key={`filter_option_${index}`}
              onClick={e => this._checkStyle(index, e)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  _selectMenu = () => {
    const { curMenu } = this.state;
    Event.emit(
      'change:curMenu',
      curMenu === MenuItems.toolbox ? -1 : MenuItems.toolbox
    );
  };

  _checkStyle = (index, e) => {
    e.stopPropagation();
  };
}

const toolboxOptions = [{ value: 0, name: '叠加显示' }];
