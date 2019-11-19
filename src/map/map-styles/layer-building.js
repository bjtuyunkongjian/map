import { LevelConfig } from 'tuyun-config';
import { BuildingColor } from 'tuyun-utils';

// 3d 普通建筑颜色和透明度
const gresplOpacity = 0.8;
const gresplColor = 'rgb(255, 255, 255)';
const fillExtrusionHeight = 16;

export default [
  {
    id: '15_HOUSE', //15级房屋
    source: LevelConfig.addLv7,
    'source-layer': 'RES_PY',
    type: 'fill-extrusion',
    paint: {
      'fill-extrusion-color': [
        'coalesce',
        ['get', ['to-string', ['get', 'ID']], ['literal', BuildingColor]],
        gresplColor
      ],
      'fill-extrusion-height': [
        'interpolate',
        ['linear'],
        ['zoom'],
        fillExtrusionHeight,
        0,
        fillExtrusionHeight + 0.55,
        ['*', ['+', ['get', 'FLOOR'], 1], 3]
      ],
      'fill-extrusion-base': 0,
      'fill-extrusion-opacity': gresplOpacity
    }
  },
  {
    id: '15_BUILDING', //15级居民地
    source: LevelConfig.addLv7,
    'source-layer': 'RES_PY1',
    type: 'fill-extrusion',
    paint: {
      'fill-extrusion-color': [
        'coalesce',
        ['get', ['to-string', ['get', 'ID']], ['literal', BuildingColor]],
        gresplColor
      ],
      'fill-extrusion-height': [
        'interpolate',
        ['linear'],
        ['zoom'],
        fillExtrusionHeight,
        0,
        fillExtrusionHeight + 0.55,
        ['*', ['+', ['get', 'FLOOR'], 1], 3]
      ],
      'fill-extrusion-base': 0,
      'fill-extrusion-opacity': gresplOpacity
    }
  }
];
