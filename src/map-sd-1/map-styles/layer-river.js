/**
 * 7级图层配置
 */
import { MapSource } from './constant';

const ditchVisibleLevel = 14; // 沟和渠道显示等级

export default [
  {
    id: 'water-ref', // 做水的基层使用
    type: 'fill',
    source: MapSource,
    'source-layer': 'empty',
    paint: {
      'fill-opacity': 0,
    },
  },
  {
    id: 'GHYDPL_OTH', // 记录了一些水渠、河沟，水库的面状要素
    type: 'fill',
    source: MapSource,
    'source-layer': 'GHYDPL_Merge', // py是面
    filter: [
      'all',
      ['!=', 'CLASID', '210200'],
      ['!=', 'CLASID', '230101'],
      ['!=', 'CLASID', '240101'],
      ['!=', 'CLASID', '250100'],
    ],
    minzoom: ditchVisibleLevel,
    paint: {
      'fill-color': '#b3d8ff',
      'fill-opacity': 1,
      'fill-antialias': false,
    },
  },
];
