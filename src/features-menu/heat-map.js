/**
 * Dynamic heat map
 *  */
import React, { Component } from 'react';
import { Event as GlobalEvent } from 'tuyun-utils';
import { BaseConfig } from 'tuyun-config';
import MenuItems from './menu-items';
import Event from './event';

export default class HeatMap extends Component {
  state = {
    curMenu: -1,
    enableHeatMap: false
  };

  componentDidMount = () => this._init();

  render() {
    const { curMenu, enableHeatMap } = this.state;
    const _selected = curMenu === MenuItems.heatMap;
    if (!enableHeatMap) return <div className="disabled-menu">动态热力图</div>;
    return (
      <div
        className={`menu-item ${_selected ? 'checked' : ''}`}
        onClick={this._selectMenu}
      >
        动态热力图
      </div>
    );
  }

  _init = () => {
    _MAP_.on('click', heatMapLayerId, e => console.log(e.features));
    GlobalEvent.on('change:FeaturesMenu:enableHeatDensity', enable => {
      this.setState({ enableHeatMap: enable });
    });
    // 事件
    Event.on('change:curMenu', curMenu => {
      this.setState({ curMenu });
      // 添加或删除图层
      if (curMenu === MenuItems.heatMap) {
        _MAP_
          .addSource(heatMapSourceId, {
            type: 'vector',
            scheme: 'tms',
            tiles: [
              `${
                BaseConfig.geoserverHost
              }geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3APCSLayer@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`
            ]
          })
          .addLayer({
            id: heatMapLayerId,
            source: heatMapSourceId,
            'source-layer': 'FQ_JYGLFQ_PCS_PG1',
            type: 'fill',
            paint: {
              'fill-opacity': 0.4,
              'fill-color': '#ccc',
              'fill-antialias': false
            }
          });
      } else {
        _MAP_.getLayer(heatMapLayerId) &&
          _MAP_.removeLayer(heatMapLayerId).removeSource(heatMapSourceId);
      }
    });
  };

  _selectMenu = e => {
    e.stopPropagation();
    const { curMenu } = this.state;
    Event.emit(
      'change:curMenu',
      curMenu === MenuItems.heatMap ? -1 : MenuItems.heatMap
    );
  };
}

const heatMapSourceId = 'HEAT_MAP_SOURCE_ID';
const heatMapLayerId = 'HEAT_MAP_LAYER_ID';
