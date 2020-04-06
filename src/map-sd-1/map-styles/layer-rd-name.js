import { MapSource } from './constant';

const roadNameArr = [];

const rdNameRef = [
  {
    id: 'road-name-ref', // 做线的基层使用，铁路
    type: 'fill',
    source: MapSource,
    'source-layer': 'empty',
    paint: {
      'fill-opacity': 0,
    },
  },
];

const otherRd = [
  {
    id: 'other-name', // other名称
    type: 'symbol',
    source: MapSource,
    'source-layer': 'other',
    layout: {
      'text-field': {
        stops: [
          [7, ''],
          [16, '{NAME}'],
        ],
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
          [16, 11],
          [17, 11],
          [18, 12],
          [19, 12],
          [20, 12],
        ],
      },
      'icon-rotation-alignment': 'viewport',
    },
    paint: {
      'text-color': 'rgba(65, 65, 65, 1)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)',
    },
  },
];

const zhixian = [
  {
    id: 'zhixian_name',
    type: 'symbol',
    source: MapSource,
    'source-layer': 'zxGDB',

    layout: {
      'text-field': {
        stops: [
          [7, ''],
          [15, '{NAME}'],
        ],
      },
      visibility: 'visible',
      'symbol-placement': 'line',
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'symbol-spacing': 500,
      'text-rotation-alignment': 'map',
      'text-size': {
        base: 10,
        stops: [
          [15, 10],
          [16, 10],
          [17, 11],
          [18, 11],
          [19, 12],
          [20, 12],
        ],
      },
      'icon-rotation-alignment': 'viewport',
    },
    paint: {
      'text-color': 'rgba(65, 65, 65, 0.8)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)',
    },
  },
];

const xiangdao = [
  {
    id: 'xiangdao_name',
    type: 'symbol',
    source: MapSource,
    'source-layer': 'xiangdaoGDB',
    layout: {
      'text-field': {
        stops: [
          [7, ''],
          [15, '{NAME}'],
        ],
      },
      visibility: 'visible',
      'symbol-placement': 'line',
      'text-font': ['黑体'],
      'symbol-spacing': 500,
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'map',
      'text-size': {
        base: 10,
        stops: [
          [15, 10],
          [16, 10],
          [17, 11],
          [18, 11],
          [19, 12],
          [20, 12],
        ],
      },
      'icon-rotation-alignment': 'viewport',
    },
    paint: {
      'text-color': 'rgba(65, 65, 65, 0.9)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)',
    },
  },
];

const zadao = [
  {
    id: 'zd_name',
    type: 'symbol',
    source: MapSource,
    'source-layer': 'ZD',
    layout: {
      'text-field': {
        stops: [
          [7, ''],
          [13, '{FNAME}'],
        ],
      },
      visibility: 'visible',
      'symbol-placement': 'line',
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'symbol-spacing': 500,
      'text-rotation-alignment': 'map',
      'text-size': 10,
      'icon-rotation-alignment': 'viewport',
    },
    paint: {
      'text-color': 'rgba(65, 65, 65, 0.9)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)',
    },
  },
];

const cigandao = [
  {
    id: 'cgd_name', // 次干道
    type: 'symbol',
    source: MapSource,
    'source-layer': 'CGD',
    layout: {
      'text-field': {
        stops: [
          [7, ''],
          [14, '{FNAME}'],
        ],
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
          [14, 10],
          [15, 10],
          [16, 11],
          [17, 11],
          [18, 12],
          [19, 12],
          [20, 12],
        ],
      },
      'icon-rotation-alignment': 'viewport',
    },
    paint: {
      'text-color': 'rgba(65, 65, 65, 0.9)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)',
    },
  },
];

const kuaisulu = [
  {
    id: 'ksl_name', // 快速路名称
    type: 'symbol',
    source: MapSource,
    'source-layer': 'KSL-GJ',
    layout: {
      'text-field': {
        stops: [
          [7, ''],
          [13, '{FNAME}'],
        ],
      },
      visibility: 'visible',
      'symbol-placement': 'line',
      'text-font': ['黑体'],
      'symbol-spacing': 500,
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'map',
      'text-size': {
        base: 0,
        stops: [
          [13, 10],
          [14, 10],
          [15, 11],
          [16, 11],
          [17, 12],
          [18, 12],
          [19, 12],
          [20, 12],
        ],
      },
      'icon-rotation-alignment': 'viewport',
    },
    paint: {
      'text-color': 'rgba(65, 65, 65, 0.9)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)',
    },
  },
];

