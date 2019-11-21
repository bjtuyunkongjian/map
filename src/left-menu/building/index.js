import React, { Component } from 'react';

import { IoIosPeople } from 'react-icons/io';

import { GlobalEvent, GloEventName, GlobalConst } from 'tuyun-utils';

export default class BuildingMenu extends Component {
  state = { selected: false };

  componentWillMount = () => this._init();

  render() {
    const { selected } = this.state;
    const _labelClass = `item-label ${selected ? ' selected' : ''}`;
    return (
      <div className="menu-item">
        <div className={_labelClass} onClick={this._clickPopulation}>
          <IoIosPeople />
          <div className="label-text">{building.label}</div>
          <div
            className="cell-color-sign"
            style={{ backgroundColor: building.color }}
          />
        </div>
      </div>
    );
  }

  _init = () => {
    const { closeTabView, toggleTabView } = GloEventName;
    GlobalEvent.on(closeTabView, () => {
      this.setState({ selected: false });
    });
    GlobalEvent.on(toggleTabView, ({ visible, tabName }) => {
      if (tabName !== building.value) {
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
      tabName: building.value,
      color: building.color
    });
  };
}

const { building } = GlobalConst.policeData;
