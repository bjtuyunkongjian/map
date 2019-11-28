import { LevelConfig } from 'tuyun-config';

const RoadRef = [
  {
    id: 'road-ref', // 做线的基层使用，铁路
    type: 'fill',
    source: LevelConfig.addLv7,
    'source-layer': 'empty',
    paint: {
      'fill-opacity': 0
    }
  }
];

export default RoadRef;
