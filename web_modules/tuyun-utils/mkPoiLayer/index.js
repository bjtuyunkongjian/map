/**
 * options是要改的配置项
 * 必须含有以下选项：
 * id
 * source
 * source-layer
 */

const baseLayout = {
  'text-field': '{NAME}',
  'visibility': 'visible',
  'symbol-placement': 'point',
  'text-size': 11,
  'text-padding': 4,
  'icon-image': 'ic_map_university',
  'text-justify': 'left',
  'text-anchor': 'left',
  'text-offset': [0.8, 0],
  'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
  'text-pitch-alignment': 'viewport',
  'text-rotation-alignment': 'viewport',
  'icon-rotation-alignment': 'viewport'
};

const basePaint = {
  'text-color': '#8c9c99',
  'text-halo-width': 2,
  'text-halo-color': 'rgba(255, 255, 255, 1)'
}

export default {
  provincialCapital(options) {
    const layout = Object.assign(baseLayout, {
      'icon-image': 'ic_map_provincial_capital'
    });

    return Object.assign(options, {
      type: 'symbol',
      filter: ['==', 'KIND', '190107'],
      layout,
      paint: basePaint
    });
  }
}