import { MapSource } from './constant';

export default [
  {
    id: 'grass-ref', // 记录了绿地
    type: 'fill',
    source: MapSource,
    'source-layer': 'GVEGPL_Merge',
    paint: {
      'fill-color': '#072438',
      'fill-opacity': 1,
      'fill-antialias': false,
    },
  },
];
