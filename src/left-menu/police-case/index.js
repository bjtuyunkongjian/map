/**
 * @author 郝艺红
 * @description 一标三实
 */

import React, { Component } from 'react';
import { IoIosMail } from 'react-icons/io';
import { GloEventName, GlobalEvent } from 'tuyun-utils';

import CaseDetail from './case-message';

import Event from '../event';
import { MenuItems } from '../constant';

export default class PoliceCase extends Component {
  state = {
    curMenu: -1
  };

  componentWillMount = () => this._dealWithEvent();
  componentDidMount = () => this._init();

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

        {/* 案件详情 */}
        <CaseDetail />
      </div>
    );
  }

  // 点击事件 切换菜单以及弹出框
  _dealWithEvent = () => {
    Event.on('change:curMenu', async nextMenu => {
      const { curMenu } = this.state;
      if (curMenu === nextMenu) return;
      await this.setState({ curMenu: nextMenu });
    });
  };

  _init = () => {};

  _clickCase = () => {
    GlobalEvent.emit(GloEventName.toggleLinkage, { visible: true }); // 显示右侧联动数据
    GlobalEvent.emit(GloEventName.toggleLinkageTab, { tabName: 'case' }); // 显示右侧联动数据房屋
    Event.emit('change:curMenu', MenuItems.caseOption);
  };
}
