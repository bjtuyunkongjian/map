/**
 * @author sl 2019-01-02
 */
import {
  levelConfig
} from 'tuyun-config';

const _visibleLevel = 13;
const symbolLabelLayerId = 'symbol-ref';
const lineLabelLayerId = 'line-zd-ref';

const style = {
  visibleLevel: _visibleLevel,
  source: {
    [levelConfig.addLv13]: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        'http://116.62.186.152:8080/geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ASD_13L@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf'
      ],
      minzoom: _visibleLevel
    }
  },
  layers: [
    {
      "id": "xiangdao_bg", //乡道
      type: 'line',
      source: levelConfig.addLv13,
      'source-layer': 'xiangdaoGDB',
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
            [12, 3],
            [13, 4],
            [14, 6],
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
      id: 'xiangdao',
      type: 'line',
      source: levelConfig.addLv13,
      'source-layer': 'xiangdaoGDB',
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
            [12, 3],
            [13, 3],
            [14, 5],
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
        'line-color': '#fff'
      },
      labelLayerId: lineLabelLayerId
    }, {
      id: 'xiangdao_name',
      type: 'symbol',
      source: levelConfig.addLv13,
      'source-layer': 'xiangdaoGDB',
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
        'text-pitch-alignment': 'map',
        'symbol-spacing': 500,
        'text-rotation-alignment': 'map',
        'text-size': 10,
        'icon-rotation-alignment': 'viewport'
      },
      paint: {
        'text-color': 'rgba(65, 65, 65, 0.9)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      },
      labelLayerId: lineLabelLayerId
    },
    {
      "id": "ksl_bg", //快速路的背景
      type: 'line',
      source: levelConfig.addLv13,
      'source-layer': 'kslGDB',
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
            [12, 7],
            [13, 4],
            [14, 6],
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
      id: 'ksl',
      type: 'line',
      source: levelConfig.addLv13,
      'source-layer': 'kslGDB',
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
            [12, 5],
            [13, 3],
            [14, 5],
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
        'line-color': '#fff'
      },
      labelLayerId: lineLabelLayerId
    },
    {
      id: 'ksl_name', // 快速路
      type: 'symbol',
      source: levelConfig.addLv13,
      'source-layer': 'kslGDB',
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
        'text-pitch-alignment': 'map',
        'symbol-spacing': 500,
        'text-rotation-alignment': 'map',
        'text-size': 10,
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
      "id": "zd_bg", //匝道背景
      type: 'line',
      source: levelConfig.addLv13,
      'source-layer': 'zadaoGDB',
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
            [12, 7],
            [13, 4],
            [14, 6],
            [15, 8],
            [16, 8],
            [17, 8],
            [18, 10],
            [19, 14],
            [20, 22],
            [21, 24],
            [22, 26]
          ]
        },
        'line-color': '#fed669'
      },
      labelLayerId: lineLabelLayerId
    }, {
      id: 'zd', // 路网图层（name字段），匝道/立交
      type: 'line',
      source: levelConfig.addLv13,
      'source-layer': 'zadaoGDB',
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
            [12, 5],
            [13, 3],
            [14, 5],
            [15, 7],
            [16, 7],
            [17, 9],
            [18, 9],
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
      id: 'zd_name',
      type: 'symbol',
      source: levelConfig.addLv13,
      'source-layer': 'zadaoGDB',
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
        'text-pitch-alignment': 'map',
        'symbol-spacing': 500,
        'text-rotation-alignment': 'map',
        'text-size': 10,
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
      "id": "cgd_bg",
      type: 'line',
      source: levelConfig.addLv13,
      'source-layer': 'cgdGDB',
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
            [12, 3],
            [13, 4],
            [14, 6],
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
      id: 'cgd',
      type: 'line',
      source: levelConfig.addLv13,
      'source-layer': 'cgdGDB',
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
            [12, 3],
            [13, 3],
            [14, 5],
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
        'line-color': '#fff'
      },
      labelLayerId: lineLabelLayerId
    },
    {
      id: 'cgd_name', // xiandao
      type: 'symbol',
      source: levelConfig.addLv13,
      'source-layer': 'cgdGDB',
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
        'text-pitch-alignment': 'map',
        'symbol-spacing': 500,
        'text-rotation-alignment': 'map',
        'text-size': 10,
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
      id: 'POI_LEVEL_13',
      type: 'symbol',
      source: levelConfig.addLv13,
      'source-layer': 'POI_LEVEL_13',
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