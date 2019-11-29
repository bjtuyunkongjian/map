import { MapSource } from '../constant';
import { Layout } from './common';

// lw -> line width
const baseLw = 2;
// 等级增加的线宽
const lvAddLw = [
  [7, 0],
  [10, 1],
  [13, 2],
  [14, 3],
  [15, 5],
  [17, 7],
  [19, 9],
  [20, 17],
  [21, 20],
  [22, 22]
];

const CiGanDao = [
  {
    id: 'cgd_bg',
    type: 'line',
    source: MapSource,
    'source-layer': 'CGD',
    layout: Layout,
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
    source: MapSource,
    'source-layer': 'CGD',
    layout: Layout,
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

export default CiGanDao;
