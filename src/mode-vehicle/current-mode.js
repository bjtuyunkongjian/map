/**
 * @author sl204984
 * @description 当前模式
 */

import React, { Component } from 'react';

import Event, { EventName } from './event';
import { DefaultOpt } from './constant';

export default class CurrentMode extends Component {
  state = {
    mode: DefaultOpt,
    selected: false
  };

  componentWillMount = () => this._dealWithEvent();
  componentWillUnmount = () => this._removeEvent();

  render() {
    const { mode, selected } = this.state;
    const _clsName = `current-mode ${selected ? 'selected' : ''}`;
    return (
      <div className={_clsName} onClick={this._toggleOpts}>
        {mode.brief}
      </div>
    );
  }

  _dealWithEvent = () => {
    Event.on(EventName.changeMode, this._onChangeMode);
  };

  _removeEvent = () => {
    Event.removeListener(EventName.changeMode, this._onChangeMode);
  };

  _onChangeMode = ({ mode }) => this.setState({ mode });

  _toggleOpts = () => {
    const { selected } = this.state;
    this.setState({ selected: !selected });
    Event.emit(EventName.toggleOptions, { visible: !selected });
  };
}
