/**
 * @author sl 2019-01-02
 */
import {
  levelConfig
} from 'tuyun-config';

const _visibleLevel = 9;
const symbolLabelLayerId = 'symbol-ref';
const lineLabelLayerId = 'line-ref';
const _maxzoom = 13;

const style = {
  visibleLevel: _visibleLevel,
  source: {
    [levelConfig.addLv9]: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        'http://116.62.186.152:8080/geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ASD_9L@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf'
      ],
      minzoom: _visibleLevel
    }
  },
  layers: [{
    id: '9L_GVEGPL', // 记录了绿地
    type: 'fill',
    source: levelConfig.addLv9,
    'source-layer': 'GVEGPL_Merge',
    layout: {},
    paint: {
      'fill-color': '#d6eccf',
      'fill-opacity': 0.5,
      'fill-antialias': false
    },
    labelLayerId: 'GHYDPL_7L'
  },
  {
    "id": "9L_shengdao_bg", // 省道背景 
    type: 'line',
    source: levelConfig.addLv9,
    'source-layer': 'shengGDBt',
    minzoom: _visibleLevel,
    maxzoom: _maxzoom,
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-width': {
        base: 2,
        stops: [
          [8, 2],
          [9, 3],
          [10, 4],
          [11, 4],
          [12, 7],
          [13, 9],
          [14, 9],
          [15, 10],
          [16, 10],
          [17, 12],
          [18, 14],
          [19, 14],
          [20, 22],
          [21, 24],
          [22, 26]
        ]
      },
      'line-color': '#ffae00'
    },
    labelLayerId: lineLabelLayerId
  }, {
    id: '9L_shengdao', // 路网图层（name字段），省道
    type: 'line',
    source: levelConfig.addLv9,
    'source-layer': 'shengGDBt',
    minzoom: _visibleLevel,
    maxzoom: _maxzoom,
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-width': {
        base: 2,
        stops: [
          [8, 1],
          [9, 2],
          [10, 3],
          [11, 3],
          [12, 5],
          [13, 6],
          [14, 6],
          [15, 7],
          [16, 7],
          [17, 9],
          [18, 11],
          [19, 11],
          [20, 19],
          [21, 22],
          [22, 24],
        ]
      },
      'line-color': '#ffeebb'
    },
    labelLayerId: lineLabelLayerId
  },
  {
    id: '9L_shengdao_name', // 省道名称
    type: 'symbol',
    source: levelConfig.addLv9,
    'source-layer': 'shengGDBt',
    minzoom: _visibleLevel,
    maxzoom: _maxzoom,
    layout: {
      'text-field': {
        stops: [
          [7, ''],
          [13, '{NAME}']
        ]
      },
      visibility: 'visible',
      'symbol-placement': 'line',
      'text-font': ['Arial Unicode MS Bold'],
      'text-pitch-alignment': 'viewport',
      'symbol-spacing': 500,
      'text-rotation-alignment': 'map',
      'text-size': 12,
      'icon-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': 'rgba(65, 65, 65, 1)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    },
    labelLayerId: symbolLabelLayerId
  },
  {
    id: '9L_shengdao_icon', // 省道图标
    type: 'symbol',
    source: levelConfig.addLv9,
    'source-layer': 'shengGDBt',
    filter: ['!=', 'ENTIID', ''],
    minzoom: _visibleLevel,
    maxzoom: _maxzoom,
    layout: {
      'text-field': '{ENTIID}',
      visibility: 'visible',
      'symbol-placement': 'line',
      'text-size': 12,
      'icon-image': 'ic_map_sh.9',
      'icon-text-fit': 'both',
      'icon-text-fit-padding': [2, 6, 2, 6],
      'text-justify': 'center',
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport',
      'text-anchor': 'center',
      'text-keep-upright': false
    },
    paint: {
      'text-color': '#FFFFFF'
    },
    labelLayerId: symbolLabelLayerId
  },
  {
    id: 'POI_LEVEL_9_1107',
    type: 'symbol',
    source: levelConfig.addLv9,
    'source-layer': 'POI_LEVEL_9',
    'layout': {
      'text-field': '{NAME}',
      'visibility': 'visible',
      'symbol-placement': 'point',
      'text-size': 12,
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
      'text-color': 'rgba(65, 65, 65, 0.8)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    },
    labelLayerId: symbolLabelLayerId
  }
  ]
};

export default style;