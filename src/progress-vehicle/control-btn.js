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
    caseType: ''
  };

  componentWillMount = () => this._dealWithEvent();
  componentDidMount = () => this._init();

  render() {
    const { isPlay, caseType } = this.state;
    if (!caseType) return null;
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
    const { changeSelectedCaseTendency } = GloEventName;
    GlobalEvent.on(changeSelectedCaseTendency, this._changeCaseType);
    Event.on(EventName.togglePlay, isPlay => {
      this.setState({ isPlay: isPlay });
    });
  };

  _init = () => {};

  _changeCaseType = caseType => {
    this.setState({ caseType });
  };

  _togglePlay = e => {
    e.stopPropagation();
    const { isPlay } = this.state;
    Event.emit(EventName.togglePlay, !isPlay);
  };
}
