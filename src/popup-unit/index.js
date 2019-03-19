import React, { Component } from 'react';
import { FaPeriscope } from 'react-icons/fa';
import { MdLocationCity } from 'react-icons/md';
import { MdPeopleOutline } from 'react-icons/md';
import { TiHomeOutline } from 'react-icons/ti';
import { FaTimes } from 'react-icons/fa';
import Event, { EventName } from 'tuyun-utils';

import HousingStaff from './housing-staff';

export default class UnitMessage extends Component {
  state = {
    visible: false,
    boxLeft: 0,
    boxTop: 0,
    lngLat: {},
    selectedItem: undefined
  };

  componentDidMount = () => this._init();

  componentWillUnmount = () => this._reset();

  render() {
    const { visible, boxLeft, boxTop, selectedItem } = this.state;
    if (!visible) return null;
    return (
      <div
        style={{ top: boxTop + 10, left: boxLeft + 10 }}
        className="podata-popup"
      >
        <div className="popup-title">
          <FaPeriscope className="icon-left" />
          <div className="title-text">地点 济南市历下区草山岭小区</div>
          <FaTimes className="close" onClick={this._clostPopup} />
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
            const _selected = selectedItem === item;

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

        {selectedItem ? <HousingStaff /> : null}
      </div>
    );
  }

  _init = () => {
    Event.on(EventName.showPoDataUnit, this._dealWithEvent);
    Event.on(EventName.closePoDataUnit, this._clostPopup);
  };

  _reset = () => {
    Event.removeListener(EventName.showPoDataUnit, this._dealWithEvent);
    Event.removeListener(EventName.closePoDataUnit, this._clostPopup);
  };

  _dealWithEvent = param => {
    const { visible, boxLeft, boxTop, lngLat } = param;
    this.setState({
      visible: visible,
      boxLeft: boxLeft,
      boxTop: boxTop,
      lngLat: lngLat
    });
    _MAP_.on('move', this._moveListener);
  };

  _clostPopup = () => {
    this.setState({ visible: false });
    _MAP_.off('move', this._moveListener);
  };

  _moveListener = () => {
    const { lngLat, visible } = this.state;
    if (!visible || !lngLat) return;
    const { x, y } = _MAP_.project(lngLat); // {lat, lng} => {x, y}
    this.setState({ boxLeft: x, boxTop: y });
  };

  _selectHouseRoom = option => {
    const { selectedItem } = this.state;
    if (selectedItem === option) {
      this.setState({ selectedItem: undefined });
    } else {
      this.setState({ selectedItem: option });
    }
  };
}
