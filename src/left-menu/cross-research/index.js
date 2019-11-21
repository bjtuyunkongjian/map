import React, { Component } from 'react';
import { FiDatabase } from 'react-icons/fi';
import { GlobalEvent, GloEventName } from 'tuyun-utils';

export default class CrossResearch extends Component {
  state = { selected: false };

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { selected } = this.state;
    const _labelClass = `item-label ${selected ? ' selected' : ''}`;
    return (
      <div className="menu-item">
        <div className={_labelClass} onClick={() => this._showCross()}>
          <FiDatabase />
          <div className="label-text">交叉研判</div>
        </div>
      </div>
    );
  }

  _dealWithEvent = () => {
    const { closeCompareTab } = GloEventName;
    GlobalEvent.on(closeCompareTab, () => {
      this.setState({ selected: false });
    });
  };

  _showCross = async () => {
    const { selected: curSelect } = this.state;
    const _selected = !curSelect;
    await this.setState({ selected: _selected });
    const { showCrossTab } = GloEventName;
    GlobalEvent.emit(showCrossTab, { visible: _selected }); // 点击出现右侧比对碰撞弹框
  };
}
