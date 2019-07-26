import React, { Component } from 'react';
import { GlobalEvent, GloEventName, GlobalConst } from 'tuyun-utils';

import Event, { EventName } from '../event';

export default class UnitOption extends Component {
  state = {
    isChecked: false
  };

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { isChecked } = this.state;
    return (
      <li
        className={`data-item ${isChecked ? 'checked' : ''}`}
        onClick={this._selectUnitData}
      >
        {unitOption.name}
      </li>
    );
  }

  _dealWithEvent = () => {
    Event.on(EventName.changePoDataChecked, ({ selectedOpt }) => {
      const { isChecked } = this.state;
      let _isChecked;
      if (isChecked) {
        _isChecked = false; // 之前选中，当前设置为未选中
      } else {
        _isChecked = unitOption === selectedOpt; // 之前未选中，当前根据 selectedOpt 进行判断
      }
      this.setState({ isChecked: _isChecked });
    });
  };

  _selectUnitData = () => {
    const { isChecked } = this.state;
    Event.emit(EventName.changePoDataChecked, { selectedOpt: unitOption });
    GlobalEvent.emit(GloEventName.toggleLinkage, {
      visible: !isChecked,
      tabName: 'unit'
    }); // 显示右侧联动数据
  };
}

const { unitOption } = GlobalConst.policeData;
