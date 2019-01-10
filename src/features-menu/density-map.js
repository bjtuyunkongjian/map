import React, { Component } from 'react';
import { Event as GlobalEvent } from 'tuyun-utils';

export default class DensityMap extends Component {
  state = {
    enableDensityMap: false
  };

  componentDidMount = () => this._init();

  render() {
    const { enableDensityMap } = this.state;
    if (!enableDensityMap) return <div className="disabled-menu">密度图</div>;
    return <div className="menu-item">密度图</div>;
  }

  _init = () => {
    // 接收密度图
    GlobalEvent.on('change:FeaturesMenu:enableHeatDensity', enable => {
      this.setState({ enableDensityMap: enable });
      if (!enable) {
        // todo 清空当前layer
        _MAP_.getLayer(densityMapLayerId) &&
          _MAP_.removeLayer(densityMapLayerId).removeSource(densityMapLayerId);
      }
    });
  };
}

const densityMapLayerId = 'DENSITY_MAP_LAYER_ID';
