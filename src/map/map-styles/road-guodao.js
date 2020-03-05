const layers = [
  {
    id: 'guodao_bg', // 国道背景
    type: 'line',
    source: 'bff-tile-source',
    'source-layer': 'gaoguoGDB',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-width': {
        base: 2,
        stops: [
          [7, 1],
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
      'line-color': '#f9bd09'
    }
  },
  {
    id: 'guodao', // 路网图层（name字段），国道
    type: 'line',
    source: 'bff-tile-source',
    'source-layer': 'gaoguoGDB',
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-width': {
        base: 2,
        stops: [
          [7, 1],
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
      'line-color': '#0000ff'
    }
  }
];

export default layers;
