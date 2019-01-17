const lineLabelLayerId = 'line-ref';
const symbolLabelLayerId = 'line-name-ref';
// const lineBgLabelLayerId = 'line-bg-ref';

export default [
  {
    id: 'gjl_bg', //高架路背景
    type: 'line',
    source: 'bff-tile-source',
    'source-layer': 'gjlGDB',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
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
          [12, 5],
          [13, 7],
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
      'line-color': '#d8d8d8'
    },
    labelLayerId: lineLabelLayerId
  },
  {
    id: 'gjl', //高架路
    type: 'line',
    source: 'bff-tile-source',
    'source-layer': 'gjlGDB',
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
          [12, 4],
          [13, 6],
          [14, 8],
          [15, 7],
          [16, 7],
          [17, 9],
          [18, 11],
          [19, 11],
          [20, 19],
          [21, 22],
          [22, 24]
        ]
      },
      'line-color': '#fed669'
    },
    labelLayerId: lineLabelLayerId
  },
  {
    id: 'gjl_name',
    type: 'symbol',
    source: 'bff-tile-source',
    'source-layer': 'gjlGDB',
    // minzoom: _visibleLevel,
    layout: {
      'text-field': {
        stops: [[7, ''], [13, '{NAME}']]
      },
      visibility: 'visible',
      'symbol-placement': 'line',
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'symbol-spacing': 500,

      'text-rotation-alignment': 'map',
      'text-size': 12,
      'icon-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': 'rgba(65, 65, 65, 0.9)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    },
    labelLayerId: symbolLabelLayerId
  }
];
