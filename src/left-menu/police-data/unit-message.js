import React, { Component } from 'react';
import Event from '../event';
import { FaPeriscope } from 'react-icons/fa';
import { MdLocationCity } from 'react-icons/md';
import { MdPeopleOutline } from 'react-icons/md';
import { TiHomeOutline } from 'react-icons/ti';
import { FaTimes } from 'react-icons/fa';

import HousingStaff from './housing-staff';

export default class HouseMessage extends Component {
  state = {
    visible: true,
    boxLeft: '50%',
    boxTop: '50%',
    selectedHouseItem: undefined
  };

  componentDidMount = () => this._init();

  componentWillUnmount = () => this._reset();

  render() {
    const { visible, boxLeft, boxTop, selectedHouseItem } = this.state;
    if (!visible) return null;
    return (
      <div style={{ top: boxTop, left: boxLeft }} className="podata-popup">
        <div className="popup-title">
          <FaPeriscope className="icon-left" />
          <div className="title-text">地点 济南市历下区草山岭小区</div>
          <FaTimes className="close" onClick={this._clostHouse} />
        </div>

        <ul className="popup-detail">
          <li>
            <MdLocationCity className="icon-left" />
            楼栋信息：该楼共1单元 34层
          </li>
          <li>
            <TiHomeOutline className="icon-left" />
            建筑地址：济南市历下区草山岭小区9栋1单元
          </li>
          <li>
            <MdPeopleOutline className="icon-left" />
            <div>
              <div>常住：1220</div>
              <div>流动：223</div>
              <div>重点：5</div>
            </div>
          </li>
        </ul>

        <ul className="popup-explanation">
          <li>
            <div className="resident-pop" />
            <span>常住</span>
          </li>
          <li>
            <div className="floating-pop" />
            <span>流动</span>
          </li>
          <li>
            <div className="key-pop" />
            <span>重点人员</span>
          </li>
        </ul>

        <ul className="popup-list">
          {[1, 2, 3, 4, 5].map((item, index) => {
            const _selected = selectedHouseItem === item;

            return (
              <li
                className={`list-item ${_selected ? 'selected-item' : ''}`}
                key={`house_item_${index}`}
                onClick={() => this._selectHouseRoom(item)}
              >
                <div className="room-code">1-340030000</div>
                <div className="type-box">
                  <div className="pop-type resident-pop">1</div>
                  <div className="pop-type floating-pop">2</div>
                  <div className="pop-type key-pop">3</div>
                </div>
              </li>
            );
          })}
        </ul>

        {selectedHouseItem ? <HousingStaff /> : null}
      </div>
    );
  }

  _init = () => {
    console.log('init');
    // Event.on('showMessage', this._dealWithEvent);
  };

  _reset = () => {
    console.log('reset!');
    // Event.removeListener('showMessage', this._dealWithEvent);
  };

  _dealWithEvent = param => {
    const { left = 0, top = 0, value } = param;
    this.setState({
      boxLeft: left,
      boxTop: top,
      visible: true,
      information: value
    });
  };

  _clostHouse = () => {
    this.setState({
      visible: false
    });
  };

  _selectHouseRoom = option => {
    const { selectedHouseItem } = this.state;
    if (selectedHouseItem === option) {
      this.setState({ selectedHouseItem: undefined });
    } else {
      this.setState({ selectedHouseItem: option });
    }
  };
}
