/**
 * @author 郝艺红
 * @description 警情
 */

import React, { Component } from 'react';
import { IoIosCall } from 'react-icons/io';
import { GloEventName, GlobalEvent, GlobalConst } from 'tuyun-utils';

export default class PoliceSituation extends Component {
  state = { selected: false };

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { selected } = this.state;
    const _labelClass = `item-label ${selected ? ' selected' : ''}`;
    return (
      <div className="menu-item">
        <div className={_labelClass} onClick={this._clickSituation}>
          <IoIosCall />
          <div className="label-text">{poSituation.label}</div>
          <div
            className="cell-color-sign"
            style={{ backgroundColor: poSituation.color }}
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
      if (poSituation.value !== tabName) {
        this.setState({ selected: false });
      } else {
        this.setState({ selected: visible });
      }
    });
  };

  // 点击左侧警情，右侧出现警情弹框
  _clickSituation = async () => {
    const { selected } = this.state;
    const _selected = !selected;
    await this.setState({ selected: _selected });
    const { toggleTabView } = GloEventName;
    GlobalEvent.emit(toggleTabView, {
      visible: _selected,
      tabName: poSituation.value,
      color: poSituation.color
    });
  };
}

const color = '#65db42';
const { poSituation } = GlobalConst.policeData;
