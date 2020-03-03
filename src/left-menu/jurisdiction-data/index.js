import React, { Component } from 'react';
import { IoIosGrid } from 'react-icons/io';
import { GlobalEvent, GloEventName } from 'tuyun-utils';

export default class JurisdictionData extends Component {
  state = { selected: false };

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { selected } = this.state;
    const _labelClass = `item-label ${selected ? ' selected' : ''}`;
    return (
      <div className="menu-item">
        <div className={_labelClass} onClick={() => this._onClick()}>
          <IoIosGrid />
          <div className="label-text">辖区数据</div>
        </div>
      </div>
    );
  }

  _dealWithEvent = () => {
    const { closeJurisdictionData } = GloEventName;
    GlobalEvent.on(closeJurisdictionData, () => {
      this.setState({ selected: false });
    });
  };

  _onClick = async () => {
    const { selected: curSelect } = this.state;
    const _selected = !curSelect;
    await this.setState({ selected: _selected });
    const { showJurisdictionData } = GloEventName;
    GlobalEvent.emit(showJurisdictionData, { visible: _selected }); // 点击出现右侧比对碰撞弹框
  };
}
