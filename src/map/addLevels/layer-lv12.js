/**
 * @author sl 2019-01-02
 */
import {
  levelConfig
} from 'tuyun-config';

const _visibleLevel = 12;
const symbolLabelLayerId = 'symbol-ref';
const lineLabelLayerId = 'line-xdzgd-ref';

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
  layers: [
    {
      "id": "9L_zgd_bg", // 主干道背景
      type: 'line',
      source: levelConfig.addLv12,
      'source-layer': 'zgdGDB',
      minzoom: _visibleLevel,
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-width': {
          base: 2,
          stops: [
            [7, 3],
            [8, 2],
            [9, 3],
            [10, 4],
            [11, 4],
            [12, 5],
            [13, 7],
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
      id: '9L_zgd', // 路网图层（name字段），主干道
      type: 'line',
      source: levelConfig.addLv12,
      'source-layer': 'zgdGDB',
      minzoom: _visibleLevel,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-width': {
          base: 2,
          stops: [
            [7, 2],
            [8, 1],
            [9, 2],
            [10, 3],
            [11, 3],
            [12, 4],
            [13, 6],
            [14, 8],
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
      id: '9L_zgd_name', // 主干道名称
      type: 'symbol',
      source: levelConfig.addLv12,
      'source-layer': 'zgdGDB',
      minzoom: _visibleLevel,
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
        'text-color': 'rgba(65, 65, 65, 0.9)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      },
      labelLayerId: symbolLabelLayerId
    }, {
      "id": "xd_bg", // 县道背景
      type: 'line',
      source: levelConfig.addLv12,
      'source-layer': 'xiandaoGDB',
      minzoom: _visibleLevel,
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-width': {
          base: 2,
          stops: [
            [7, 3],
            [8, 2],
            [9, 3],
            [10, 4],
            [11, 4],
            [12, 5],
            [13, 7],
            [14, 9],
            [15, 8],
            [16, 8],
            [17, 10],
            [18, 14],
            [19, 14],
            [20, 22],
            [21, 24],
            [22, 26]
          ]
        },
        'line-color': '#d8d8d8'
      },
      labelLayerId: lineLabelLayerId
    }, {
      id: 'xd', // 路网图层（name字段），县道
      type: 'line',
      source: levelConfig.addLv12,
      'source-layer': 'xiandaoGDB',
      minzoom: _visibleLevel,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-width': {
          base: 2,
          stops: [
            [7, 2],
            [8, 1],
            [9, 2],
            [10, 3],
            [11, 3],
            [12, 4],
            [13, 6],
            [14, 8],
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
        'line-color': '#fed669'
      },
      labelLayerId: lineLabelLayerId
    },
    {
      id: 'xd_name', // xiandao
      type: 'symbol',
      source: levelConfig.addLv12,
      'source-layer': 'xiandaoGDB',
      minzoom: _visibleLevel,
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
        'text-color': 'rgba(65, 65, 65, 0.9)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      },
      labelLayerId: symbolLabelLayerId
    },
    {
      "id": "gjl_bg", //高架路背景
      type: 'line',
      source: levelConfig.addLv12,
      'source-layer': 'gjlGDB',
      minzoom: _visibleLevel,
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-width': {
          base: 2,
          stops: [
            [7, 3],
            [8, 2],
            [9, 3],
            [10, 4],
            [11, 4],
            [12, 5],
            [13, 7],
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
        'line-color': '#d8d8d8'
      },
      labelLayerId: lineLabelLayerId
    }, {
      id: 'gjl', //高架路
      type: 'line',
      source: levelConfig.addLv12,
      'source-layer': 'gjlGDB',
      minzoom: _visibleLevel,
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-width': {
          base: 2,
          stops: [
            [7, 2],
            [8, 1],
            [9, 2],
            [10, 3],
            [11, 3],
            [12, 4],
            [13, 6],
            [14, 8],
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
        'line-color': '#fed669'
      },
      labelLayerId: lineLabelLayerId
    },
    {
      id: 'gjl_name',
      type: 'symbol',
      source: levelConfig.addLv12,
      'source-layer': 'gjlGDB',
      minzoom: _visibleLevel,
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
        'text-color': 'rgba(65, 65, 65, 0.9)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      },
      labelLayerId: symbolLabelLayerId
    },

    {
      id: 'POI_LEVEL_12',
      type: 'symbol',
      source: levelConfig.addLv12,
      'source-layer': 'POI_LEVEL_12',
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
    }]
};

export default style;