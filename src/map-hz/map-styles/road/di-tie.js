import { MapSource } from '../constant';

const ditieMap = {
  '地铁２号线（在建中）': '#fd9a34',
  '地铁４号线（在建中）': '#98b737',
  地铁１号线: '#fd2d2d',
  '地铁６号线（在建中）': '#004dbb',
  地铁１号线: '#fd2d2d',
  地铁４号线: '#98b737',
  地铁２号线: '#fd9a34'
};

const DiTie = [
  {
    id: 'ditie', // 15级小路主色
    type: 'line',
    source: MapSource,
    'source-layer': 'DT',
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-width': {
        base: 2,
        stops: [
          [15, 2],
          [16, 7],
          [17, 11],
          [18, 15],
          [19, 16],
          [20, 14]
        ]
      },
      'line-color': ['get', ['get', 'Name'], ['literal', ditieMap]]
      // 'line-color': '#fd2d2d'
    }
  }
];

export default DiTie;