const zhugandao = [
  {
    id: 'zgd_name', // 主干道名称
    type: 'symbol',
    source: MapSource,
    'source-layer': 'ZGD',
    layout: {
      'text-field': {
        stops: [
          [7, ''],
          [13, '{FNAME}'],
        ],
      },
      visibility: 'visible',
      'symbol-placement': 'line',
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'symbol-spacing': 500,
      'text-rotation-alignment': 'map',
      'text-size': {
        base: 10,
        stops: [
          [13, 10],
          [14, 10],
          [15, 12],
          [16, 12],
          [17, 12],
          [18, 14],
          [19, 14],
          [20, 14],
        ],
      },
      'icon-rotation-alignment': 'viewport',
    },
    paint: {
      'text-color': 'rgba(65, 65, 65, 0.9)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)',
    },
  },
];

const xiandao = [
  {
    id: 'xiandao_name', // xiandao
    type: 'symbol',
    source: MapSource,
    'source-layer': 'XianD',
    layout: {
      'text-field': {
        stops: [
          [7, ''],
          [13, '{FNAME}'],
        ],
      },
      visibility: 'visible',
      'symbol-placement': 'line',
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'symbol-spacing': 500,
      'text-rotation-alignment': 'map',
      'text-size': {
        base: 10,
        stops: [
          [13, 10],
          [14, 10],
          [15, 11],
          [16, 11],
          [17, 12],
          [18, 12],
          [19, 12],
          [20, 12],
        ],
      },
      'icon-rotation-alignment': 'viewport',
    },
    paint: {
      'text-color': 'rgba(65, 65, 65, 0.9)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)',
    },
  },
];

const shengdao = [
  {
    id: 'shengdao_name', // 省道名称
    type: 'symbol',
    source: MapSource,
    'source-layer': 'SD',
    layout: {
      'text-field': '{FNAME}',
      visibility: 'visible',
      'symbol-placement': 'line',
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'symbol-spacing': 500,
      'text-rotation-alignment': 'map',
      'text-size': {
        base: 11,
        stops: [
          [13, 11],
          [14, 12],
          [15, 12],
          [16, 13],
          [17, 13],
          [18, 14],
          [19, 14],
          [20, 14],
        ],
      },
      'icon-rotation-alignment': 'viewport',
    },
    paint: {
      'text-color': 'rgba(65, 65, 65, 1)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)',
    },
  },

  {
    id: 'shengdao_icon', // 省道图标
    type: 'symbol',
    source: MapSource,
    'source-layer': 'SD',
    filter: ['!=', 'ROADCODE', ''],
    layout: {
      'text-field': '{ROADCODE}',
      visibility: 'visible',
      'symbol-placement': 'line',
      'text-size': 10,
      'icon-image': 'ic_map_sh.9',
      'icon-text-fit': 'both',
      'icon-text-fit-padding': [1, 2, 1, 2],
      'text-justify': 'center',
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport',
      'text-anchor': 'center',
      'text-keep-upright': false,
    },
    paint: {
      'text-color': '#FFFFFF',
    },
  },
];

const guodao = [
  {
    id: 'guodao_icon', // 国道图标
    type: 'symbol',
    source: MapSource,
    'source-layer': 'GD',
    filter: ['!=', 'ROADCODE', ''],
    layout: {
      'text-field': '{ROADCODE}',
      visibility: 'visible',
      'symbol-placement': 'line',
      'text-size': 10,
      'icon-image': 'ic_map_gh.9',
      'icon-text-fit': 'both',
      'icon-text-fit-padding': [1, 2, 1, 2],
      'text-justify': 'center',
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport',
      'text-anchor': 'center',
      'text-keep-upright': false,
    },
    paint: {
      'text-color': '#FFFFFF',
    },
  },
  {
    id: 'guodao_name', // 国道名称
    type: 'symbol',
    source: MapSource,
    'source-layer': 'GD',
    layout: {
      'text-field': '{FNAME}',
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
          [20, 15],
        ],
      },
      'icon-rotation-alignment': 'viewport',
    },
    paint: {
      'text-color': 'rgba(65, 65, 65, 1)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)',
    },
  },
];

const gaosu = [
  {
    id: 'gaosu_name',
    type: 'symbol',
    source: MapSource,
    'source-layer': 'GS',
    // minzoom: _visibleLevel,
    layout: {
      'text-field': {
        stops: [
          [7, ''],
          [13, '{FNAME}'],
        ],
      },
      visibility: 'visible',
      'symbol-placement': 'line',
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'symbol-spacing': 500,

      'text-rotation-alignment': 'map',
      'text-size': 12,
      'icon-rotation-alignment': 'viewport',
    },
    paint: {
      'text-color': 'rgba(65, 65, 65, 0.9)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)',
    },
  },
]; // 高速

export default [
  ...rdNameRef,
  ...otherRd,
  ...zhixian,
  ...xiangdao,

  ...zadao,
  ...cigandao,
  ...kuaisulu,
  ...zhugandao,
  ...xiandao,
  ...gaosu,
  ...shengdao,
  ...guodao,
];
