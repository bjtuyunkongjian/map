import { MapSource } from '../constant';

const XiaoLu = [
  {
    id: 'LV15_XL_bg', // 15级小路背景
    type: 'line',
    source: MapSource,
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
    source: MapSource,
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

export default XiaoLu;
