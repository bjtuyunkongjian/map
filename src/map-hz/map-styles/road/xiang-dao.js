import { LevelConfig } from 'tuyun-config';

const XiangDao = [
  {
    id: 'xiangdao_bg', //乡道
    type: 'line',
    source: LevelConfig.addLv7,
    'source-layer': 'XiangD',
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
          [12, 3],
          [13, 5],
          [14, 6],
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
    }
  },
  {
    id: 'xiangdao',
    type: 'line',
    source: LevelConfig.addLv7,
    'source-layer': 'XiangD',
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
          [12, 3],
          [13, 4],
          [14, 5],
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
      'line-color': '#fff'
    }
  }
];

export default XiangDao;
