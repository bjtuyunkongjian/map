import { LevelConfig } from 'tuyun-config';

const XianDao = [
  {
    id: 'xd_bg', // 县道背景
    type: 'line',
    source: LevelConfig.addLv7,
    'source-layer': 'XianD',
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
          [15, 8],
          [16, 8],
          [17, 10],
          [18, 14],
          [19, 14],
          [20, 22],
          [21, 24],
          [22, 26]
        ]
      },
      'line-color': '#d8d8d8'
    }
  },
  {
    id: 'xd', // 路网图层（name字段），县道
    type: 'line',
    source: LevelConfig.addLv7,
    'source-layer': 'XianD',
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
    }
  }
];

export default XianDao;