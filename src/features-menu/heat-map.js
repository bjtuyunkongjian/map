/**
 * Dynamic heat map
 *  */
import React, { Component } from 'react';
import { Event as GlobalEvent, AddLevel } from 'tuyun-utils';

export default class HeatMap extends Component {
  state = {
    enableHeatMap: false
  };

  componentDidMount = () => this._init();

  render() {
    const { enableHeatMap } = this.state;
    if (!enableHeatMap) return <div className="disabled-menu">动态热力图</div>;
    return <div className="menu-item">动态热力图</div>;
  }

  _init = () => {
    GlobalEvent.on('change:FeaturesMenu:enableHeatDensity', enable => {
      this.setState({ enableHeatMap: enable });
      if (!enable) {
        // todo 清空当前layer
        _MAP_.getLayer(heatMapLayerId) &&
          _MAP_.removeLayer(heatMapLayerId).removeSource(heatMapLayerId);
      }
    });
  };
}

const heatMapLayerId = 'HEAT_MAP_LAYER_ID';
