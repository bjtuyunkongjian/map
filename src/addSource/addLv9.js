/**
 * @author sl 2019-01-02
 */
import CONFIG from '../config';

const _visibleLevel = 9;

const style = {
  visibleLevel: 9,
  source: {
    [CONFIG.addLv9]: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        'http://116.62.186.152:8080/geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ASD_9L@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf'
      ],
      minzoom: _visibleLevel
    }
  },
  layers: [{
    id: 'SD_POI_LEVEL9_1009',
    type: 'symbol',
    source: CONFIG.addLv9,
    'source-layer': 'SD_POI_LEVEL9_1009', // py是面
    'layout': {
      'text-field': '{NAME}',
      'visibility': 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_park',
      'text-justify': 'left',
      'text-anchor': 'left',
      'text-offset': [0.8, 0],
      'text-font': ['Arial Unicode MS Blod', 'Open Sans Regular'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport'
    },
    'paint': {
      'text-color': 'rgba(65, 65, 65, 1)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  }]
};

function _checkSource(map, source) {
  for (let key in source) {
    if (map.getSource(key))
      return false;
  }
  return true;
}

export default function (map) {
  const source = style.source;
  const layers = style.layers;
  if (map.getZoom() >= style.visibleLevel && _checkSource(map, source)) {
    for (let key in source) {
      map.addSource(key, source[key]);
    }
    for (let item of layers) {
      map.addLayer(item, item.labelLayerId);
    }
  }
}