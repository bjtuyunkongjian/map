/**
 * @author sl204984
 * @description 警情进度条
 */

import React, { Component } from 'react';
import { GlobalEvent, GloEventName } from 'tuyun-utils';

import ControlBtn from './control-btn';
import ProgressBar from './progress-bar';
import TimeProgress from './time-progress';
import ProgressSettings from './progress-settings';

export default class ProgressCase extends Component {
  state = { policeType: '', showUi: true };

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { policeType, showUi } = this.state;
    return (
      <div className={`progress-case ${showUi && policeType ? '' : 'hidden'}`}>
        <ControlBtn />
        <ProgressBar />
        <TimeProgress />
        <ProgressSettings />
      </div>
    );
  }

  _dealWithEvent = () => {
    const { changeSelectedSituationTendency, toggleAllUi } = GloEventName;
    GlobalEvent.on(changeSelectedSituationTendency, this._changePoliceType);
    GlobalEvent.on(toggleAllUi, ({ visible }) => {
      this.setState({ showUi: visible });
    });
  };

  _changePoliceType = policeType => {
    this.setState({ policeType });
  };
}
