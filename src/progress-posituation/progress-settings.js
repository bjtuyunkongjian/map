import React, { Component } from 'react';
import { MdSettings } from 'react-icons/md';
import { GlobalEvent, GloEventName } from 'tuyun-utils';

import Event, { EventName } from './event';

export default class ProgressSettings extends Component {
  state = {
    policeType: '',
    showSettings: false, // 显示所有设置
    selectedSpeed: speedArr[2]
  };

  componentWillMount = () => this._dealWithEvent();
  componentDidMount = () => this._init();

  render() {
    const { policeType, showSettings } = this.state;
    if (!policeType) return null;
    const _speedOpts = showSettings ? this._createSpeedOpts() : null;
    return (
      <div className="progress-settings">
        <MdSettings className="settings-icon" onClick={this._onClickSettings} />
        {_speedOpts}
      </div>
    );
  }

  _dealWithEvent = () => {
    const { changeSelectedSituationTendency } = GloEventName;
    GlobalEvent.on(changeSelectedSituationTendency, this._changePoliceType);
  };

  _init = () => {
    const { selectedSpeed } = this.state;
    Event.emit(EventName.changeSettingsSpeed, { fps: selectedSpeed.fps });
  };

  _changePoliceType = policeType => {
    if (!policeType) {
      this.setState({ policeType, showSettings: false });
    } else {
      this.setState({ policeType });
    }
  };

  _onClickSettings = () => {
    const { showSettings } = this.state;
    this.setState({ showSettings: !showSettings });
  };

  _createSpeedOpts = () => {
    const { selectedSpeed } = this.state;
    return (
      <div className="settings-detail">
        <div className="settings-label">速度选择：</div>
        <ul className="speed-select">
          {speedArr.map((item, index) => (
            <li
              key={`settings_detail_${index}`}
              className={
                item.value === selectedSpeed.value
                  ? 'speed-option selected'
                  : 'speed-option'
              }
              onClick={() => this._selectSpeed(item)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  _selectSpeed = item => {
    const { fps } = item;
    this.setState({ selectedSpeed: item });
    Event.emit(EventName.changeSettingsSpeed, { fps: fps });
  };
}

const speedArr = [
  { label: '慢速', value: 'slow', fps: 0.5 },
  { label: '中速', value: 'middle', fps: 1 },
  { label: '快速', value: 'false', fps: 3 },
  { label: '高速', value: 'high', fps: 7 }
];
