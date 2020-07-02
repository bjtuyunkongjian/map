const layers = [
  {
    id: 'POI_LEVEL8',
    type: 'symbol',
    source: 'layer-lv8',
    'source-layer': 'POI_LEVEL_8',
    layout: {
      'text-field': '{NAME}',
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
      'text-keep-upright': false,
    },
    paint: {
      'text-color': 'rgba(65, 65, 65, 0.9)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)',
    },
  },
];

export default layers;
