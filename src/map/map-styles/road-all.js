export default [
  {
    id: 'all_bg',
    type: 'line',
    source: 'bff-tile-source',
    'source-layer': 'all_road',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
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
          [22, 26],
        ],
      },
      'line-color': '#d8d8d8',
    },
  },
  {
    id: 'all', // 路网图层（name字段），县道
    type: 'line',
    source: 'bff-tile-source',
    'source-layer': 'all_road',

    layout: {
      'line-cap': 'round',
      'line-join': 'round',
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
          [22, 24],
        ],
      },
      'line-color': '#fff',
    },
  },
];
