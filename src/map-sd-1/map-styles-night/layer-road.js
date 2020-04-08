import { MapSource } from './constant';

const tielu = [
  {
    id: 'road-ref', // 做线的基层使用，铁路
    type: 'fill',
    source: MapSource,
    'source-layer': 'empty',
    paint: {
      'fill-opacity': 0,
    },
  },
  {
    id: 'GRAILN_bg', // 记录了铁路，底层颜色灰色
    type: 'line',
    source: MapSource,
    'source-layer': 'SD_GRAILN', // LN，line的简写
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-color': 'rgb(43, 43, 43)',
      'line-width': 2.4,
    },
  },
  {
    id: 'GRAILN', // 记录了铁路，间隔白色
    type: 'line',
    source: MapSource,
    'source-layer': 'SD_GRAILN', // LN，line的简写
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-color': 'rgb(69, 69, 69)',
      'line-dasharray': [5, 5],
      'line-width': 1.6,
    },
  },
];

const otherRd = [
  {
    id: 'other_bg', // 其他道路背景
    type: 'line',
    source: MapSource,
    'source-layer': 'other',
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
    id: 'other', // 路网图层（name字段），other
    type: 'line',
    source: MapSource,
    'source-layer': 'other',
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
  {
    id: 'GROALN_other_ZD_bg', // 路网图层（name字段），栈道、内部道路、机耕路、乡村路、小路 + 专用公路、其他公路、村道
    type: 'line',
    source: MapSource,
    filter: [
      'any',
      ['==', 'CLASID', '420400'],
      ['==', 'CLASID', '420500'],
      ['==', 'CLASID', '420700'],
      ['==', 'CLASID', '430400'],
      // ['==', 'CLASID', '430503'],
      ['==', 'CLASID', '430531'],
      ['==', 'CLASID', '430532'],
      ['==', 'CLASID', '430533'],
      ['==', 'CLASID', '430600'],
      ['==', 'CLASID', '430700'],
      ['==', 'CLASID', '440100'],
      ['==', 'CLASID', '440200'],
      ['==', 'CLASID', '440300'],
      ['==', 'CLASID', '440600'],
    ],
    'source-layer': 'GROALN_other',
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-width': {
        base: 2,
        stops: [
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
      'line-color': '#25262d',
    },
  },
  {
    id: 'GROALN_other_ZD', // 路网图层（name字段），栈道、内部道路、机耕路、乡村路、小路 + 专用公路、其他公路、村道
    type: 'line',
    source: MapSource,
    filter: [
      'any',
      ['==', 'CLASID', '420400'],
      ['==', 'CLASID', '420500'],
      ['==', 'CLASID', '420700'],
      ['==', 'CLASID', '430400'],
      // ['==', 'CLASID', '430503'],
      ['==', 'CLASID', '430531'],
      ['==', 'CLASID', '430532'],
      ['==', 'CLASID', '430533'],
      ['==', 'CLASID', '430600'],
      ['==', 'CLASID', '430700'],
      ['==', 'CLASID', '440100'],
      ['==', 'CLASID', '440200'],
      ['==', 'CLASID', '440300'],
      ['==', 'CLASID', '440600'],
    ],
    'source-layer': 'GROALN_other',
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-width': {
        base: 2,
        stops: [
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
      'line-color': '#1d4e32',
    },
  },
  ///////////////////
  {
    id: 'GROALN_other_CGD_bg', // 路网图层（name字段），次干道、县道
    type: 'line',
    source: MapSource,
    filter: [
      'any',
      ['==', 'CLASID', '420301'],
      ['==', 'CLASID', '420302'],
      ['==', 'CLASID', '430502'],
    ],
    'source-layer': 'GROALN_other',
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
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
          [20, 16],
        ],
      },
      'line-color': 'rgb(43, 43, 43)',
    },
  },
  {
    id: 'GROALN_other_CGD', // 路网图层（name字段），次干道、县道
    type: 'line',
    source: MapSource,
    filter: [
      'any',
      ['==', 'CLASID', '420301'],
      ['==', 'CLASID', '420302'],
      ['==', 'CLASID', '430502'],
    ],
    'source-layer': 'GROALN_other',
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
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
          [20, 14],
        ],
      },
      'line-color': 'rgb(69, 69, 69)',
    },
  },
  /////////////////////
  {
    id: 'GROALN_other_ZGD_bg', // 路网图层（name字段），主干道
    type: 'line',
    source: MapSource,
    filter: ['==', 'CLASID', '430501'],
    'source-layer': 'GROALN_other',
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-width': {
        base: 2,
        stops: [
          [15, 6],
          [16, 9.5],
          [17, 12.5],
          [18, 15.5],
          [19, 17.5],
          [20, 16],
        ],
      },
      'line-color': 'rgb(43, 43, 43)',
    },
  },
  {
    id: 'GROALN_other_ZGD', // 路网图层（name字段），主干道
    type: 'line',
    source: MapSource,
    filter: ['==', 'CLASID', '430501'],
    'source-layer': 'GROALN_other',
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-width': {
        base: 2,
        stops: [
          [15, 5],
          [16, 8],
          [17, 11],
          [18, 14],
          [19, 14],
          [20, 14],
        ],
      },
      'line-color': 'rgb(69, 69, 69)',
    },
  },
  ////////////////////////
  {
    id: 'GROALN_other_KSL_bg', // 路网图层（name字段），背景充当描边 快速路，高架路
    type: 'line',
    source: MapSource,
    filter: ['any', ['==', 'CLASID', '430200'], ['==', 'CLASID', '430300']],
    'source-layer': 'GROALN_other',
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-width': {
        base: 2,
        stops: [
          [15, 8.5],
          [16, 8.5],
          [17, 10],
          [18, 12.5],
          [19, 12.5],
          [20, 20],
        ],
      },
      'line-color': '#25262d',
    },
  },
  {
    id: 'GROALN_other_KSL', // 路网图层（name字段） 快速路，高架路
    type: 'line',
    source: MapSource,
    filter: ['any', ['==', 'CLASID', '430200'], ['==', 'CLASID', '430300']],
    'source-layer': 'GROALN_other',
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
    },
    paint: {
      'line-width': {
        base: 2,
        stops: [
          [15, 7],
          [16, 7],
          [17, 9],
          [18, 11],
          [19, 11],
          [20, 19],
        ],
      },
      'line-color': '#1d4e32',
    },
  },
];

