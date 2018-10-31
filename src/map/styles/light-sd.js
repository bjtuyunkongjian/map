/**
 * @author sl
 * 更换服务器：style.sources.tiles[0] 更换内容
 * 以山东省数据为例
 * host:port/geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ASD_7L@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf
 * 1. ip + host
 * 2. SDWorkSpace ---> 对应的空间名称
 * 3. 3ASD_7L ----> 对应的图层名称
 * 4. z ----> 缩放等级
 * 5. x, y ----> 对应的瓦片
 *
 * 显示规则：
 * 面在最底层，其次是线，其次是点；居民区在绿地上面，绿地在水系面上面
 *
 * todolist
 * 1. 国道、省道路牌问题
 * 2. 路网图层锯齿 -------> 分级别显示，看上去没这么密，就算解决了
 * 3. 政府两字没去掉
 */

const _visibleLevel = 7;
const _sdVisibleLevel = 9; // 省道
const _maxVisibleLvel = 24; // 
const _ditchVisibleLevel = 14; // 沟和渠道

const layers = [{
    id: 'background', // 背景
    type: 'background',
    layout: {},
    paint: {
      'background-color': '#f5f5f5'
    }
  },
  // 面
  {
    id: 'GHYDPL_7L', // 记录了一些水渠、河沟，水库的面状要素
    type: 'fill',
    source: 'composite',
    'source-layer': 'SD_GHYDPL', // py是面
    filter: [
      'any',
      ['==', 'CLASID', '210200'],
      ['==', 'CLASID', '230101'],
      ['==', 'CLASID', '240101']
    ],
    layout: {},
    paint: {
      'fill-color': '#c4daf6',
      'fill-opacity': 1,
      'fill-antialias': false
    }
  },
  {
    id: 'GHYDPL_OTH', // 记录了一些水渠、河沟，水库的面状要素
    type: 'fill',
    source: 'composite',
    'source-layer': 'SD_GHYDPL', // py是面
    filter: [
      'all',
      ['!=', 'CLASID', '210200'],
      ['!=', 'CLASID', '230101'],
      ['!=', 'CLASID', '240101']
    ],
    minzoom: _ditchVisibleLevel,
    layout: {},
    paint: {
      'fill-color': '#c4daf6',
      'fill-opacity': 1,
      'fill-antialias': false
    }
  },
  {
    id: 'GVEGPL', // 记录了绿地
    type: 'fill',
    source: 'composite',
    'source-layer': 'SD_GVEGPL', // py是面
    layout: {},
    minzoom: 11,
    paint: {
      'fill-color': '#d6eccf',
      'fill-opacity': 0.5,
      'fill-antialias': false
    }
  },
  // 线
  {
    id: 'GBOULN', // 记录了各个镇的边界，有名字的记录的是省界和岛屿（name不为空）
    type: 'line',
    source: 'composite',
    'source-layer': 'GBOULN', // LN，line的简写
    filter: [
      'any',
      ['==', 'CLASID', '630201'],
      ['==', 'CLASID', '630202'],
      ['==', 'CLASID', '640201'],
      ['==', 'CLASID', '250100']
    ],
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-width': 1,
      'line-color': '#BBBBBB',
      'line-offset': 0
    }
  },

  {
    id: 'GRAILN_bg', // 记录了铁路，底层颜色灰色
    type: 'line',
    source: 'composite',
    'source-layer': 'SD_GRAILN', // LN，line的简写
    minzoom: 7,
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': '#B6B3B7',
      'line-width': 2.4
    }
  },
  {
    id: 'GRAILN', // 记录了铁路，间隔白色
    type: 'line',
    source: 'composite',
    'source-layer': 'SD_GRAILN', // LN，line的简写
    minzoom: _visibleLevel,
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-color': '#FFFFFF',
      'line-dasharray': [5, 5],
      'line-width': 1.6
    }
  },

  // 新加的平滑图层
  {
    id: 'GROALN_GAOGUO_MERGE_SD_bg', // 路网图层（name字段），底部图层，充当描边作用，省道
    type: 'line',
    source: 'composite',
    'source-layer': 'GROALN_GAOGUO_MERGE', // LN，line的简写
    filter: [
      'all',
      ['!=', 'CLASID', '420101'],
      ['!=', 'CLASID', '420102'],
      ['!=', 'CLASID', '420704'],
      ['!=', 'CLASID', '420705'],
    ],
    minzoom: _visibleLevel,
    maxzoom: _maxVisibleLvel,
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
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
          [13, 9],
          [14, 9],
          [15, 10],
          [16, 10],
          [17, 12],
          [18, 14],
          [19, 14],
          [20, 22],
          [21, 24],
          [22, 26],

        ]
      },
      'line-color': '#ffae00'
    }
  },
  {
    id: 'GROALN_GAOGUO_MERGE_SD', // 路网图层（name字段），省道
    type: 'line',
    source: 'composite',
    'source-layer': 'GROALN_GAOGUO_MERGE', // 路网图层，国道和省道
    filter: [
      'all',
      ['!=', 'CLASID', '420101'],
      ['!=', 'CLASID', '420102'],
      ['!=', 'CLASID', '420704'],
      ['!=', 'CLASID', '420705'],
      // ['!=', 'CLASID', '420706'],
      // ['!=', 'CLASID', '430300'],
      // ['!=', 'CLASID', '430501'],
      // ['!=', 'CLASID', '430502'],
      // ['!=', 'CLASID', '430503']
    ],
    minzoom: _visibleLevel,
    maxzoom: _maxVisibleLvel,
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
    }
  },
  {
    id: 'GROALN_GAOGUO_MERGE_SD_NAME', // 省道名称
    type: 'symbol',
    source: 'composite',
    'source-layer': 'GROALN_GAOGUO_MERGE',
    filter: [
      'all',
      ['!=', 'CLASID', '420101'],
      ['!=', 'CLASID', '420102'],
      ['!=', 'CLASID', '420704'],
      ['!=', 'CLASID', '420705'],
      // ['!=', 'CLASID', '420706'],
      // ['!=', 'CLASID', '430300'],
      // ['!=', 'CLASID', '430501'],
      // ['!=', 'CLASID', '430502'],
      // ['!=', 'CLASID', '430503']
    ],
    minzoom: _visibleLevel,
    maxzoom: _maxVisibleLvel,
    layout: {
      'text-field': '{NAME}',
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
    }
  },

  {
    id: 'GROALN_GAOGUO_MERGE_GD_bg', // 路网图层（name字段），底部图层，充当描边作用，国道
    type: 'line',
    source: 'composite',
    'source-layer': 'GROALN_GAOGUO_MERGE', // LN，line的简写
    filter: [
      'any',
      ['==', 'CLASID', '420101'],
      ['==', 'CLASID', '420102'],
      ['==', 'CLASID', '420704'],
      ['==', 'CLASID', '420705'],
      // ['==', 'CLASID', '420706'],
      // ['==', 'CLASID', '430300'],
      // ['==', 'CLASID', '430501'],
      // ['==', 'CLASID', '430502'],
      // ['==', 'CLASID', '430503']
    ],
    minzoom: _visibleLevel,
    maxzoom: _maxVisibleLvel,
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
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
          [13, 9],
          [14, 9],
          [15, 10],
          [16, 10],
          [17, 12],
          [18, 14],
          [19, 14],
          [20, 22],
          [21, 24],
          [22, 26],
        ]
      },
      'line-color': '#f9bd09'
    }
  },
  {
    id: 'GROALN_GAOGUO_MERGE_GD', // 路网图层（name字段），国道
    type: 'line',
    source: 'composite',
    'source-layer': 'GROALN_GAOGUO_MERGE', // 路网图层，国道和省道
    filter: [
      'any',
      ['==', 'CLASID', '420101'],
      ['==', 'CLASID', '420102'],
      ['==', 'CLASID', '420704'],
      ['==', 'CLASID', '420705'],
      // ['==', 'CLASID', '420706'],
      // ['==', 'CLASID', '430300'],
      // ['==', 'CLASID', '430501'],
      // ['==', 'CLASID', '430502'],
      // ['==', 'CLASID', '430503']
    ],
    minzoom: _visibleLevel,
    maxzoom: _maxVisibleLvel,
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
      'line-color': '#fed669'
    }
  },
  {
    id: 'GROALN_GAOGUO_MERGE_GD_NAME', // 国道名称
    type: 'symbol',
    source: 'composite',
    'source-layer': 'GROALN_GAOGUO_MERGE',
    filter: [
      'any',
      ['==', 'CLASID', '420101'],
      ['==', 'CLASID', '420102'],
      ['==', 'CLASID', '420704'],
      ['==', 'CLASID', '420705'],
      // ['==', 'CLASID', '420706'],
      // ['==', 'CLASID', '430300'],
      // ['==', 'CLASID', '430501'],
      // ['==', 'CLASID', '430502'],
      // ['==', 'CLASID', '430503']
    ],
    minzoom: _visibleLevel,
    maxzoom: _maxVisibleLvel,
    layout: {
      'text-field': '{NAME}',
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
    }
  },

  {
    id: 'GROALN_GAOGUO_MERGE_ICON_GD',
    type: 'symbol',
    source: 'composite',
    'source-layer': 'GROALN_GAOGUO_MERGE',
    minzoom: _visibleLevel,
    maxzoom: _maxVisibleLvel,
    filter: [
      'all',
      ['!=', 'ENTIID', ''],
      [
        'any',
        ['==', 'CLASID', '420101'],
        ['==', 'CLASID', '420102'],
        ['==', 'CLASID', '420704'],
        ['==', 'CLASID', '420705'],
        // ['==', 'CLASID', '420706'],
        // ['==', 'CLASID', '430300'],
        // ['==', 'CLASID', '430501'],
        // ['==', 'CLASID', '430502'],
        // ['==', 'CLASID', '430503']
      ]
    ],
    layout: {
      'text-field': '{ENTIID}',
      visibility: 'visible',
      'symbol-placement': 'line',
      'text-size': 12,
      'icon-image': 'ic_map_gh.9',
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
    }
  },
  {
    id: 'GROALN_GAOGUO_MERGE_ICON_SD',
    type: 'symbol',
    source: 'composite',
    'source-layer': 'GROALN_GAOGUO_MERGE',
    minzoom: _sdVisibleLevel,
    maxzoom: _maxVisibleLvel,
    filter: [
      'all',
      ['!=', 'ENTIID', ''],
      ['!=', 'CLASID', '420101'],
      ['!=', 'CLASID', '420102'],
      ['!=', 'CLASID', '420704'],
      ['!=', 'CLASID', '420705'],
      // ['!=', 'CLASID', '420706'],
      // ['!=', 'CLASID', '430300'],
      // ['!=', 'CLASID', '430501'],
      // ['!=', 'CLASID', '430502'],
      // ['!=', 'CLASID', '430503']
    ],
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
    }
  },

  ///////////////////////////////
  // 点
  {
    id: 'SD_POI_LEVEL7_1009', // POI图层
    type: 'symbol',
    source: 'composite',
    'source-layer': 'SD_POI_LEVEL7_1009',
    minzoom: _visibleLevel,
    layout: {
      'text-field': '{NAME}',
      visibility: 'visible',
      'symbol-placement': 'point',
      'text-size': 16,
      'text-padding': 4,
      'icon-image': 'ic_map_zhengfu',
      'text-justify': 'left',
      'text-anchor': 'left',
      'text-offset': [0.8, 0],
      'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': 'rgba(65, 65, 65, 1)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  }
];

export default {
  version: 8,
  name: 'Mapbox',
  metadata: {},
  sources: {
    composite: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        'http://116.62.186.152:8080/geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ASD_7L@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf'
      ]
    }
  },
  sprite: 'http://116.62.186.152:12808/sprite/sprite',
  glyphs: 'http://47.97.24.100:8899/fonts/{fontstack}/{range}.pbf',
  visibility: 'public',
  layers
};