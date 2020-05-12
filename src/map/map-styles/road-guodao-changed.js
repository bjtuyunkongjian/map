const layers = [
  {
    id: 'guodao_bg', // 国道背景
    type: 'line',
    source: 'bff-tile-source',
    'source-layer': 'gaoguoGDB',
    layout: {
      'line-join': 'round',
      'line-cap': 'butt',
    },
    paint: {
      'line-width': {
        stops: [
          [7, 21],
          [22, 66],
        ],
      },
      'line-color': '#000000',
    },
  },
  {
    id: 'guodao', // 路网图层（name字段），国道
    type: 'line',
    source: 'bff-tile-source',
    'source-layer': 'gaoguoGDB',
    layout: {
      'line-cap': 'butt',
      'line-join': 'round',
    },
    paint: {
      'line-width': {
        stops: [
          [7, 1],
          [21, 3],
        ],
      },
      'line-gap-width': {
        stops: [
          [7, 7],
          [22, 22],
        ],
      },
      'line-color': '#ffffff',
      'line-dasharray': [10, 10],
    },
  },
];

export default layers;
