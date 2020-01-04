/**
 * @author hao
 * @description 控制按钮，控制开始、暂停
 */

import React, { Component } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';
import { GlobalEvent, GloEventName } from 'tuyun-utils';

import Event, { EventName } from './event';

export default class ControlBtn extends Component {
  state = {
    isPlay: false,
    policeType: ''
  };

  componentWillMount = () => this._dealWithEvent();
  componentDidMount = () => this._init();

  render() {
    const { isPlay, policeType } = this.state;
    if (!policeType) return null;
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
    const { changeSelectedSituationTendency } = GloEventName;
    GlobalEvent.on(changeSelectedSituationTendency, this._changeSituType);
    Event.on(EventName.togglePlay, isPlay => {
      this.setState({ isPlay: isPlay });
    });
  };

  _init = () => {};

  _changeSituType = policeType => {
    this.setState({ policeType });
  };

  _togglePlay = e => {
    e.stopPropagation();
    const { isPlay } = this.state;
    Event.emit(EventName.togglePlay, !isPlay);
  };
}
