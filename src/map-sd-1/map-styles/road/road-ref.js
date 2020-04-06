import { MapSource } from '../constant';
import { Layout } from './common';

const RoadRef = [
  {
    id: 'road-ref', // 做线的基层使用，铁路
    type: 'fill',
    source: MapSource,
    'source-layer': 'empty',
    paint: {
      'fill-opacity': 0
    }
  }
];

export default RoadRef;
