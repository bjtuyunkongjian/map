/**
 * @author sl 2019-01-02
 */
import CONFIG from '../config';

const _visibleLevel = 12;

const style = {
  visibleLevel: 12,
  source: {
    [CONFIG.addLv12]: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        'http://116.62.186.152:8080/geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ASD_12L@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf'
      ],
      minzoom: _visibleLevel
    }
  },
  layers: [{
    id: 'SD_POI_LEVEL12_1009_chezhan',
    type: 'symbol',
    source: CONFIG.addLv12,
    'source-layer': 'SD_POI_LEVEL12_1009', // 
    filter: ['any', ['==', 'KIND', '238108']],
    'layout': {
      'text-field': '{NAME}',
      'visibility': 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_chezhan',
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
  }, {
    id: 'SD_POI_LEVEL12_1009_dasha',
    type: 'symbol',
    source: CONFIG.addLv12,
    'source-layer': 'SD_POI_LEVEL12_1009', //
    filter: ['any', ['==', 'KIND', '200103']],
    'layout': {
      'text-field': '{NAME}',
      'visibility': 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_dasha',
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
  }, {
    id: 'SD_POI_LEVEL12_1009_building',
    type: 'symbol',
    source: CONFIG.addLv12,
    'source-layer': 'SD_POI_LEVEL12_1009', // 
    filter: ['any', ['==', 'KIND', '190111'],
      ['==', 'KIND', '190202'],
      ['==', 'KIND', '190203'],
      ['==', 'KIND', '190205']
    ],
    'layout': {
      'text-field': '{NAME}',
      'visibility': 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_building',
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