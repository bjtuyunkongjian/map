import { LevelConfig } from 'tuyun-config';

export default [
  {
    id: 'GROALN_other_NAME',
    type: 'symbol',
    source: LevelConfig.addLv7,
    'source-layer': 'XiaoL', // LN，line的简写
    layout: {
      'text-field': '{NAME}',
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
  },
  {
    id: 'guodao_icon', // 国道图标
    type: 'symbol',
    source: LevelConfig.addLv7,
    'source-layer': 'gaoguoGDB',
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
      'text-keep-upright': false
    },
    paint: {
      'text-color': '#FFFFFF'
    }
  }
];
