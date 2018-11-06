/**
 * @author sl 2019-01-02
 */
import {
  levelConfig
} from 'tuyun-config';

const _visibleLevel = 12;

const style = {
  visibleLevel: _visibleLevel,
  source: {
    [levelConfig.addLv12]: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        'http://116.62.186.152:8080/geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ASD_12L@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf'
      ],
      minzoom: _visibleLevel
    }
  },
  layers: [{
    id: 'POI_LEVEL_12_chaoshi', // 小商品城、百货商店、超市
    type: 'symbol',
    source: levelConfig.addLv12,
    'source-layer': 'POI_LEVEL_12',
    filter: ['any',
      ['==', 'KIND', '130101'],
      ['==', 'KIND', '130102'],
      ['==', 'KIND', '130106']
    ],
    'layout': {
      'text-field': '{NAME}',
      'visibility': 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_chaoshi',
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
  }, {
    id: 'POI_LEVEL_12_yaodian', // 药店
    type: 'symbol',
    source: levelConfig.addLv12,
    'source-layer': 'POI_LEVEL_12',
    filter: ['==', 'KIND', '130501'],
    'layout': {
      'text-field': '{NAME}',
      'visibility': 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_yaodian',
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
  }, {
    id: 'POI_LEVEL_12_bank', // 银行
    type: 'symbol',
    source: levelConfig.addLv12,
    'source-layer': 'POI_LEVEL_12',
    filter: ['==', 'KIND', '130501'],
    'layout': {
      'text-field': '{NAME}',
      'visibility': 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_bank',
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
  }, {
    id: 'POI_LEVEL_12_university', // 大学
    type: 'symbol',
    source: levelConfig.addLv12,
    'source-layer': 'POI_LEVEL_12',
    filter: ['==', 'KIND', '160105'],
    'layout': {
      'text-field': '{NAME}',
      'visibility': 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_university',
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
  }, ]
};

export default style;