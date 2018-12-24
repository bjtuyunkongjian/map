/**
 * @author sl204984
 * 右上角菜单栏
 */

import React, { Component } from 'react';
// import CityInfo from './city-info';
import ViewOptions from './view-options';
import FilterOptions from './filter-options';
import MarkPlot from './mark-plot';
import FrameSelect from './frame-select';
import LineSelect from './line-select';
import ToolBox from './tool-box';
// 下拉项
// import CityList from './city-list'; // 选择城市的下拉列表
// import ElementLibrary from './element-library'; // 选择绘制的下拉列表
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
        {/* <CityInfo /> */}
        <ViewOptions />
        <FilterOptions />
        <MarkPlot />
        <FrameSelect />
        <LineSelect />
        <ToolBox />
        {/* <CityList /> */}
        {/* <ElementLibrary /> */}
      </div>
    );
  }

  _init = () => {
    _MAP_.on('mouseup', () => {
      Event.emit('change:curMenu', -1);
      GlobalEvent.emit('change:FeaturesMenu:visible', false);
    });
    GlobalEvent.on('change:FeaturesMenu:visible', visible => {
      !visible && Event.emit('change:curMenu', -1);
      this.setState({ visible });
    });
  };
}
