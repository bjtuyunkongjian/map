/**
 * 7级图层配置
 */
import { LevelConfig } from 'tuyun-config';
import { KindMap } from './constant';

export default [
  {
    id: 'HUAPU', // 绿地的面状要素
    kind: KindMap.grass,
    type: 'fill',
    source: LevelConfig.addLv7,
    'source-layer': 'HuaPu',
    paint: {
      'fill-color': '#b5e9b6',
      'fill-opacity': 1,
      'fill-antialias': false
    }
  }
];
