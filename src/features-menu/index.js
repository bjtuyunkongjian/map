/**
 * @author sl204984
 * 右上角菜单栏
 */

import React, { Component } from 'react';
import ViewOptions from './view-options';
import FilterOptions from './filter-options';
import MarkPlot from './mark-plot';
import FrameSelect from './frame-select';
import LineSelect from './line-select';
import ToolBox from './tool-box';
// 事件
import Event from './event';
import { Event as GlobalEvent } from 'tuyun-utils';

export default class FeaturesMenu extends Component {
  state = { visible: false };

  componentDidMount() {
    this._init();
  }

  render() {
    const { visible } = this.state;
    // 父元素不可见，所有子元素也不可见
    return (
      <div className={`features-menu ${visible ? '' : 'hidden'}`}>
        <ViewOptions />
        <FilterOptions />
        <MarkPlot />
        <FrameSelect />
        <LineSelect />
        <ToolBox />
      </div>
    );
  }

  _init = () => {
    // _MAP_.on('mouseup', () => {
    //   // 添加点击事件
    //   Event.emit('change:curMenu', -1);
    //   GlobalEvent.emit('change:FeaturesMenu:visible', false);
    // });
    GlobalEvent.on('change:FeaturesMenu:visible', nextVisible => {
      if (nextVisible !== undefined) {
        this.setState({ visible: nextVisible });
        !nextVisible && Event.emit('change:curMenu', -1); // 下一步不可见，隐藏所有的子菜单
        return;
      }
      const { visible } = this.state; // visible 为当前是否可见
      visible && Event.emit('change:curMenu', -1); // 当前可见，下一步不可见，隐藏所有的子菜单
      this.setState({ visible: !visible });
    });
  };
}
