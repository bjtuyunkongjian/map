import { LevelConfig } from 'tuyun-config';

const xiaolu = [
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

const zadao = [
  {
    id: 'zd_bg', //匝道背景
    type: 'line',
    source: LevelConfig.addLv7,
    'source-layer': 'ZD',
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
          [12, 7],
          [13, 5],
          [14, 6],
          [15, 8],
          [16, 8],
          [17, 8],
          [18, 10],
          [19, 14],
          [20, 22],
          [21, 24],
          [22, 26]
        ]
      },
      'line-color': '#fed669'
    }
  },
  {
    id: 'zd', // 路网图层（name字段），匝道/立交
    type: 'line',
    source: LevelConfig.addLv7,
    'source-layer': 'ZD',
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
          [12, 5],
          [13, 4],
          [14, 5],
          [15, 7],
          [16, 7],
          [17, 9],
          [18, 9],
          [19, 11],
          [20, 19],
          [21, 22],
          [22, 24]
        ]
      },
      'line-color': '#ffeebb'
    }
  }
];

const zhixian = [
  {
    id: 'zx_bg',
    type: 'line',
    source: LevelConfig.addLv7,
    'source-layer': 'ZX',
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
    id: 'zx', // 路网图层（name字段），县道
    type: 'line',
    source: LevelConfig.addLv7,
    'source-layer': 'ZX',

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

const cigandao = [
  {
    id: 'cgd_bg',
    type: 'line',
    source: LevelConfig.addLv7,
    'source-layer': 'CGD',
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
    id: 'cgd',
    type: 'line',
    source: LevelConfig.addLv7,
    'source-layer': 'CGD',
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

const xiangdao = [
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

const kuaisulu = [
  {
    id: 'ksl_bg', //快速路的背景
    type: 'line',
    source: LevelConfig.addLv7,
    'source-layer': 'KSL-GJ',
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
          [12, 7],
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
    id: 'ksl',
    type: 'line',
    source: LevelConfig.addLv7,
    'source-layer': 'KSL-GJ',
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
          [12, 5],
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

const zhugandao = [
  {
    id: '9L_zgd_bg', // 主干道背景
    type: 'line',
    source: LevelConfig.addLv7,
    'source-layer': 'ZGD',
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
      'line-color': '#ffae00'
    }
  },
  {
    id: '9L_zgd', // 路网图层（name字段），主干道
    type: 'line',
    source: LevelConfig.addLv7,
    'source-layer': 'ZGD',
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
      'line-color': '#ffeebb'
    }
  }
];

const xiandao = [
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

const shengdao = [
  {
    id: 'shengdao_bg', // 省道背景
    type: 'line',
    source: LevelConfig.addLv7,
    'source-layer': 'SD',
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-width': {
        base: 2,
        stops: [
          [8, 2],
          [9, 3],
          [10, 4],
          [11, 4],
          [12, 5],
          [13, 7],
          [14, 9],
          [15, 10],
          [16, 14],
          [17, 14],
          [18, 14],
          [19, 14],
          [20, 22],
          [21, 24],
          [22, 26]
        ]
      },
      'line-color': '#ffae00'
    }
  },
  {
    id: 'shengdao', // 路网图层（name字段），省道
    type: 'line',
    source: LevelConfig.addLv7,
    'source-layer': 'SD',
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-width': {
        base: 2,
        stops: [
          [8, 1],
          [9, 2],
          [10, 3],
          [11, 3],
          [12, 4],
          [13, 6],
          [14, 8],
          [15, 7],
          [16, 11],
          [17, 11],
          [18, 11],
          [19, 11],
          [20, 19],
          [21, 22],
          [22, 24]
        ]
      },
      'line-color': '#ffeebb'
    }
  }
];

const guodao = [
  {
    id: 'guodao_bg', // 国道背景
    type: 'line',
    source: LevelConfig.addLv7,
    'source-layer': 'GD',
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
  }
];

const gaosu = [
  {
    id: 'gjl_bg',
    type: 'line',
    source: LevelConfig.addLv7,
    'source-layer': 'GS',
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
    }
  },
  {
    id: 'gjl',
    type: 'line',
    source: LevelConfig.addLv7,
    'source-layer': 'GS',
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

export default [
  ...xiaolu,
  ...zadao,
  ...zhixian,
  ...cigandao,
  ...xiangdao,
  ...kuaisulu,
  ...zhugandao,
  ...xiandao,
  ...shengdao,
  ...guodao,
  ...gaosu
];
