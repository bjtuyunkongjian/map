import { MapSource } from './constant';

const ditchVisibleLevel = 14; // 沟和渠道显示等级

export default [
  {
    id: 'water-ref', // 记录了一些水渠、河沟，水库的面状要素
    type: 'fill',
    source: MapSource,
    'source-layer': 'GHYDPL_Merge', // py是面
    filter: [
      'any',
      ['==', 'CLASID', '210200'],
      ['==', 'CLASID', '230101'],
      ['==', 'CLASID', '240101'],
      ['==', 'CLASID', '250100'],
    ],
    paint: {
      'fill-color': '#192634',
      'fill-opacity': 1,
      'fill-antialias': false,
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
      'fill-color': '#192634',
      'fill-opacity': 1,
      'fill-antialias': false,
    },
  },
];
