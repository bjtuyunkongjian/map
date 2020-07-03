const fillExtrusionHeight = 16;

// 3d 普通建筑颜色和透明度
const gresplOpacity = 0.5;
const gresplColor = 'rgb(255, 255, 255)';

const layers = [
  {
    id: 'GRESPL_1_3D',
    source: 'layer-lv15',
    'source-layer': 'GRESPL_Merge_1',
    type: 'fill-extrusion',
    filter: ['!=', 'CLASID', '310200'],
    paint: {
      'fill-extrusion-color': gresplColor,
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
  },
  {
    id: 'GRESPL_2_3D',
    source: 'layer-lv15',
    'source-layer': 'GRESPL_Merge_2',
    type: 'fill-extrusion',
    filter: ['!=', 'CLASID', '310200'],
    paint: {
      'fill-extrusion-color': gresplColor,
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
  },
  {
    id: 'GRESPL_3_3D',
    source: 'layer-lv15',
    'source-layer': 'GRESPL_Merge_3',
    type: 'fill-extrusion',
    filter: ['!=', 'CLASID', '310200'],
    paint: {
      'fill-extrusion-color': gresplColor,
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
  },
];

export default layers;
