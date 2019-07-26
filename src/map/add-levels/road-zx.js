const lineLabelLayerId = 'line-ref';
const lineBgLabelLayerId = 'line-bg-ref';
const symbolLabelLayerId = 'symbol-ref';

export default [
  {
    id: 'zx_bg',
    type: 'line',
    source: 'bff-tile-source',
    'source-layer': 'zxGDB',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-width': {
        base: 2,
        stops: [
          [14, 3],
          [15, 5],
          [16, 10],
          [17, 12],
          [18, 14],
          [19, 14],
          [20, 22],
          [21, 24],
          [22, 26]
        ]
      },
      'line-color': '#d8d8d8'
    },
    labelLayerId: lineBgLabelLayerId
  },
  {
    id: 'zx', // 路网图层（name字段），县道
    type: 'line',
    source: 'bff-tile-source',
    'source-layer': 'zxGDB',

    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-width': {
        base: 2,
        stops: [
          [14, 2],
          [15, 4],
          [16, 7],
          [17, 9],
          [18, 11],
          [19, 11],
          [20, 19],
          [21, 22],
          [22, 24]
        ]
      },
      'line-color': '#fff'
    },
    labelLayerId: lineLabelLayerId
  },
  {
    id: 'zx_name',
    type: 'symbol',
    source: 'bff-tile-source',
    'source-layer': 'zxGDB',

    layout: {
      'text-field': {
        stops: [[7, ''], [15, '{NAME}']]
      },
      visibility: 'visible',
      'symbol-placement': 'line',
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'symbol-spacing': 500,
      'text-rotation-alignment': 'map',
      'text-size': {
        base: 10,
        stops: [[15, 10], [16, 10], [17, 11], [18, 11], [19, 12], [20, 12]]
      },
      'icon-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': 'rgba(65, 65, 65, 0.8)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    },
    labelLayerId: symbolLabelLayerId
  }
];
