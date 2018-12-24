import React, { Component } from 'react';
import Event from './event';
import { IoIosCar } from 'react-icons/io';
import MenuItem from './menu-item';
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
    const _slide = _selected ? 'menu-dis' : 'menu-apr';
    return (
      <div className="menu-item">
        <div className="item-label" onClick={`${this._selectTrack}`}>
          <IoIosCar />
          车辆
          <div className={`arrow-box ${_selected ? 'changed' : ''}`}>
            <span className={`arrow arrow-right ${_arrow}`} />
          </div>
          <li className={`import-car ${_selected ? '' : 'hidden'}`}>
            重大安保路线
          </li>
        </div>
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
}