const zhixian = [
  {
    id: 'zx_bg',
    type: 'line',
    source: MapSource,
    'source-layer': 'zxGDB',
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
      'line-color': 'rgb(43, 43, 43)',
    },
  },
  {
    id: 'zx', // 路网图层（name字段），县道
    type: 'line',
    source: MapSource,
    'source-layer': 'zxGDB',

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
      'line-color': 'rgb(69, 69, 69)',
    },
  },
];

const xiangdao = [
  {
    id: 'xiangdao_bg', //乡道
    type: 'line',
    source: MapSource,
    'source-layer': 'xiangdaoGDB',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
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
          [22, 26],
        ],
      },
      'line-color': 'rgb(43, 43, 43)',
    },
  },
  {
    id: 'xiangdao',
    type: 'line',
    source: MapSource,
    'source-layer': 'xiangdaoGDB',
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
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
          [22, 24],
        ],
      },
      'line-color': 'rgb(69, 69, 69)',
    },
  },
];

const kuaisulu = [
  {
    id: 'ksl_bg', //快速路的背景
    type: 'line',
    source: MapSource,
    'source-layer': 'kslGDB',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
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
          [22, 26],
        ],
      },
      'line-color': 'rgb(43, 43, 43)',
    },
  },
  {
    id: 'ksl',
    type: 'line',
    source: MapSource,
    'source-layer': 'kslGDB',
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
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
          [22, 24],
        ],
      },
      'line-color': 'rgb(69, 69, 69)',
    },
  },
];

const cigandao = [
  {
    id: 'cgd_bg',
    type: 'line',
    source: MapSource,
    'source-layer': 'cgdGDB',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
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
          [22, 26],
        ],
      },
      'line-color': 'rgb(43, 43, 43)',
    },
  },
  {
    id: 'cgd',
    type: 'line',
    source: MapSource,
    'source-layer': 'cgdGDB',
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
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
          [22, 24],
        ],
      },
      'line-color': 'rgb(69, 69, 69)',
    },
  },
];

const zhugandao = [
  {
    id: '9L_zgd_bg', // 主干道背景
    type: 'line',
    source: MapSource,
    'source-layer': 'zgdGDB',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
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
          [22, 26],
        ],
      },
      'line-color': 'rgb(43, 43, 43)',
    },
  },
  {
    id: '9L_zgd', // 路网图层（name字段），主干道
    type: 'line',
    source: MapSource,
    'source-layer': 'zgdGDB',
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
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
          [22, 24],
        ],
      },
      'line-color': 'rgb(69, 69, 69)',
    },
  },
];

const xiandao = [
  {
    id: 'xd_bg', // 县道背景
    type: 'line',
    source: MapSource,
    'source-layer': 'xiandaoGDB',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
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
          [22, 26],
        ],
      },
      'line-color': 'rgb(43, 43, 43)',
    },
  },
  {
    id: 'xd', // 路网图层（name字段），县道
    type: 'line',
    source: MapSource,
    'source-layer': 'xiandaoGDB',
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
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
          [22, 24],
        ],
      },
      'line-color': 'rgb(69, 69, 69)',
    },
  },
];

const gaosu = [
  {
    id: 'gjl_bg', //高架路背景
    type: 'line',
    source: MapSource,
    'source-layer': 'gjlGDB',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
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
          [22, 26],
        ],
      },
      'line-color': 'rgb(43, 43, 43)',
    },
  },
  {
    id: 'gjl', //高架路
    type: 'line',
    source: MapSource,
    'source-layer': 'gjlGDB',
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
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
          [22, 24],
        ],
      },
      'line-color': 'rgb(69, 69, 69)',
    },
  },
];

const shengdao = [
  {
    id: 'shengdao_bg', // 省道背景
    type: 'line',
    source: MapSource,
    'source-layer': 'shengGDBt',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
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
          [22, 26],
        ],
      },
      'line-color': '#22332f',
    },
  },
  {
    id: 'shengdao', // 路网图层（name字段），省道
    type: 'line',
    source: MapSource,
    'source-layer': 'shengGDBt',
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
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
          [22, 24],
        ],
      },
      'line-color': '#6c0',
    },
  },
];

const guodao = [
  {
    id: 'guodao_bg', // 国道背景
    type: 'line',
    source: MapSource,
    'source-layer': 'gaoguoGDB',
    layout: {
      'line-join': 'round',
      'line-cap': 'round',
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
          [22, 26],
        ],
      },
      'line-color': '#1d4e32',
    },
  },
  {
    id: 'guodao', // 路网图层（name字段），国道
    type: 'line',
    source: MapSource,
    'source-layer': 'gaoguoGDB',
    layout: {
      'line-cap': 'round',
      'line-join': 'round',
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
          [22, 24],
        ],
      },
      'line-color': '#60bd03',
    },
  },
];

export default [
  ...tielu,
  ...otherRd,
  ...zhixian,
  ...xiangdao,
  ...kuaisulu,
  ...cigandao,
  ...zhugandao,
  ...xiandao,
  ...gaosu,
  ...shengdao,
  ...guodao,
];
