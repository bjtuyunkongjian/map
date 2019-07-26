/**
 * @author 郝艺红
 * @description 一标三实
 */

import React, { Component } from 'react';
import { IoIosMail } from 'react-icons/io';
import { GloEventName, GlobalEvent } from 'tuyun-utils';

export default class PoliceCase extends Component {
  render() {
    return (
      <div className="menu-item">
        <div className="item-label" onClick={this._clickCase}>
          <IoIosMail />
          <span>案件</span>
          <div className="arrow-box">
            <span className="arrow arrow-right" />
          </div>
        </div>
      </div>
    );
  }

  _clickCase = () => {
    const { toggleLMPoliceData, toggleLinkage } = GloEventName;
    GlobalEvent.emit(toggleLinkage, { visible: true, tabName: 'case' }); // 显示右侧联动数据
    GlobalEvent.emit(toggleLMPoliceData, { expand: false, cancelEmit: true }); // 关闭一标三实
  };
}
