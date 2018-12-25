import React, { Component } from 'react';
import Event from './event';
import { IoIosCar } from 'react-icons/io';
import MenuItem from './menu-item';
import { IoIosAddCircleOutline } from 'react-icons/io';
export default class PoliceCar extends Component {
  state = {
    curMenu: -1,
    selectedOpt: 0
  };
  componentDidMount() {
    Event.on('change:curMenu', curMenu => {
      this.setState({ curMenu });
    });
  }

  render() {
    const { curMenu, selectedOpt } = this.state;
    const _selected = curMenu === MenuItem.carOption;
    const _arrow = _selected ? 'arrow-down' : 'arrow-right';
    const _slide = _selected ? 'menu-apr' : 'menu-dis';
    return (
      <div className="menu-item">
        <div className="item-label" onClick={this._selectTrack}>
          <IoIosCar />
          车辆
          <div className={`arrow-box ${_selected ? 'changed' : ''}`}>
            <span className={`arrow ${_arrow}`} />
          </div>
        </div>
        <ul
          className={`track-container ${_selected ? '' : 'hidden'} ${_slide}`}
        >
          {options.map((item, index) => (
            <li
              className={`track-item ${selectedOpt === index ? 'checked' : ''}`}
              key={`data_option_${index}`}
              onClick={e => this._checkTrack(item, index, e)}
            >
              {item.icon}
              {item.name}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  _selectTrack = () => {
    const { curMenu } = this.state;
    Event.emit(
      'change:curMenu',
      curMenu === MenuItem.carOption ? -1 : MenuItem.carOption
    );
  };
  _checkTrack = (item, index, e) => {
    e.stopPropagation();
    this.setState({ selectedOpt: index });
  };
}

const options = [
  { value: 0, name: '重大安保路线', icon: <IoIosAddCircleOutline /> }
];
