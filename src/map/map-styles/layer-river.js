/**
 * 7级图层配置
 */
import { LevelConfig } from 'tuyun-config';

export default [
  {
    id: 'HAIYU', // 记录海域，河流的面状要素
    type: 'fill',
    source: LevelConfig.addLv7,
    'source-layer': 'HaiYu', // py是面
    paint: {
      'fill-color': '#b3d8ff',
      'fill-opacity': 1,
      'fill-antialias': false
    }
  }
];