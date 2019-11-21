import React, { Component } from 'react';
import { IoIosPeople } from 'react-icons/io';
import { GlobalEvent, GloEventName, GlobalConst } from 'tuyun-utils';

export default class Unit extends Component {
  state = { selected: false };

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { selected } = this.state;
    const _labelClass = `item-label ${selected ? ' selected' : ''}`;
    return (
      <div className="menu-item">
        <div className={_labelClass} onClick={this._clickPopulation}>
          <IoIosPeople />
          <div className="label-text">{unit.label}</div>
          <div
            className="cell-color-sign"
            style={{ backgroundColor: unit.color }}
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
      if (tabName !== unit.value) {
        this.setState({ selected: false });
      } else {
        this.setState({ selected: visible });
      }
    });
  };

  _clickPopulation = async () => {
    const { selected } = this.state;
    const _selected = !selected;
    const { toggleTabView } = GloEventName;
    GlobalEvent.emit(toggleTabView, {
      visible: _selected,
      tabName: unit.value,
      color: unit.color
    });
  };
}

const { unit } = GlobalConst.policeData;
