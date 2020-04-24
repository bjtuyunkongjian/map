const layers = [
  {
    id: 'guodao_bg', // 国道背景
    type: 'line',
    source: 'bff-tile-source',
    'source-layer': 'gaoguoGDB',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
    },
    paint: {
      'line-width': ['*', 20, ['get', 'zoom']],
      'line-color': '#000000',
    },
  },
  {
    id: 'guodao', // 路网图层（name字段），国道
    type: 'line',
    source: 'bff-tile-source',
    'source-layer': 'gaoguoGDB',
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-width': 2,
      'line-color': '#ffffff',
      'line-dasharray': [10, 10],
    },
  },
];

export default layers;
