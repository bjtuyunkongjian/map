/**
 * @author sl204984
 * 标绘
 */

import React, { Component } from 'react';
import { GlobalEvent, GloEventName } from 'tuyun-utils';

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
    GlobalEvent.emit(GloEventName.toggleFeaturesMenu, false);
    GlobalEvent.emit('change:ElementLibrary:visible');
  };
}
