import React, { Component } from 'react';

import Event from '../event';
import { IoIosPeople } from 'react-icons/io';
export default class PoliceData extends Component {
  state = {
    curIndex: -1,
    selectedOpt: 0
  };

  componentDidMount() {
    Event.on('change:curIndex', curIndex => {
      console.log('aaa', curIndex);
      this.setState({ curIndex });
    });
  }

  render() {
    const { curIndex, selectedOpt } = this.state;
    // const _selected = curIndex === menuItemIndex;
    return (
      <div
        className={`menu-item policedata${_selected ? 'checked' : ''}`}
        onClick={this._selectMenu}
      >
        <IoIosPeople />
        一标三实
        <span className="arrow arrow-right" />
        <ul className={`policedata${_selected ? '' : 'hidden'}`}>
          {options.map((item, index) => (
            <li
              className="data-item"
              key={index}
              onClick={e => this._datamap(index, item.map, e)}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // _selectMenu = () => {
  //   const { curIndex } = this.state;
  //   Event.emit(
  //     'change:curIndex',
  //     curIndex === menuItemIndex ? -1 : menuItemIndex
  //   );
  // };
  // _datamap = (index, map, e) => {
  //   e.stopPropagation();
  //   this.setState({ selectedOpt: index });
  //   for (let item of MapType) {

  //   }
  // };
}
