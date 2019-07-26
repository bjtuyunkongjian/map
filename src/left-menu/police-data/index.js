/**
 * @author 郝艺红
 * @description 一标三实
 */

import React, { Component } from 'react';
import { IoIosPeople } from 'react-icons/io';
import { GlobalEvent, GloEventName, CheckType } from 'tuyun-utils';

import PopOption from './pop-option';
import UnitOption from './unit-option';
import HouseOption from './house-option';

import Event, { EventName } from '../event';

export default class PoliceData extends Component {
  state = {
    expanded: false,
    animate: 'hidden'
  };

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { expanded, animate } = this.state;
    const _arrow = expanded ? 'arrow-down' : 'arrow-right';
    return (
      <div className="menu-item police-data">
        <div className="item-label data" onClick={this._selectMenu}>
          <IoIosPeople />
          <span>一标三实</span>
          <div className={`arrow-box ${expanded ? 'changed' : ''}`}>
            <span className={`arrow ${_arrow}`} />
          </div>
        </div>
        <ul className={`data-container ${animate}`}>
          <PopOption />
          <UnitOption />
          <HouseOption />
        </ul>
      </div>
    );
  }

  _dealWithEvent = () => {
    const { toggleLMPoliceData } = GloEventName;
    GlobalEvent.on(toggleLMPoliceData, this._onTogglePoliceData);
  };

  _onTogglePoliceData = ({ expand, selectedOpt = {}, cancelEmit } = {}) => {
    const { expanded } = this.state;
    if (CheckType(expand) === 'boolean' && expanded !== expand) {
      const _animate = expand ? 'menu-down' : 'menu-up';
      this.setState({ expanded: expand, animate: _animate }); // 修改 state
    }
    Event.emit(EventName.changePoDataChecked, { selectedOpt }); // 切换选中状态
    !cancelEmit && GlobalEvent.emit(GloEventName.toggleLinkage, {}); // 右侧联动数据
  };

  // 发送菜单改变事件
  _selectMenu = () => {
    const { expanded } = this.state;
    const _animate = !expanded ? 'menu-down' : 'menu-up';
    this.setState({ expanded: !expanded, animate: _animate }); // 修改 state
    // 之前展开，现在关闭
    // if (expanded) {
    //   GlobalEvent.emit(GloEventName.toggleLinkage, {});
    //   Event.emit(EventName.changePoDataChecked, { selectedOpt: {} });
    // } else
    if (!expanded) {
      const { changeLMVehicleType } = GloEventName;
      GlobalEvent.emit(changeLMVehicleType, {});
    }
  };
}
