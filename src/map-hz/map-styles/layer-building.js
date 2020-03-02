import { MapSource } from './constant';
import { BuildingColor } from 'tuyun-utils';

// 3d 普通建筑颜色和透明度
const gresplOpacity = 0.8;
export const GresplColor = 'rgb(255, 255, 255)';
const fillExtrusionHeight = 16;

export const BuildingIds = [
  { sourceLayer: 'RES_PY', id: '15_HOUSE' },
  { sourceLayer: 'RES_PY1', id: '15_BUILDING' }
];

const buildingLayer = [
  {
    id: 'building-ref', // 建筑物基层
    type: 'fill',
    source: MapSource,
    'source-layer': 'empty',
    paint: {
      'fill-opacity': 0
    }
  }
];

for (let item of BuildingIds) {
  buildingLayer.push({
    id: item.id, //15级房屋
    source: MapSource,
    'source-layer': item.sourceLayer,
    type: 'fill-extrusion',
    paint: {
      'fill-extrusion-color': [
        'coalesce',
        ['get', ['to-string', ['get', 'ID']], ['literal', BuildingColor]],
        GresplColor
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
  });
}

export default buildingLayer;
