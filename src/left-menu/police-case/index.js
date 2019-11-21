/**
 * @author 郝艺红
 * @description 案件
 */

import React, { Component } from 'react';
import { IoIosMail } from 'react-icons/io';
import { GloEventName, GlobalEvent, GlobalConst } from 'tuyun-utils';

export default class PoliceCase extends Component {
  state = { selected: false };

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { selected } = this.state;
    const _labelClass = `item-label ${selected ? ' selected' : ''}`;
    return (
      <div className="menu-item">
        <div className={_labelClass} onClick={this._clickCase}>
          <IoIosMail />
          <div className="label-text">{poCase.label}</div>
          <div
            className="cell-color-sign"
            style={{ backgroundColor: poCase.color }}
          />
        </div>
      </div>
    );
  }

  _dealWithEvent = () => {
    const { closeTabView, toggleTabView } = GloEventName;
    GlobalEvent.on(closeTabView, () => {
      this.setState({ selected: false });
    });
    GlobalEvent.on(toggleTabView, ({ visible, tabName }) => {
      if (tabName !== poCase.value) {
        this.setState({ selected: false });
      } else {
        this.setState({ selected: visible });
      }
    });
  };

  _clickCase = async () => {
    const { selected } = this.state;
    const _selected = !selected;
    const { toggleTabView } = GloEventName;
    GlobalEvent.emit(toggleTabView, {
      visible: _selected,
      tabName: poCase.value,
      color: poCase.color
    });
  };
}

const { poCase } = GlobalConst.policeData;
