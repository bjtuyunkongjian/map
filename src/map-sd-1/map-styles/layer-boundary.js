/**
 * 7级图层配置
 */
import { MapSource } from './constant';

export default [
  {
    id: 'GBOULN', // 记录了各个镇的边界，有名字的记录的是省界和岛屿（name不为空）
    type: 'line',
    source: MapSource,
    'source-layer': 'GBOULN', // LN，line的简写
    filter: [
      'any',
      ['==', 'CLASID', '630201'],
      ['==', 'CLASID', '630202'],
      ['==', 'CLASID', '640201'],
      ['==', 'CLASID', '250100'],
    ],
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-width': 1,
      'line-color': '#cdcdcd',
      // 'line-dasharray': [5, 4]
    },
  },
  // 派出所辖区
  {
    id: 'POLICE_STATION_JUR', // 区,县,县城边界
    type: 'fill',
    source: MapSource,
    'source-layer': 'FQ_JYGLFQ_PCS_PG1',
    filter: [
      'all',
      ['!=', 'CLASID', '210200'],
      ['!=', 'CLASID', '230101'],
      ['!=', 'CLASID', '240101'],
      ['!=', 'CLASID', '250100'],
    ],
    layout: {
      visibility: 'none',
    },
  },

  {
    id: 'POI_LEVEL7', // POI图层
    type: 'symbol',
    source: MapSource,
    'source-layer': 'POI_LEVEL_7',
    // maxzoom: maxzoom,
    layout: {
      'text-field': '{NAME}',
      visibility: 'visible',
      'symbol-placement': 'point',
      'text-size': 16,
      'text-padding': 4,
      'icon-image': 'ic_map_{KIND}',
      'text-justify': 'left',
      'text-anchor': 'left',
      'text-offset': [0.5, 0],
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport',
    },
    paint: {
      'text-color': 'rgba(65, 65, 65, 1)', // ['get', ['get', 'KIND'], ['literal', FontColor]]
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)',
    },
  },
];
