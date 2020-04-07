import { MapSource } from '../constant';
import { Layout } from './common';

const ZhiXian = [
  {
    id: 'zx_bg',
    type: 'line',
    source: MapSource,
    'source-layer': 'ZX',
    layout: Layout,
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
    source: MapSource,
    'source-layer': 'ZX',

    layout: Layout,
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

export default ZhiXian;