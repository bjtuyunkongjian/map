import { MapSource } from './constant';

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
  {
    id: 'GROALN_other_NAME',
    type: 'symbol',
    source: MapSource,
    'source-layer': 'GROALN_other', // LN，line的简写
    filter: ['!=', 'CLASID', '430503'],
    layout: {
      'text-field': '{NAME}',
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
      'text-color': '#747474',
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

const kuaisulu = [
  {
    id: 'ksl_name', // 快速路名称
    type: 'symbol',
    source: MapSource,
    'source-layer': 'kslGDB',
    layout: {
      'text-field': {
        stops: [
          [7, ''],
          [13, '{NAME}'],
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

const cigandao = [
  {
    id: 'cgd_name', // 次干道
    type: 'symbol',
    source: MapSource,
    'source-layer': 'cgdGDB',
    layout: {
      'text-field': {
        stops: [
          [7, ''],
          [14, '{NAME}'],
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

const zhugandao = [
  {
    id: '9L_zgd_name', // 主干道名称
    type: 'symbol',
    source: MapSource,
    'source-layer': 'zgdGDB',
    layout: {
      'text-field': {
        stops: [
          [7, ''],
          [13, '{NAME}'],
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
    id: 'xd_name', // xiandao
    type: 'symbol',
    source: MapSource,
    'source-layer': 'xiandaoGDB',
    layout: {
      'text-field': {
        stops: [
          [7, ''],
          [13, '{NAME}'],
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
    'source-layer': 'shengGDBt',
    layout: {
      'text-field': {
        stops: [
          [7, ''],
          [13, '{NAME}'],
        ],
      },
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
    'source-layer': 'shengGDBt',
    filter: ['!=', 'ENTIID', ''],
    layout: {
      'text-field': '{ENTIID}',
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
    id: 'guodao_name', // 国道名称
    type: 'symbol',
    source: MapSource,
    'source-layer': 'gaoguoGDB',
    layout: {
      'text-field': {
        stops: [
          [7, ''],
          [12, '{NAME}'],
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
  {
    id: 'guodao_icon', // 国道图标
    type: 'symbol',
    source: MapSource,
    'source-layer': 'gaoguoGDB',
    filter: ['!=', 'ENTIID', ''],
    layout: {
      'text-field': '{ENTIID}',
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
];

const gaosu = [
  {
    id: 'gjl_name',
    type: 'symbol',
    source: MapSource,
    'source-layer': 'gjlGDB',
    // minzoom: _visibleLevel,
    layout: {
      'text-field': {
        stops: [
          [7, ''],
          [13, '{NAME}'],
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
  ...kuaisulu,
  ...cigandao,
  ...zhugandao,
  ...xiandao,
  ...gaosu,
  ...shengdao,
  ...guodao,
];
