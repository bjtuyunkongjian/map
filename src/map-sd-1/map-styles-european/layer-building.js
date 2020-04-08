import { MapSource } from './constant';
import BuildingColor from './building-color';

// 3d 普通建筑颜色和透明度
const gresplOpacity = 0.8;
export const GresplColor = '#f8f4ec';
const fillExtrusionHeight = 16;

export const BuildingIds = [
  { id: 'building-1', src: 'GRESPL_Merge-1' },
  { id: 'building-2', src: 'GRESPL_Merge_ID2' },
  { id: 'building-3', src: 'GRESPL_Merge_ID3' },
];

const buildingLayer = [
  {
    id: 'building-ref', // 建筑物基层
    type: 'fill',
    source: MapSource,
    'source-layer': 'empty',
    paint: {
      'fill-opacity': 0,
    },
  },
];

for (let item of BuildingIds) {
  buildingLayer.push({
    id: item.id, //15级房屋
    source: MapSource,
    'source-layer': item.src,
    type: 'fill-extrusion',
    filter: ['!=', 'CLASID', '310200'],
    paint: {
      'fill-extrusion-color': [
        'coalesce',
        ['get', ['to-string', ['get', 'ID']], ['literal', BuildingColor]],
        GresplColor,
      ],
      'fill-extrusion-height': [
        'interpolate',
        ['linear'],
        ['zoom'],
        fillExtrusionHeight,
        0,
        fillExtrusionHeight + 0.55,
        ['*', ['+', ['get', 'H'], 1], 3],
      ],
      'fill-extrusion-base': 0,
      'fill-extrusion-opacity': gresplOpacity,
    },
  });
}

export default buildingLayer;
