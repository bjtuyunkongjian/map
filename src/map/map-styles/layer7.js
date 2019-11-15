/**
 * 7级图层配置
 */
import { LevelConfig } from 'tuyun-config';
const maxzoom = 12;
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
    kind: 'river',
    source: LevelConfig.addLv7,
    'source-layer': 'HaiYu', // py是面
    paint: {
      'fill-color': '#b3d8ff',
      'fill-opacity': 1,
      'fill-antialias': false
    }
  },
  {
    id: 'HUAPU', // 绿地的面状要素
    kind: 'grass',
    type: 'fill',
    source: LevelConfig.addLv7,
    'source-layer': 'HuaPu',
    paint: {
      'fill-color': '#b5e9b6',
      'fill-opacity': 1,
      'fill-antialias': false
    }
  },

  // 线
  {
    id: 'QXXJ', // 区,县,县城边界
    type: 'line',
    kind: 'boundary',
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
  },

  // 点POI
  {
    id: 'QX_7L', //区，县的POI
    type: 'symbol',
    kind: 'poi',
    source: LevelConfig.addLv7,
    'source-layer': 'QX_HZ',
    layout: {
      'text-field': '{Name}',
      visibility: 'visible',
      'symbol-placement': 'point',
      'text-size': 14,
      'icon-text-fit': 'both',
      'icon-text-fit-padding': [2, 4, 2, 4],
      'text-justify': 'center',
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport',
      'text-anchor': 'center',
      'text-keep-upright': false
    },
    paint: {
      'text-color': 'rgba(65, 65, 65, 0.9)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  },
  {
    id: 'DJS', // 地级市
    type: 'symbol',
    kind: 'poi',
    source: LevelConfig.addLv7,
    'source-layer': 'DJS_HZ',
    maxzoom: maxzoom,
    layout: {
      'text-field': '{Name}',
      visibility: 'visible',
      'symbol-placement': 'point',
      'text-size': 16,
      'text-padding': 4,
      'icon-image': 'ic_map_{KIND}',
      'text-justify': 'left',
      'text-anchor': 'left',
      'text-offset': [0.5, 0],
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': 'rgba(65, 65, 65, 1)', // ['get', ['get', 'KIND'], ['literal', FontColor]]
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  }
];
