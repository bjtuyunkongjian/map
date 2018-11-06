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
      id: '18L_JX',   //驾校
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
        'icon-image': 'ic_map_other',
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
      id: '18L_TESTCENTER', //考试中心
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '160110'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_museum',
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
      id: '18L_NEWS', //报社出版社杂志社
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '160201'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_new',
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
      id: '18L_TV', //电台，电视台，电影出版社
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '160202'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_tv_tower',
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
      id: '18L_TV', //文工团艺术团
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '160209'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_theater',
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
      id: '18L_HOSEQP', //医院内部医疗设施
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '170104'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
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
      id: '18L_ED', //急诊
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '170105'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_hospital',
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
      id: '18L_PRCARE', //社区医疗
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '170106'],
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
    {
      id: '18L_DTHos', //牙科诊所
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '170107'],
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
    {
      id: '18L_EPStation', //防疫站
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '170108'],
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
    {
      id: '18L_Health', //体检机构
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '170109'],
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
    {
      id: '18L_BLOOD', //献血屋
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '170110'],
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
    {
      id: '18L_Welfare', //福利院
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '170201'],
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
    {
      id: '18L_OUTDOOR', //天然浴场
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '180303'],
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
      id: '18L_GEN_GOVER', //普通政府机关
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '190110'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
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
    },
    {
      id: '18L_administration', //行政办公大厅
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '190111'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_zoomin',
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
      id: '18L_LocalOffice', //驻京，驻地方办事处
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '190112'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_zhengfu_bg',
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
      id: '18L_TrafficPolice', //交警队
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '190203'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
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
    },
    {
      id: '18L_XIEHUI', //协会
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '190301'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_others_service',
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
      id: '18L_CHURCH', //教堂
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '190400'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_others_service',
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
      id: '18L_TEMPLE', //寺庙道观
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '190401'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_others_service',
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
      id: '18L_Catholicism', //天主教
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '190402'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_others_service',
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
      id: '18L_Christian', //基督教
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '190403'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_others_service',
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
      id: '18L_Islam', //伊斯兰教
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '190404'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_others_service',
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
      id: '18L_VISA', //签证处
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '190502'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_others_service',
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
      id: '18L_TRAIN', //培训中心
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '200102'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_others_education',
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
      id: '18L_BUSINESS', //商业综合体
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '200200'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_shangchang',
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
      id: '18L_car', //汽车租赁
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '200201'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_others_service',
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
      id: '18L_OFFICE', //事务所
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['any',
        ['==', 'KIND', '200300'],
        ['==', 'KIND', '200400'],
      ],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_others_service',
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
      id: '18L_TALENT_MARKET', //人才市场
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '200404'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_others_service',
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
      id: '18L_TOUR', //旅行社
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '200405'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_others_tour',
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
      id: '18L_HOUSEKEEP', //家政服务代表
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '210101'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_others_service',
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
      id: '18L_MOTO', //摩托车自行车维修
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '210102'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_qicheweixiu',
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
      id: '18L_HOMESERVICE', //家电维修
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '210103'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_others_service',
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
      id: '18L_WATER', //送水站
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '210104'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_others_service',
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
      id: '18L_PET', //宠物医院
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '210105'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_others_service',
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
      id: '18L_LAUNDRY', //洗衣店
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '210201'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_others_service',
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
      id: '18L_ORDERCL', //服装定制
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '210202'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_others_service',
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
      id: '18L_AFTER_SALE', //皮具、鞋包，衣服保养
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '210203'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_others_service',
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
      id: '18L_MARRY', //婚庆代表
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '210209'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_others_service',
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
      id: '18L_DIE', //火葬场殡仪馆
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '210210'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_gongmu',
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
      id: '18L_POST', //邮局
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '210213'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_youju',
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
      id: '18L_CAMERA', //照相
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '210214'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_other',
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
      id: '18L_REAL', //房产中介
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '210216'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_other',
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
      id: '18L_OFFICE_SERVICE', //办公服务
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '210217'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_other',
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
      id: '18L_GOODS', //货物自提
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '210218'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_other',
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
      id: '18L_MARRY_SERVICE', //婚姻介绍所
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '210219'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_other',
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
      id: '18L_COMMUNICATION', //通信
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '210301'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_telecom',
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
      id: '18L_TICKET', //票务中心，售票点
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['any',
        ['==', 'KIND', '210302'],
        ['==', 'KIND', '210304'],
      ],

      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_scenics',
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
      id: '18L_POWERSHOP', //电力营业厅
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '210303'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_other',
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
      id: '18L_PEOPLE_SERVICE', //居民服务
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '210400'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_other',
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
      id: '18L_COMPANY', //公司,其他单位
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['any',
        ['==', 'KIND', '220100'],
        ['==', 'KIND', '220400'],
      ],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_building',
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
      id: '18L_FACTOR', //厂矿企业
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '220200'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_other',
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
      id: '18L_LOGSITIC', //物流，快运
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '230130'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_other',
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
      id: '18L_BRIDGE', //桥
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '230201'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_other',
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
      id: '18L_OVERPASS', //桥
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '230202'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_other',
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
      id: '18L_TOLL', //收费站
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '230209'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_toll',
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
      id: '18L_INPARKING', //室内停车场
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '230211'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_tingchechang',
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
      id: '18L_BUS_PARKING', //公交换乘停车场
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '230213'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_other',
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
      id: '18L_FLOOR_OPEN_PARK', //地上露天停车场
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['any',
        ['==', 'KIND', '230212'],
        ['==', 'KIND', '230223'],
      ],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_tingchechang',
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
      id: '18L_FLOOR_PARK', //地上非露天停车场
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '230224'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_other',
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
      id: '18L_UNDER_PARK', //地下停车场
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '230225'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_other',
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
      id: '18L_ELEBUS_STATION', //电动汽车充电站
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '230218'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_other',
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
      id: '18L_CAMPING', //露营地
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '230226'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_other',
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
      id: '18L_AFH_SERVICE', //农林牧渔服务
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '250100'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_other',
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
      id: '18L_AFH_SERVICE_PARTY', //农林牧渔服务代表
      type: 'symbol',
      source: levelConfig.addLv18,
      'source-layer': 'POI_LEVEL_18',
      minzoom: _visibleLevel,
      filter: ['==', 'KIND', '250100'],
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 10,
        'text-padding': 4,
        'icon-image': 'ic_map_others_service',
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
};

export default style;