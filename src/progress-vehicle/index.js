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
  state = { vehicleTypes: [], showUi: true };

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { vehicleTypes, showUi } = this.state;
    return (
      <div
        className={`progress-vehicle ${
          vehicleTypes.length > 0 && showUi ? '' : 'hidden'
        }`}
      >
        <ControlBtn />
        <ProgressBar />
        <TimeProgress />
      </div>
    );
  }

  _dealWithEvent = () => {
    const { changeProgressVehicle, toggleAllUi } = GloEventName;
    GlobalEvent.on(changeProgressVehicle, this._onChangeVehicleType);
    GlobalEvent.on(toggleAllUi, ({ visible }) => {
      this.setState({ showUi: visible });
    });
  };

  _onChangeVehicleType = ({ vehicleTypes }) => {
    this.setState({ vehicleTypes });
  };
}
