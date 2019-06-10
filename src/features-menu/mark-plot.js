/**
 * @author sl204984
 * 标绘
 */

import React, { Component } from 'react';
import MenuItems from './menu-items';
import Event from './event';
import { Event as GlobalEvent, EventName as GloEventName } from 'tuyun-utils';

export default class LineSelect extends Component {
  render() {
    return (
      <div className="menu-item filter-options" onClick={this._selectMenu}>
        标绘
      </div>
    );
  }

  _selectMenu = e => {
    e.stopPropagation();
    GlobalEvent.emit(GloEventName.toggleFeMenu, false);
    GlobalEvent.emit('change:ElementLibrary:visible');
  };
}
