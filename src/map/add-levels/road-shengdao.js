const lineLabelLayerId = 'line-sd-ref';
const lineBgLabelLayerId = 'line-sd-bg-ref';
const symbolLabelLayerId = 'symbol-ref';

export default [
  {
    id: 'shengdao_bg', // 省道背景
    type: 'line',
    source: 'bff-tile-source',
    'source-layer': 'shengGDBt',
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
    },
    labelLayerId: lineBgLabelLayerId
  },
  {
    id: 'shengdao', // 路网图层（name字段），省道
    type: 'line',
    source: 'bff-tile-source',
    'source-layer': 'shengGDBt',
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
    },
    labelLayerId: lineLabelLayerId
  },
  {
    id: 'shengdao_name', // 省道名称
    type: 'symbol',
    source: 'bff-tile-source',
    'source-layer': 'shengGDBt',
    layout: {
      'text-field': {
        stops: [[7, ''], [13, '{NAME}']]
      },
      visibility: 'visible',
      'symbol-placement': 'line',
      'text-font': ['Arial Unicode MS Bold'],
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
    },
    labelLayerId: symbolLabelLayerId
  },
  {
    id: 'shengdao_icon', // 省道图标
    type: 'symbol',
    source: 'bff-tile-source',
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
      'text-keep-upright': false
    },
    paint: {
      'text-color': '#FFFFFF'
    },
    labelLayerId: symbolLabelLayerId
  }
];
