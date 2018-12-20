/**
 * @author sl204984
 * 右上角菜单栏
 */

import React, { Component } from 'react';
import CityInfo from './city-info';
import ViewOptions from './view-options';
import FilterOptions from './filter-options';
import MarkPlot from './mark-plot';
import FrameSelect from './frame-select';
import LineSelect from './line-select';
import ToolBox from './tool-box';
// 下拉项
import CityList from './city-list'; // 选择城市的下拉列表
import ElementLibrary from './element-library'; // 选择绘制的下拉列表
// 事件
import Event from './event';

export default class TopMenu extends Component {
  componentDidMount() {
    _MAP_.on('mouseup', e => {
      Event.emit('change:curMenu', -1);
    });
  }

  render() {
    return (
      <div className="top-menu">
        <CityInfo />
        <ViewOptions />
        <FilterOptions />
        <MarkPlot />
        <FrameSelect />
        <LineSelect />
        <ToolBox />
        <CityList />
        <ElementLibrary />
      </div>
    );
  }
}
