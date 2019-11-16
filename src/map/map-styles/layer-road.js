import { LevelConfig } from 'tuyun-config';

const roadXiaolu = [
  {
    id: 'LV15_XL_bg', // 15级小路背景
    type: 'line',
    source: LevelConfig.addLv7,
    'source-layer': 'XiaoL',
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-width': {
        base: 2,
        stops: [
          [15, 7],
          [16, 9.5],
          [17, 11.5],
          [18, 13.5],
          [19, 15.5],
          [20, 16]
        ]
      },
      'line-color': '#d8d8d8'
    }
  },
  {
    id: 'LV15_XL', // 15级小路主色
    type: 'line',
    source: LevelConfig.addLv7,
    'source-layer': 'XiaoL',
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-width': {
        base: 2,
        stops: [
          [15, 5],
          [16, 7],
          [17, 11],
          [18, 15],
          [19, 16],
          [20, 14]
        ]
      },
      'line-color': '#FFFFFF'
    }
  }
];

const roadOther = [
  {
    id: 'other_bg', // 其他道路背景
    type: 'line',
    source: LevelConfig.addLv7,
    'source-layer': 'other',
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
    }
  },
  {
    id: 'other', // 路网图层（name字段），other
    type: 'line',
    source: LevelConfig.addLv7,
    'source-layer': 'other',
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
    }
  }
];

const roadGuodao = [
  {
    id: 'guodao_bg', // 国道背景
    type: 'line',
    source: LevelConfig.addLv7,
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
    source: LevelConfig.addLv7,
    'source-layer': 'GD',
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
      'line-color': '#fed669'
    }
  },
  {
    id: 'guodao_name', // 国道名称
    type: 'symbol',
    source: LevelConfig.addLv7,
    'source-layer': 'GD',
    layout: {
      'text-field': {
        stops: [
          [7, ''],
          [12, '{NAME}']
        ]
      },
      visibility: 'visible',
      'symbol-placement': 'line',
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'symbol-spacing': 500,
      'text-rotation-alignment': 'map',
      'text-size': {
        base: 0,
        stops: [
          [13, 10],
          [14, 12],
          [15, 12],
          [16, 13],
          [17, 13],
          [18, 15],
          [19, 15],
          [20, 15]
        ]
      },
      'icon-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': 'rgba(65, 65, 65, 1)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  }
];

export default [...roadXiaolu, ...roadOther, ...roadGuodao];
