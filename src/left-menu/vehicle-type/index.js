/**
 * @author sl204984
 * @description 车辆类型 两客一危
 */

import React, { Component } from 'react';
import { IoMdBus, IoMdCheckmark } from 'react-icons/io';

export default class VehicleType extends Component {
  state = {
    expanded: false,
    selectedTasks: [],
    animate: 'hidden'
  };

  render() {
    const { selectedTasks, animate, expanded } = this.state;
    const _arrow = expanded ? 'arrow-down' : 'arrow-right';
    return (
      <div className="menu-item content">
        <div className="item-label" onClick={this._selectMenu}>
          <IoMdBus />
          <span>两客一危</span>
          <div className={`arrow-box ${expanded ? 'changed' : ''}`}>
            <span className={`arrow ${_arrow}`} />
          </div>
        </div>

        <ul className={`vehicle-type ${animate}`}>
          <li className="vehicle-item" onClick={e => this._selectAll(e)}>
            全部显示
          </li>
          {options.map((item, index) => {
            const _isChecked = selectedTasks.indexOf(item) > -1;
            return (
              <li
                className={`vehicle-item ${_isChecked ? 'checked' : ''}`}
                key={`work_option_${index}`}
                onClick={e => this._selectWork(item, e)}
              >
                <div className={`checkbox ${_isChecked ? 'checked' : ''}`}>
                  {_isChecked ? <IoMdCheckmark /> : null}
                </div>
                <div
                  className="color-sign"
                  style={{ backgroundColor: item.color }}
                />
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  _selectMenu = () => {
    const { expanded } = this.state;
    const _animate = !expanded ? 'menu-down' : 'menu-up';
    this.setState({
      expanded: !expanded,
      animate: _animate,
      selectedTasks: []
    }); // 修改 state
  };

  _selectAll = e => {
    e.stopPropagation();
    const { selectedTasks } = this.state;
    if (selectedTasks.length === options.length) {
      this.setState({ selectedTasks: [] });
    } else {
      this.setState({ selectedTasks: [...options] });
    }
  };

  _selectWork = (item, e) => {
    e.stopPropagation();
    const { selectedTasks } = this.state;
    const _taskInd = selectedTasks.indexOf(item);
    _taskInd > -1
      ? selectedTasks.splice(_taskInd, 1)
      : selectedTasks.push(item);
    this.setState({ selectedTasks });
  };
}

const options = [
  {
    value: 'within-provincial',
    name: '省内长途',
    color: '#EF9DA1',
    datasum: 'taskNum'
  },
  {
    value: 'cross-provincial',
    name: '跨省长途',
    color: '#9B5C8B',
    datasum: 'cluesNum'
  },
  {
    value: 'dangerous-vehicle',
    name: '危险车辆',
    color: '#3886CC',
    datasum: 'casesNum'
  }
];
