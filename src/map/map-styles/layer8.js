import { LevelConfig } from 'tuyun-config';

export default [
  {
    id: 'POI_LYJD', //旅游景点
    type: 'symbol',
    kind: 'poi',
    source: LevelConfig.addLv7,
    'source-layer': 'LXD8',
    layout: {
      'text-field': '{Name}',
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
    id: 'POI_XZ', //乡镇
    type: 'symbol',
    kind: 'poi',
    source: LevelConfig.addLv7,
    'source-layer': 'XZ_HZ',
    layout: {
      'text-field': '{Name}',
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
  }
];
