import React, { Component } from 'react';

import Event from './event';
import { IoIosPeople } from 'react-icons/io';
import MenuItem from './menu-item';

export default class PoliceData extends Component {
  state = {
    curMenu: -1,
    selectedOpt: 0,
    animate: ''
  };

  componentDidMount() {
    Event.on('change:curMenu', curMenu => {
      console.log(curMenu);
      this.setState({ curMenu });
    });
  }

  render() {
    const { curMenu, selectedOpt, animate } = this.state;
    const _selected = curMenu === MenuItem.dataOption;
    return (
      <div
        className={`menu-item data${_selected ? 'checked' : ''}`}
        onClick={this._selectMenu}
      >
        <IoIosPeople />
        一标三实
        <span
          className={`arrow arrow-right${animate}`}
          onClick={() => {
            this.setState({
              animate: animate === 'arrow-down' ? 'arrow-right' : 'arrow-down'
            });
          }}
        />
        <ul className={`data-container${_selected ? '' : 'hidden'}`}>
          {options.map((item, index) => (
            <li
              className={`data-item${selectedOpt === index ? 'checked' : ''}`}
              key={`data_option_${index}`}
              onClick={e => this._checkmap(index, item.map, e)}
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
      curMenu === MenuItem.dataOption ? -1 : MenuItem.dataOption
    );
  };
  _checkmap = (index, map, e) => {
    e.stopPropagation();
    this.setState({ selectedOpt: index });
    for (let item of MapTypes) {
      if (!item.id || !item[map]) continue;
      if (_MAP_.getLayer(item.id)) {
        if (item.map === 'people') {
          _MAP_.getSource();
        }
      }
    }
  };
}

const options = [
  { value: 0, name: '人口', map: 'people' },
  { value: 1, name: '房屋', map: 'house' },
  { value: 2, name: '单位', map: 'unit' }
];
