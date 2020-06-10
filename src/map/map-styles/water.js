const ditchVisibleLevel = 14;

const layers = [
  //
  {
    id: 'GBOULN', // 记录了各个镇的边界，有名字的记录的是省界和岛屿（name不为空）
    type: 'line',
    source: 'water-7',
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
      'line-color': '#ff0000',
      // 'line-dasharray': [5, 4]
    },
  },
  // 水系
  {
    id: 'GHYDPL_7L', // 记录了一些水渠、河沟，水库的面状要素
    type: 'fill',
    source: 'water-7',
    'source-layer': 'GHYDPL_Merge', // py是面
    filter: [
      'any',
      ['==', 'CLASID', '210200'],
      ['==', 'CLASID', '230101'],
      ['==', 'CLASID', '240101'],
      ['==', 'CLASID', '250100'],
    ],
    paint: {
      'fill-color': '#b3d8ff',
      'fill-opacity': 1,
      'fill-antialias': false,
    },
  },
  {
    id: 'GHYDPL_7L_OTH', // 记录了一些水渠、河沟，水库的面状要素
    type: 'fill',
    source: 'water-7',
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
  // {
  //   id: 'GHYDPL_15L', // 记录了一些水渠、河沟，水库的面状要素
  //   type: 'fill',
  //   source: 'water-15',
  //   'source-layer': 'GHYDPL',
  //   paint: {
  //     'fill-color': '#b3d8ff',
  //     'fill-opacity': 1,
  //     'fill-antialias': false,
  //   },
  // },
];

export default layers;
