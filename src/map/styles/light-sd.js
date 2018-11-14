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
 */

import {
  levelConfig
} from 'tuyun-config';

const _ditchVisibleLevel = 14; // 沟和渠道显示等级
const _maxzoom = 13;

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
  source: levelConfig.addLv7,
  'source-layer': 'GHYDPL_Merge', // py是面
  filter: [
    'any',
    ['==', 'CLASID', '210200'],
    ['==', 'CLASID', '230101'],
    ['==', 'CLASID', '240101'],
    ['==', 'CLASID', '250100']
  ],
  paint: {
    'fill-color': '#c4daf6',
    'fill-opacity': 1,
    'fill-antialias': false
  }
},
{
  id: 'GHYDPL_OTH', // 记录了一些水渠、河沟，水库的面状要素
  type: 'fill',
  source: levelConfig.addLv7,
  'source-layer': 'GHYDPL_Merge', // py是面
  filter: [
    'all',
    ['!=', 'CLASID', '210200'],
    ['!=', 'CLASID', '230101'],
    ['!=', 'CLASID', '240101'],
    ['!=', 'CLASID', '250100']
  ],
  minzoom: _ditchVisibleLevel,
  layout: {},
  paint: {
    'fill-color': '#c4daf6',
    'fill-opacity': 1,
    'fill-antialias': false
  }
},
// 线
{
  id: 'GBOULN', // 记录了各个镇的边界，有名字的记录的是省界和岛屿（name不为空）
  type: 'line',
  source: levelConfig.addLv7,
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
    'line-color': '#cdcdcd',
    'line-dasharray': [5, 4]
  }
},

{
  id: 'GRAILN_bg', // 记录了铁路，底层颜色灰色
  type: 'line',
  source: levelConfig.addLv7,
  'source-layer': 'SD_GRAILN_1107', // LN，line的简写
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
  source: levelConfig.addLv7,
  'source-layer': 'SD_GRAILN_1107', // LN，line的简写
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

{
  id: 'line-ref', // 做线的基层使用，国道、省道
  type: 'fill',
  source: levelConfig.addLv7,
  'source-layer': 'SD_GRAILN_1107',
  layout: {},
  paint: {
    'fill-opacity': 0
  }
},
{
  "id": "7L_guodao_bg", // 国道背景
  type: 'line',
  source: levelConfig.addLv7,
  'source-layer': 'gaoguoGDB',
  maxzoom: _maxzoom,
  layout: {
    'line-join': 'round',
    'line-cap': 'round'
  },
  paint: {
    'line-width': {
      base: 2,
      stops: [
        [7, 1],
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
    'line-color': '#f9bd09'
  },
  // labelLayerId: lineLabelLayerId
}, {
  id: '7L_guodao', // 路网图层（name字段），国道
  type: 'line',
  source: levelConfig.addLv7,
  'source-layer': 'gaoguoGDB',
  maxzoom: _maxzoom,
  layout: {
    'line-cap': 'round',
    'line-join': 'round'
  },
  paint: {
    'line-width': {
      base: 2,
      stops: [
        [7, 1],
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
  },
  // labelLayerId: lineLabelLayerId
},
{
  id: '7L_guodao_name', // 国道名称
  type: 'symbol',
  source: levelConfig.addLv7,
  'source-layer': 'gaoguoGDB',
  maxzoom: _maxzoom,
  layout: {
    'text-field': {
      stops: [
        [7, ''],
        [12, '{NAME}']
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
  // labelLayerId: symbolLabelLayerId
},
{
  id: '7L_guodao_icon', // 国道图标
  type: 'symbol',
  source: levelConfig.addLv7,
  'source-layer': 'gaoguoGDB',
  maxzoom: _maxzoom,
  filter: ['!=', 'ENTIID', ''],
  layout: {
    'text-field': '{ENTIID}',
    visibility: 'visible',
    'symbol-placement': 'line',
    'text-size': 10,
    'icon-image': 'ic_map_gh.9',
    'icon-text-fit': 'both',
    'icon-text-fit-padding': [1, 2, 1, 2],
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
  // labelLayerId: symbolLabelLayerId
},
/////////////////////////////
// 三维建筑
{
  id: '3d-ref', // 做线的基层使用，国道、省道
  type: 'fill',
  source: levelConfig.addLv7,
  'source-layer': 'SD_GRAILN_1107',
  layout: {},
  paint: {
    'fill-opacity': 0
  }
},

///////////////////////////////
// 点

{
  id: 'symbol-ref', // 做文字的基层使用
  type: 'fill',
  source: levelConfig.addLv7,
  'source-layer': 'POI_LEVEL_7',
  layout: {},
  paint: {
    'fill-opacity': 0
  }
},


{
  id: 'POI_LEVEL7', // POI图层
  type: 'symbol',
  source: levelConfig.addLv7,
  'source-layer': 'POI_LEVEL_7',
  layout: {
    'text-field': '{NAME}',
    visibility: 'visible',
    'symbol-placement': 'point',
    'text-size': 16,
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
    [levelConfig.addLv7]: {
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