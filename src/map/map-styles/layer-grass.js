/**
 * 7级图层配置
 */
import { LevelConfig } from 'tuyun-config';

export default [
  {
    id: 'HUAPU', // 绿地的面状要素
    type: 'fill',
    source: LevelConfig.addLv7,
    'source-layer': 'VEG_PY',
    paint: {
      'fill-color': '#b5e9b6',
      'fill-opacity': 1,
      'fill-antialias': false
    }
  },
  {
    id: 'VEG_PY_5', // 绿地的面状要素
    type: 'fill',
    source: LevelConfig.addLv7,
    'source-layer': 'VEG_PY_5',
    paint: {
      'fill-color': '#b5e9b6',
      'fill-opacity': 1,
      'fill-antialias': false
    }
  }
];
