/**
 * @author sl204984
 * @description 两客一危模式选择
 */

import React, { Component } from 'react';
import { GlobalEvent, GloEventName } from 'tuyun-utils';

import CurrentMode from './current-mode';
import ModeOptions from './mode-options';
import Event, { EventName } from './event';
import VehicleAnimation from './vehicle-animation';
import { DefaultOpt } from './constant';

export default class ModeVehicle extends Component {
  state = {
    showUi: true,
    vehicleTypes: []
  };

  _isFirst = true; // 判断是否第一次
  _mode = DefaultOpt;
  _vehicleAnimates = []; // 车辆动画

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { vehicleTypes, showUi } = this.state;
    if (!vehicleTypes || !vehicleTypes.length || !showUi) return null;
    return (
      <div className="mode-vehicle">
        <CurrentMode />
        <ModeOptions />
      </div>
    );
  }

  _dealWithEvent = () => {
    Event.on(EventName.changeMode, this._onChangeMode);
    const { changeModeVehicle, toggleAllUi } = GloEventName;
    GlobalEvent.on(changeModeVehicle, this._onchangeModeVehicle);
    GlobalEvent.on(toggleAllUi, ({ visible }) => {
      this.setState({ showUi: visible });
    });
  };

  _onchangeModeVehicle = async ({ vehicleTypes }) => {
    this._unmountVehicleAni(); // 取消挂载
    await this.setState({ vehicleTypes });
    if (vehicleTypes.length === 0) {
      this._onChangeMode({ mode: DefaultOpt });
    } else {
      this._onChangeMode({ mode: this._mode });
    }
  };

  _onChangeMode = ({ mode }) => {
    this._mode = mode;
    const { changeProgressVehicle } = GloEventName;
    if (mode.value === 'cur') {
      GlobalEvent.emit(changeProgressVehicle, { vehicleTypes: [] });
      this._mountVehicleAni(); // 挂载
    } else if (mode.value === 'prev') {
      const { vehicleTypes } = this.state;
      GlobalEvent.emit(changeProgressVehicle, { vehicleTypes });
      this._unmountVehicleAni(); // 取消挂载
    }
  };

  _mountVehicleAni = () => {
    const { vehicleTypes } = this.state;
    this._vehicleAnimates = vehicleTypes.map(item => {
      return new VehicleAnimation(_MAP_, {
        fetchParam: `type=${item.type}`,
        vehicleLayer: layerPrefix + item.type,
        hslColor: item.hsl, // hsl 色值
        rgbColor: item.rgb,
        renderType: 'circle'
      });
    });
  };

  _unmountVehicleAni = () => {
    this._vehicleAnimates.map(item => item && item.unmount()); // 取消挂在
    this._vehicleAnimates = [];
  };
}

const layerPrefix = 'MODE_VEHICLE_';
