/* 
  18级图层 
  18-22图层每个图层显示的内容都是一样的，每个图层按20%逐级推近显示
*/

import { levelConfig } from 'tuyun-config';

const _visibleLevel = 18;

const style = {
  visibleLevel: _visibleLevel,
  source: {
    [levelConfig.addLv18]: {
      type: 'vector',
      scheme: 'tms',
      tiles: ['http://116.62.186.152:8080/geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ASD_18L@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf'],
      minzoom: _visibleLevel,
    }
  },
  layers: [
    {
      id: '18L_JX',
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '160109'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': '',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      }
    }
  ]
};

export default style;