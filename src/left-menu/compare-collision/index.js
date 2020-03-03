import React, { Component } from 'react';
import { IoIosGitCompare } from 'react-icons/io';
import { GlobalEvent, GloEventName } from 'tuyun-utils';

export default class CompareCollision extends Component {
  state = { selected: false };

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { selected } = this.state;
    const _labelClass = `item-label ${selected ? ' selected' : ''}`;
    return (
      <div className="menu-item">
        <div className={_labelClass} onClick={() => this._showCompare()}>
          <IoIosGitCompare />
          <div className="label-text">比对碰撞</div>
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

  _showCompare = async () => {
    const { selected: curSelect } = this.state;
    const _selected = !curSelect;
    await this.setState({ selected: _selected });
    const { showCompareTab } = GloEventName;
    GlobalEvent.emit(showCompareTab, { visible: _selected }); // 点击出现右侧比对碰撞弹框
  };
}
