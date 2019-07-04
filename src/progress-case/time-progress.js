/**
 * @author sl204984
 * @description 显示总时间，已播放的时间
 */

import React, { Component } from 'react';
import { GlobalEvent, GloEventName } from 'tuyun-utils';

import Event, { EventName } from './event';
import FmtSeconds from './fmt-seconds'; // 格式化秒

export default class TimeProgress extends Component {
  state = {
    totalTime: '00:00',
    expiredTime: '00:00',
    caseType: ''
  };

  componentWillMount = () => this._dealWithEvent();

  componentDidMount = () => this._init();

  render() {
    const { totalTime, expiredTime, caseType } = this.state;
    if (!caseType) return null;
    return (
      <div className="time-progress">
        <span>{expiredTime}</span>/<span>{totalTime}</span>
      </div>
    );
  }

  _init = () => {};

  _dealWithEvent = () => {
    const { changeSelectedCaseTendency } = GloEventName;
    GlobalEvent.on(changeSelectedCaseTendency, this._changeCaseType);
    Event.on(EventName.changeTotalTime, totalTime => {
      const _fmtTotalTime = FmtSeconds(totalTime);
      this.setState({ totalTime: _fmtTotalTime });
    });
    Event.on(EventName.changeExpiredTime, expiredTime => {
      const _fmtExpiredTime = FmtSeconds(expiredTime);
      this.setState({ expiredTime: _fmtExpiredTime });
    });
  };

  _changeCaseType = caseType => {
    this.setState({ caseType });
  };
}
