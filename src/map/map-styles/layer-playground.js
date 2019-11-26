import { LevelConfig } from 'tuyun-config';

export default [
  {
    id: 'playground', // 绿地的面状要素
    type: 'fill',
    source: LevelConfig.addLv7,
    'source-layer': 'CC',
    paint: {
      'fill-color': 'rgb(227,180,176)',
      'fill-opacity': 1,
      'fill-antialias': false
    }
  }
];