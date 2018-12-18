import React, { Component } from 'react';

import Event from '../event';
import { IoIosPeople } from 'react-icons/io';
import menuItems from 'src/top-menu/menu-items';
export default class PoliceData extends Component {
  // state = {
  //   curMenu: -1,
  //   selectedOpt: 0
  // };

  // componentDidMount() {
  //   Event.on('change:curMenu', curMenu => {
  //     console.log(curMenu);
  //     this.setState({ curMenu });
  //   });
  // }

  render() {
    // const { curMenu, selectedOpt } = this.state;
    // const _selected = curMenu === menuItems;
    return (
      <div className="menu-item">
        <IoIosPeople />
        一标三实
        <span className="arrow arrow-right" />
        {/* <ul className={`policedata`}>
          {['人口', '房屋', '单位'].map((item, index) => (
            <li
              className="data-item" */}
        >{/* {item.name} */}
        {/* </li>
          ))}
        </ul> */}
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
