import { LevelConfig } from 'tuyun-config';

const xiaoLname = [
  {
    id: 'xiaolu-name',
    type: 'symbol',
    source: LevelConfig.addLv7,
    'source-layer': 'XiaoL', // LN，line的简写
    layout: {
      'text-field': '{FNAME}',
      visibility: 'visible',
      'symbol-placement': 'line',
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'symbol-spacing': 500,
      'text-rotation-alignment': 'map',
      'text-size': 12,
      'icon-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': '#747474',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  }
];

const sdName = [
  {
    id: 'shengdao_name', // 省道名称
    type: 'symbol',
    source: LevelConfig.addLv7,
    'source-layer': 'SD',
    layout: {
      'text-field': {
        stops: [
          [7, ''],
          [13, '{NAME}']
        ]
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
          [20, 14]
        ]
      },
      'icon-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': 'rgba(65, 65, 65, 1)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  },
  {
    id: 'shengdao_icon', // 省道图标
    type: 'symbol',
    source: LevelConfig.addLv7,
    'source-layer': 'SD',
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
      'text-keep-upright': false
    },
    paint: {
      'text-color': '#FFFFFF'
    }
  }
];

const gdName = [
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
  },
  {
    id: 'guodao_icon', // 国道图标
    type: 'symbol',
    source: LevelConfig.addLv7,
    'source-layer': 'gaoguoGDB',
    layout: {
      'text-field': '{NAME}',
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
      'text-keep-upright': false
    },
    paint: {
      'text-color': '#FFFFFF'
    }
  }
];

const gsName = [
  {
    id: 'gaosu_name',
    type: 'symbol',
    source: LevelConfig.addLv7,
    'source-layer': 'GS',
    // minzoom: _visibleLevel,
    layout: {
      'text-field': {
        stops: [
          [7, ''],
          [13, '{NAME}']
        ]
      },
      visibility: 'visible',
      'symbol-placement': 'line',
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'symbol-spacing': 500,

      'text-rotation-alignment': 'map',
      'text-size': 12,
      'icon-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': 'rgba(65, 65, 65, 0.9)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  }
]; // 高速

export default [...xiaoLname, ...sdName, ...gsName, ...gdName];
