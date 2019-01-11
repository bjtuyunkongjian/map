/**
 * density map
 *  */
import React, { Component } from 'react';
import { Event as GlobalEvent } from 'tuyun-utils';
import { BaseConfig } from 'tuyun-config';
import MenuItems from './menu-items';
import Event from './event';

export default class DensityMap extends Component {
  state = {
    curMenu: -1,
    enableDensityMap: false
  };

  componentDidMount = () => this._init();

  render() {
    const { curMenu, enableDensityMap } = this.state;
    const _selected = curMenu === MenuItems.densityMap;
    if (!enableDensityMap) return <div className="disabled-menu">密度图</div>;
    return (
      <div
        className={`menu-item ${_selected ? 'checked' : ''}`}
        onClick={this._selectMenu}
      >
        密度图
      </div>
    );
  }

  _init = () => {
    // 接收密度图
    GlobalEvent.on('change:FeaturesMenu:enableHeatDensity', enable => {
      this.setState({ enableDensityMap: enable });
    });
    // 事件
    Event.on('change:curMenu', curMenu => {
      this.setState({ curMenu });
      // 添加或删除图层
      if (curMenu === MenuItems.densityMap) {
        _MAP_
          .addSource(densityMapSourceId, {
            type: 'vector',
            scheme: 'tms',
            tiles: [
              `${
                BaseConfig.geoserverHost
              }geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3APCSLayer@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`
            ]
          })
          .addLayer({
            id: densityMapLayerId,
            source: densityMapSourceId,
            'source-layer': 'FQ_JYGLFQ_PCS_PG1',
            type: 'fill',
            paint: {
              'fill-opacity': 0.4,
              'fill-color': '#ccc',
              'fill-antialias': false
            }
          });
      } else {
        _MAP_.getLayer(densityMapLayerId) &&
          _MAP_.removeLayer(densityMapLayerId).removeSource(densityMapSourceId);
      }
    });
  };

  _selectMenu = e => {
    e.stopPropagation();
    const { curMenu } = this.state;
    Event.emit(
      'change:curMenu',
      curMenu === MenuItems.densityMap ? -1 : MenuItems.densityMap
    );
  };
}

const densityMapSourceId = 'DENSITY_MAP_SOURCE_ID';
const densityMapLayerId = 'DENSITY_MAP_LAYER_ID';
