/**
 * @author sl204984
 * @description 显示总时间，已播放的时间
 */

import React, { Component } from 'react';
import { GlobalEvent, GloEventName, FmtSeconds } from 'tuyun-utils';

import Event, { EventName } from './event';

export default class TimeProgress extends Component {
  state = {
    totalTime: '00:00',
    expiredTime: '00:00',
    vehicleTypes: []
  };

  componentWillMount = () => this._dealWithEvent();

  componentDidMount = () => this._init();

  render() {
    const { totalTime, expiredTime, vehicleTypes } = this.state;
    if (vehicleTypes.length <= 0) return null;
    return (
      <div className="time-progress">
        <span>{expiredTime}</span>/<span>{totalTime}</span>
      </div>
    );
  }

  _init = () => {};

  _dealWithEvent = () => {
    const { changeProgressVehicle } = GloEventName;

    GlobalEvent.on(changeProgressVehicle, this._changeVehicleType);

    Event.on(EventName.changeTotalTime, totalTime => {
      const _fmtTotalTime = FmtSeconds(totalTime);
      this.setState({ totalTime: _fmtTotalTime });
    });
    Event.on(EventName.changeExpiredTime, expiredTime => {
      const _fmtExpiredTime = FmtSeconds(expiredTime);
      this.setState({ expiredTime: _fmtExpiredTime });
    });
  };

  _changeVehicleType = ({ vehicleTypes }) => {
    this.setState({ vehicleTypes });
  };
}
