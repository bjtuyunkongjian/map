/**
 * 7级图层配置
 */
import { LevelConfig } from 'tuyun-config';

export default [
  {
    id: 'QXXJ', // 区,县,县城边界
    type: 'line',
    source: LevelConfig.addLv7,
    'source-layer': 'QXXJ_HZ', // LN，line的简写
    layout: {
      'line-cap': 'round',
      'line-join': 'round'
    },
    paint: {
      'line-width': 1,
      'line-color': '#cdcdcd'
    }
  }
];
