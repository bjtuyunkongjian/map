/**
 * @author sl204984
 * @description 控制按钮，控制开始、暂停
 */

import React, { Component } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { GlobalEvent, GloEventName } from 'tuyun-utils';

import Event, { EventName } from './event';

export default class ControlBtn extends Component {
  state = {
    isPlay: false,
    vehicleTypes: []
  };

  componentWillMount = () => this._dealWithEvent();
  componentDidMount = () => this._init();

  render() {
    const { isPlay, vehicleTypes } = this.state;
    if (vehicleTypes.length <= 0) return null;
    return (
      <div className="control-btn">
        {isPlay ? (
          <FaPause className="control-icon" onClick={this._togglePlay} />
        ) : (
          <FaPlay className="control-icon" onClick={this._togglePlay} />
        )}
      </div>
    );
  }

  _dealWithEvent = () => {
    const { changeProgressVehicle } = GloEventName;
    GlobalEvent.on(changeProgressVehicle, this._changeCaseType);
    Event.on(EventName.togglePlay, isPlay => {
      this.setState({ isPlay: isPlay });
    });
  };

  _init = () => {};

  _changeCaseType = ({ vehicleTypes }) => {
    this.setState({ vehicleTypes });
  };

  _togglePlay = e => {
    e.stopPropagation();
    const { isPlay } = this.state;
    Event.emit(EventName.togglePlay, !isPlay);
  };
}
