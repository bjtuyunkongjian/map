/**
 * @author sl 2019-01-02
 * 11级，包括公园，医院
 */
import {
  levelConfig
} from 'tuyun-config';

const _visibleLevel = 11;

const style = {
  visibleLevel: _visibleLevel,
  source: {
    [levelConfig.addLv11]: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        'http://116.62.186.152:8080/geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ASD_11L@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf'
      ],
      minzoom: _visibleLevel
    },
  },
  layers: [{
    id: 'POI_LEVEL_11_university', // 大学
    type: 'symbol',
    source: levelConfig.addLv11,
    'source-layer': 'POI_LEVEL_11',
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
  }, {
    id: 'POI_LEVEL_11_library', // 图书馆、资料馆、档案馆
    type: 'symbol',
    source: levelConfig.addLv11,
    'source-layer': 'POI_LEVEL_11',
    filter: ['any',
      ['==', 'KIND', '160203'],
      ['==', 'KIND', '160204']
    ],
    'layout': {
      'text-field': '{NAME}',
      'visibility': 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_library',
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
    id: 'POI_LEVEL_11_bowuguan', // 博物馆、纪念馆、展览馆、陈列馆
    type: 'symbol',
    source: levelConfig.addLv11,
    'source-layer': 'POI_LEVEL_11',
    filter: ['any',
      ['==', 'KIND', '160205']
    ],
    'layout': {
      'text-field': '{NAME}',
      'visibility': 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_bowuguan',
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
    id: 'POI_LEVEL_11_museum', // 美术馆、科技馆、文化馆、活动中心
    type: 'symbol',
    source: levelConfig.addLv11,
    'source-layer': 'POI_LEVEL_11',
    filter: ['any',
      ['==', 'KIND', '160206'],
      ['==', 'KIND', '160207'],
      ['==', 'KIND', '160208']
    ],
    'layout': {
      'text-field': '{NAME}',
      'visibility': 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
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
  }, {
    id: 'POI_LEVEL_11_stadium', // 体育场馆、羽毛球场、网球场、保龄球馆、滑雪场
    type: 'symbol',
    source: levelConfig.addLv11,
    'source-layer': 'POI_LEVEL_11',
    filter: ['any',
      ['==', 'KIND', '180100'],
      ['==', 'KIND', '180101'],
      ['==', 'KIND', '180102'],
      ['==', 'KIND', '180103'],
      ['==', 'KIND', '180104'],
      ['==', 'KIND', '180107']
    ],
    'layout': {
      'text-field': '{NAME}',
      'visibility': 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_stadium',
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
    id: 'POI_LEVEL_11_golf', // 高尔夫球场、高尔夫练习场
    type: 'symbol',
    source: levelConfig.addLv11,
    'source-layer': 'POI_LEVEL_11',
    filter: ['any',
      ['==', 'KIND', '180105'],
      ['==', 'KIND', '180106']
    ],
    'layout': {
      'text-field': '{NAME}',
      'visibility': 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_golf',
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
    id: 'POI_LEVEL_11_dianyingyuan', // 电影院
    type: 'symbol',
    source: levelConfig.addLv11,
    'source-layer': 'POI_LEVEL_11',
    filter: ['any',
      ['==', 'KIND', '180209']
    ],
    'layout': {
      'text-field': '{NAME}',
      'visibility': 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_dianyingyuan',
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
    id: 'POI_LEVEL_11_theater', // 剧场、戏院、音乐厅
    type: 'symbol',
    source: levelConfig.addLv11,
    'source-layer': 'POI_LEVEL_11',
    filter: ['any',
      ['==', 'KIND', '180210']
    ],
    'layout': {
      'text-field': '{NAME}',
      'visibility': 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
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
  }, {
    id: 'POI_LEVEL_11_jiudian', // 农家乐、民俗游、非星级渡假村、疗养院
    type: 'symbol',
    source: levelConfig.addLv11,
    'source-layer': 'POI_LEVEL_11',
    filter: ['any',
      ['==', 'KIND', '180301'],
      ['==', 'KIND', '180302']
    ],
    'layout': {
      'text-field': '{NAME}',
      'visibility': 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_jiudian',
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
    id: 'POI_LEVEL_11_park', // 公园类
    type: 'symbol',
    source: levelConfig.addLv11,
    'source-layer': 'POI_LEVEL_11',
    filter: ['any',
      ['==', 'KIND', '180304'],
      ['==', 'KIND', '180307'],
      ['==', 'KIND', '180308'],
      ['==', 'KIND', '180309'],
      ['==', 'KIND', '180310']
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
  }, {
    id: 'POI_LEVEL_11_scenics', // 风景名胜
    type: 'symbol',
    source: levelConfig.addLv11,
    'source-layer': 'POI_LEVEL_11',
    filter: ['==', 'KIND', '180400'],
    'layout': {
      'text-field': '{NAME}',
      'visibility': 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
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
  }]
};


export default style;