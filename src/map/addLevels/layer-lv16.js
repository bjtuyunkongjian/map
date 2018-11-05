/*
 16级 内容有：区级政府，POI详情,小区，小学，加油加气站，电器超市，百货商场，农贸市场等共11部分
*/
import { levelConfig } from 'tuyun-config';

const _visibleLevel = 16;

const style = {
  visibleLevel: _visibleLevel,
  source: {
    [levelConfig.addLv16]: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        'http://116.62.186.152:8080/geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ASD_16L@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf'
      ],
      minzoom: _visibleLevel
    }
  },
  layers: [
    {
      // 区县政府机关
      id: '16L_COUNTY',
      type: 'symbol',
      source: levelConfig.addLv16,
      'source-layer': 'POI_LEVEL_16',
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
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_county.9',
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
      // 省地级市政府机关
      id: '16L_TOWN',
      type: 'symbol',
      source: levelConfig.addLv16,
      'source-layer': 'POI_LEVEL_16',
      filter: ['any',
        ['==', 'KIND', '190102'],
        ['==', 'KIND', '160103'],
      ],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_government_other',
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
      // 小区
      id: '16L_PLOT',
      type: 'symbol',
      source: levelConfig.addLv16,
      'source-layer': 'POI_LEVEL_16',
      filter: ['==', 'KIND', '120201'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
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
    }, {
      // 小学
      id: '16L_PRIMARY',
      type: 'symbol',
      source: levelConfig.addLv16,
      'source-layer': 'POI_LEVEL_16',
      filter: ['any',
        ['==', 'KIND', '160101'],
        ['==', 'KIND', '160102'],
      ],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_xuexiao',
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
      // 派出所公安
      id: '16L_POLICE',
      type: 'symbol',
      source: levelConfig.addLv16,
      'source-layer': 'POI_LEVEL_16',
      filter: ['==', 'KIND', '190202'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_gongan',
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
      // 加油加气站
      id: '16L_PETROL',
      type: 'symbol',
      source: levelConfig.addLv16,
      'source-layer': 'POI_LEVEL_16',
      filter: ['any',
        ['==', 'KIND', '230215'],
        ['==', 'KIND', '230216'],
        ['==', 'KIND', '230217'],
      ],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
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
    }, {
      // 药店
      id: '16L_YAO',
      type: 'symbol',
      source: levelConfig.addLv16,
      'source-layer': 'POI_LEVEL_16',
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
      // 小商品城，百货商场，超市
      id: '16L_MARKET',
      type: 'symbol',
      source: levelConfig.addLv16,
      'source-layer': 'POI_LEVEL_16',
      filter: ['any',
        ['==', 'KIND', '130106'],
        ['==', 'KIND', '130101'],
        ['==', 'KIND', '130102'],
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
      // POI详情，图标为disabled未定义。无图标
      id: '16L_POIDES',
      type: 'symbol',
      source: levelConfig.addLv16,
      'source-layer': 'POI_LEVEL_16',
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
        'text-size': 11,
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
      // 农贸市场
      id: '16L_FAMARKET',
      type: 'symbol',
      source: levelConfig.addLv16,
      'source-layer': 'POI_LEVEL_16',
      filter: ['==', 'KIND', '130202'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_nongye',
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
      // 电器市场
      id: '16L_ELE_MARKET',
      type: 'symbol',
      source: levelConfig.addLv16,
      'source-layer': 'POI_LEVEL_16',
      filter: ['==', 'KIND', '130601'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
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
    }]
}

export default style;