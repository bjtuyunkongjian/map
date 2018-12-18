/**
 * @author sl204984
 * 右上角菜单栏
 */

import React, { Component } from 'react';
import CityInfo from './city-info';
import ViewOptions from './view-options';
import FilterOptions from './filter-options';
import FrameSelect from './frame-select';
import LineSelect from './line-select';
import ToolBox from './tool-box';

export default class TopMenu extends Component {
  render() {
    return (
      <div className="top-menu">
        <CityInfo />
        <ViewOptions />
        <FilterOptions />
        <FrameSelect />
        <LineSelect />
        <ToolBox />
      </div>
    );
  }
}
