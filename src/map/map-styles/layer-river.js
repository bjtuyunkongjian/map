/**
 * 7级图层配置
 */
import { LevelConfig } from 'tuyun-config';
import { KindMap } from './constant';

export default [
  {
    id: 'background', // 背景
    type: 'background',
    paint: {
      'background-color': '#f5f5f5'
    }
  },
  // 面
  {
    id: 'HAIYU', // 记录海域，河流的面状要素
    type: 'fill',
    kind: KindMap.river,
    source: LevelConfig.addLv7,
    'source-layer': 'HaiYu', // py是面
    paint: {
      'fill-color': '#b3d8ff',
      'fill-opacity': 1,
      'fill-antialias': false
    }
  }
];
