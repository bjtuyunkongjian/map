import { LevelConfig } from 'tuyun-config';

export default [
  {
    id: 'playground', // 绿地的面状要素
    type: 'fill',
    source: LevelConfig.addLv7,
    'source-layer': 'CC',
    paint: {
      'fill-color': '#b5e9b6',
      'fill-opacity': 1,
      'fill-antialias': false
    }
  }
];
