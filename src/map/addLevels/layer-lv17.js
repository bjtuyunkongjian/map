/* 
17级图层，显示的内容主要分：
1.16级图层中剩余的区县政府机关
2.16级图层中加油加气
3.POI详情
4.小区
5.小学
6.电器商场
*/

import {
  levelConfig
} from 'tuyun-config';

const _visibleLevel = 17;

const style = {
  visibleLevel: _visibleLevel,
  source: {
    [levelConfig.addLv17]: {
      type: 'vector',
      scheme: 'tms',
      tiles: ['http://116.62.186.152:8080/geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ASD_17L@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf'],
      minzoom: _visibleLevel
    }
  },
  layers: [{
    id: 'POI_LEVEL_17_1108',
    type: 'symbol',
    source: levelConfig.addLv17,
    'source-layer': 'POI_LEVEL_17_1108',
    'layout': {
      'text-field': '{NAME}',
      'visibility': 'visible',
      'symbol-placement': 'point',
      'text-size': 10,
      'text-padding': 4,
      'icon-image': 'ic_map_{KIND}',
      'text-justify': 'left',
      'text-anchor': 'left',
      'text-offset': [0.8, 0],
      'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport'
    },
    'paint': {
      'text-color': 'rgba(65, 65, 65, 1)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  }]
}

export default style;