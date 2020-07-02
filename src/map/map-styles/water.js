const ditchVisibleLevel = 14;

const layers = [
  //
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
];

export default layers;
