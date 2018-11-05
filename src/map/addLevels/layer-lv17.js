/* 
17级图层，显示的内容主要分：
1.16级图层中剩余的区县政府机关
2.16级图层中加油加气
3.POI详情
4.小区
5.小学
6.电器商场
*/

import { levelConfig } from 'tuyun-config';

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
  layers: [
    {
      // 17层中的区县政府机关图标
      id: '17L_COUNTRY',
      type: 'symbol',
      source: levelConfig.addLv17,
      'source-layer': 'POI_LEVEL_17',
      minzoom: _visibleLevel,
      filter: ['any',
        ['==', 'KIND', '190104'],
        ['==', 'KIND', '190105'],
        ['==', 'KIND', '190108'],
      ],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_government2',
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
      // 17层中的小区
      id: '17L_PLOT',
      type: 'symbol',
      source: levelConfig.addLv17,
      'source-layer': 'POI_LEVEL_17',
      filter: ['==', 'KIND', '120201'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_zhuzhai',
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
      // 17层中的小学图标
      id: '17L_SCHOOL',
      type: 'symbol',
      source: levelConfig.addLv17,
      'source-layer': 'POI_LEVEL_17',
      filter: ['any',
        ['==', 'KIND', '160101'],
        ['==', 'KIND', '160102'],
      ],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_school',
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
      // 17层中加油加气站
      id: '17L_PETROL',
      type: 'symbol',
      source: levelConfig.addLv17,
      'source-layer': 'POI_LEVEL_17',
      filter: ['any',
        ['==', 'KIND', '230215'],
        ['==', 'KIND', '230216'],
        ['==', 'KIND', '230217'],
      ],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_jiayouzhan',
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
      // 17层中剩余POI详情图标
      id: '17L_DESPOI',
      type: 'symbol',
      source: levelConfig.addLv17,
      'source-layer': 'POI_LEVEL_17',
      filter: ['any',
        ['==', 'KIND', '160106'],
        ['==', 'KIND', '160107'],
        ['==', 'KIND', '160108'],
        ['==', 'KIND', '230105'],
        ['==', 'KIND', '230125'],
        ['==', 'KIND', '230127'],
        ['==', 'KIND', '230129'],
      ],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_zoomout_disabled',
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
      // 17层中剩余电器商城
      id: '17L_ELEMARKET',
      type: 'symbol',
      source: levelConfig.addLv17,
      'source-layer': 'POI_LEVEL_17',
      filter: ['==', 'KIND', '130601'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_zoomin_disabled',
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

  ]
}

export default style;