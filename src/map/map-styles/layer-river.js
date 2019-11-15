/**
 * 7级图层配置
 */
import { LevelConfig } from 'tuyun-config';

export default [
  {
    id: 'HAIYU', // 记录海域，河流的面状要素
    type: 'fill',
    source: LevelConfig.addLv7,
    'source-layer': 'HaiYu',
    paint: {
      'fill-color': '#b3d8ff',
      'fill-opacity': 1,
      'fill-antialias': false
    }
  },
  {
    id: 'GQ_LV15', // 沟渠
    type: 'fill',
    source: LevelConfig.addLv7,
    'source-layer': 'GQ',
    paint: {
      'fill-color': '#b3d8ff',
      'fill-opacity': 1,
      'fill-antialias': false
    }
  },
  {
    id: 'HUCHI_LV15', // 湖泊水池
    type: 'fill',
    source: LevelConfig.addLv7,
    'source-layer': 'Hu-Chi',
    paint: {
      'fill-color': '#b3d8ff',
      'fill-opacity': 1,
      'fill-antialias': false
    }
  },
  {
    id: 'SKCT_LV15', // 水库池塘
    type: 'fill',
    source: LevelConfig.addLv7,
    'source-layer': 'SK-CT',
    paint: {
      'fill-color': '#b3d8ff',
      'fill-opacity': 1,
      'fill-antialias': false
    }
  },
  {
    id: 'ZQ_LV15', // 支渠
    type: 'fill',
    source: LevelConfig.addLv7,
    'source-layer': 'Zhiqu',
    paint: {
      'fill-color': '#b3d8ff',
      'fill-opacity': 1,
      'fill-antialias': false
    }
  }
];
