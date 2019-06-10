/**
 * @author sl204984
 * @description 案件进度条
 */

import React, { Component } from 'react';
import { GlobalEvent, GloEventName } from 'tuyun-utils';

import ControlBtn from './control-btn';
import ProgressBar from './progress-bar';
import TimeProgress from './time-progress';
import ProgressSettings from './progress-settings';

export default class ProgressCase extends Component {
  state = { caseType: '' };

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { caseType } = this.state;
    return (
      <div className={`progress-case ${!caseType ? 'hidden' : ''}`}>
        <ControlBtn />
        <ProgressBar />
        <TimeProgress />
        <ProgressSettings />
      </div>
    );
  }

  _dealWithEvent = () => {
    const { changeSelectedCaseTendency } = GloEventName;
    GlobalEvent.on(changeSelectedCaseTendency, this._changeCaseType);
  };

  _changeCaseType = caseType => {
    this.setState({ caseType });
  };
}
