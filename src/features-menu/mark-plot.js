/**
 * @author sl204984
 * 标绘
 */

import React, { Component } from 'react';
import MenuItems from './menu-items';
import Event from './event';
import { Event as GlobalEvent } from 'tuyun-utils';

export default class LineSelect extends Component {
  state = {
    curMenu: -1
  };

  componentWillMount() {
    Event.on('change:curMenu', curMenu => {
      this.setState({ curMenu });
    });
  }

  render() {
    const { curMenu } = this.state;
    const _selected = curMenu === MenuItems.markPlot;

    return (
      <div
        className={`menu-item filter-options ${_selected ? 'checked' : ''}`}
        onClick={this._selectMenu}
      >
        标绘
      </div>
    );
  }

  _selectMenu = () => {
    const { curMenu } = this.state;
    GlobalEvent.emit('change:FeaturesMenu:visible', false);
    GlobalEvent.emit('change:ElementLibrary:visible');
  };
}
