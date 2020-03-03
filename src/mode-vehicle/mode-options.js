/**
 * @author sl204984
 * @description 模式选项
 */

import React, { Component } from 'react';

import Event, { EventName } from './event';
import { OptArr } from './constant';

export default class ModeOptions extends Component {
  state = {
    visible: false,
    selectedMode: OptArr[0]
  };

  componentWillMount = () => this._dealWithEvent();
  componentDidMount = () => this._init();
  componentWillUnmount = () => this._removeEvent();

  render() {
    const { visible, selectedMode } = this.state;
    if (!visible) return null;
    return (
      <div className="mode-options">
        {OptArr.map((item, index) => {
          const _clsName = `opt-item ${
            selectedMode.value === item.value ? 'selected' : ''
          }`;
          return (
            <div
              className={_clsName}
              key={`opt_item_${index}`}
              onClick={e => this._selectMode(item, e)}
            >
              {item.label}
            </div>
          );
        })}
      </div>
    );
  }

  _init = () => {
    // Event.emit(EventName.changeMode, { mode: OptArr[0] });
  };

  _dealWithEvent = () => {
    Event.on(EventName.changeMode, this._onChangeMode);
    Event.on(EventName.toggleOptions, this._onToggleOptions);
  };

  _removeEvent = () => {
    Event.removeListener(EventName.changeMode, this._onChangeMode);
    Event.removeListener(EventName.toggleOptions, this._onToggleOptions);
  };

  _onChangeMode = ({ mode }) => {
    this.setState({ selectedMode: mode });
  };

  _onToggleOptions = ({ visible }) => {
    this.setState({ visible });
  };

  _selectMode = (item, e) => {
    e.stopPropagation();
    const { selectedMode } = this.state;
    if (selectedMode === item) return;
    Event.emit(EventName.changeMode, { mode: item });
  };
}
