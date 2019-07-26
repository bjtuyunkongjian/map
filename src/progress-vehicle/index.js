/**
 * @author sl204984
 * @description 案件进度条
 */

import React, { Component } from 'react';
import { GlobalEvent, GloEventName } from 'tuyun-utils';

import ControlBtn from './control-btn';
import ProgressBar from './progress-bar';
import TimeProgress from './time-progress';

export default class ProgressVehicle extends Component {
  state = { vehicleTypes: [] };

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { vehicleTypes } = this.state;
    return (
      <div
        className={`progress-vehicle ${
          vehicleTypes.length > 0 ? '' : 'hidden'
        }`}
      >
        <ControlBtn />
        <ProgressBar />
        <TimeProgress />
      </div>
    );
  }

  _dealWithEvent = () => {
    const { changeProgressVehicle } = GloEventName;
    GlobalEvent.on(changeProgressVehicle, this._onChangeVehicleType);
  };

  _onChangeVehicleType = ({ vehicleTypes }) => {
    this.setState({ vehicleTypes });
  };
}
