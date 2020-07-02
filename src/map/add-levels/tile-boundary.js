const symbolLabelLayerId = 'symbol-ref';

export default [
  {
    id: 'wanggexian',
    type: 'line',
    source: 'bff-tile-source',
    'source-layer': 'tile_boundary',
    paint: {
      'line-width': 0.5,
      'line-color': '#f00'
    }
  },
  {
    id: 'wangge_zuobiao',
    type: 'symbol',
    source: 'bff-tile-source',
    'source-layer': 'tile_boundary',
    // layout: {
    //   'text-field': '{ID}',
    //   visibility: 'visible',
    //   'symbol-placement': 'point',
    //   'text-size': 14,
    //   'icon-text-fit': 'both',
    //   'icon-text-fit-padding': [2, 4, 2, 4],
    //   'text-justify': 'center',
    //   'text-font': ['黑体'],
    //   'text-pitch-alignment': 'viewport',
    //   'text-rotation-alignment': 'viewport',
    //   'icon-rotation-alignment': 'viewport',
    //   'text-anchor': 'center',
    //   'text-keep-upright': false
    // },
    layout: {
      'text-field': '{ID}',
      'symbol-placement': 'line',
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'symbol-spacing': 500,
      'text-rotation-alignment': 'viewport',
      'text-size': 16,
      'icon-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': 'rgba(65, 65, 65, 0.9)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    },
    labelLayerId: symbolLabelLayerId
  }
];
