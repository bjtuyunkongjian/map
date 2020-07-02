const symbolLabelLayerId = 'symbol-ref';

export default [
  {
    id: 'GHYDPL_7L', // 记录了一些水渠、河沟，水库的面状要素
    type: 'fill',
    source: 'bff-tile-source',
    'source-layer': 'GHYDPL', // py是面
    filter: [
      'any',
      ['==', 'CLASID', '210200'],
      ['==', 'CLASID', '230101'],
      ['==', 'CLASID', '240101'],
      ['==', 'CLASID', '250100']
    ],
    paint: {
      'fill-color': '#b3d8ff',
      'fill-opacity': 1,
      'fill-antialias': false
    },
    labelLayerId: 'GVEGPL'
  },
  {
    id: 'GHYDPL_OTH', // 记录了一些水渠、河沟，水库的面状要素
    type: 'fill',
    source: 'bff-tile-source',
    'source-layer': 'GHYDPL', // py是面
    filter: [
      'all',
      ['!=', 'CLASID', '210200'],
      ['!=', 'CLASID', '230101'],
      ['!=', 'CLASID', '240101'],
      ['!=', 'CLASID', '250100']
    ],
    minzoom: 14,
    layout: {},
    paint: {
      'fill-color': '#b3d8ff',
      'fill-opacity': 1,
      'fill-antialias': false
    },
    labelLayerId: 'GVEGPL'
  },
  {
    id: 'GHYDPL_7L_NAME',
    type: 'symbol',
    source: 'bff-tile-source',
    'source-layer': 'GHYDPL',
    filter: ['==', 'CLASID', '250100'],
    layout: {
      'text-field': '{NAME}',
      visibility: 'visible',
      'symbol-placement': 'point',
      'text-size': 14,
      'icon-text-fit': 'both',
      'icon-text-fit-padding': [2, 4, 2, 4],
      'text-justify': 'center',
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport',
      'text-anchor': 'center',
      'text-keep-upright': false
    },
    paint: {
      'text-color': 'rgba(65, 65, 65, 0.9)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    },
    labelLayerId: symbolLabelLayerId
  }
];
