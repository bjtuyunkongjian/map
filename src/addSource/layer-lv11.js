/**
 * @author sl 2019-01-02
 * 11级，包括公园，医院
 */
import CONFIG from '../config';

const _visibleLevel = 11;
const _roadVisibleLv = 11;

const style = {
  visibleLevel: 11,
  source: {
    [CONFIG.addLv11]: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        'http://116.62.186.152:8080/geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ASD_11L@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf'
      ],
      minzoom: _visibleLevel
    },
  },
  layers: [{
    id: 'GROLAN_11_1009_bg', // 路网图层（name字段），次干道、县道
    type: 'line',
    source: CONFIG.addLv11,
    'source-layer': 'GROLAN_11_1009',
    minzoom: _roadVisibleLv,
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-width': {
        'base': 2,
        'stops': [
          [11, 3],
          [12, 6],
          [13, 8],
          [14, 8],
          [15, 9],
          [16, 9],
          [17, 11],
          [18, 13],
          [19, 13],
          [20, 21]
        ]
      },
      'line-color': '#d8d8d8'
    },
    labelLayerId: 'GRAILN_bg'
  }, {
    id: 'GROLAN_11_1009', // 路网图层（name字段），次干道、县道
    type: 'line',
    source: CONFIG.addLv11,
    'source-layer': 'GROLAN_11_1009',
    minzoom: _roadVisibleLv,
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-width': {
        'base': 2,
        'stops': [
          [11, 2],
          [12, 4],
          [13, 5],
          [14, 5],
          [15, 6],
          [16, 6],
          [17, 8],
          [18, 10],
          [19, 10],
          [20, 18]
        ]
      },
      'line-color': '#FFFFFF'
    },
    labelLayerId: 'GRAILN_bg'
  }, {
    id: 'GROLAN_11_1009_NAME', // 次干道、县道名称
    type: 'symbol',
    source: CONFIG.addLv11,
    'source-layer': 'GROLAN_11_1009',
    minzoom: _roadVisibleLv,
    layout: {
      'text-field': '{NAME}',
      'visibility': 'visible',
      'symbol-placement': 'line',
      'text-font': ['Arial Unicode MS Bold'],
      'text-pitch-alignment': 'viewport',
      'symbol-spacing': 500,
      'text-rotation-alignment': 'map',
      'text-size': 12,
      'icon-rotation-alignment': 'viewport'
    },
    'paint': {
      'text-color': 'rgba(65, 65, 65, 1)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  },
  // POI 点
  {
    id: '11L_POI_YIYUAN', // 医院
    type: 'symbol',
    source: CONFIG.addLv11,
    'source-layer': 'SD_POI_LEVEL9_1009',
    filter: ['all', ['>=', 'KIND', '170100'],
      ['<=', 'KIND', '170105']
    ],
    'layout': {
      'text-field': '{NAME}',
      'visibility': 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_yiyuan',
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
  },
  {
    id: '11L_POI_PARK', // 公园
    type: 'symbol',
    source: CONFIG.addLv11,
    'source-layer': 'SD_POI_LEVEL9_1009', // py是面
    filter: ['all', ['>=', 'KIND', '180301'],
      ['<=', 'KIND', '180400']
    ],
    'layout': {
      'text-field': '{NAME}',
      'visibility': 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_park',
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
  }
  ]
};


export default style;