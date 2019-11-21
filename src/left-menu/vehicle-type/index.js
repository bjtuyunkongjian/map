/**
 * @author sl204984
 * @description 车辆类型 两客一危
 */

import React, { Component } from 'react';
import { IoMdBus, IoMdCheckmark } from 'react-icons/io';
import { GlobalEvent, GloEventName } from 'tuyun-utils';

import { TypeOptions } from './constant';

export default class VehicleType extends Component {
  state = {
    expanded: false,
    selectedTypes: [],
    animate: 'hidden'
  };

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { selectedTypes, animate, expanded } = this.state;
    const _arrow = expanded ? 'arrow-down' : 'arrow-right';
    const _labelCls = `item-label${expanded ? ' selected' : ''}`;
    return (
      <div className="menu-item content">
        <div className={_labelCls} onClick={this._selectMenu}>
          <IoMdBus />
          <div className="label-text">两客一危</div>
          <div className={`arrow-box ${expanded ? 'changed' : ''}`}>
            <span className={`arrow ${_arrow}`} />
          </div>
        </div>

        <ul className={`vehicle-type ${animate}`}>
          {/* <li className="vehicle-item" onClick={e => this._selectAll(e)}>
            全部显示
          </li> */}
          {TypeOptions.map((item, index) => {
            const _isChecked = selectedTypes.indexOf(item) > -1;
            const { rgb } = item;
            return (
              <li
                className={`item-cell ${_isChecked ? 'checked' : ''}`}
                key={`work_option_${index}`}
                onClick={e => this._selectWork(item, e)}
              >
                <div className={`checkbox ${_isChecked ? 'checked' : ''}`}>
                  {_isChecked ? <IoMdCheckmark /> : null}
                </div>
                <div className="cell-label-text">{item.name}</div>
                <div
                  className="cell-color-sign"
                  style={{
                    backgroundColor: `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  _dealWithEvent = () => {
    const { changeLMVehicleType } = GloEventName;
    GlobalEvent.on(changeLMVehicleType, this._onChangeVehicleType);
  };

  _onChangeVehicleType = async ({ expand, selectedTypes = [] } = {}) => {
    const { expanded } = this.state;
    if (expanded !== !!expand) {
      const _animate = !expanded ? 'menu-down' : 'menu-up';
      await this.setState({
        expanded: !!expand,
        animate: _animate,
        selectedTypes
      });
    } else {
      await this.setState({ selectedTypes });
    }
  };

  _selectMenu = async () => {
    const { expanded } = this.state;
    const _animate = !expanded ? 'menu-down' : 'menu-up';
    // const _tplName = expanded ? '服务民生' : '侦察打击';
    // GlobalEvent.emit(GloEventName.changeMapTemplate, _tplName); // 切换模板
    await this.setState({
      expanded: !expanded,
      animate: _animate,
      selectedTypes: []
    }); // 修改 state
    this._emitSelectedType();
    GlobalEvent.emit(GloEventName.closeTabView); // 人口/单位/房屋/案件/警情弹框消失
    GlobalEvent.emit(GloEventName.closeJurisdictionData); // 关闭辖区数据
    GlobalEvent.emit(GloEventName.closeCompareTab); // 关闭比对碰撞
  };

  _selectAll = async e => {
    e.stopPropagation();
    const { selectedTypes } = this.state;
    let _selectedTypes =
      selectedTypes.length === TypeOptions.length ? [] : [...TypeOptions];
    await this.setState({ selectedTypes: _selectedTypes });
    this._emitSelectedType();
  };

  _selectWork = async (item, e) => {
    e.stopPropagation();
    const { selectedTypes } = this.state;
    const _taskInd = selectedTypes.indexOf(item);
    _taskInd > -1
      ? selectedTypes.splice(_taskInd, 1)
      : selectedTypes.push(item);
    await this.setState({ selectedTypes });
    this._emitSelectedType();
  };

  _emitSelectedType = () => {
    const { selectedTypes } = this.state;
    const { changeModeVehicle } = GloEventName;
    GlobalEvent.emit(changeModeVehicle, { vehicleTypes: selectedTypes }); // 修改进度条
  };
}
