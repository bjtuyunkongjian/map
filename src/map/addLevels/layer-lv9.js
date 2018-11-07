/**
 * @author sl 2019-01-02
 */
import {
  levelConfig
} from 'tuyun-config';

const _visibleLevel = 9;

const style = {
  visibleLevel: _visibleLevel,
  source: {
    [levelConfig.addLv9]: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        'http://116.62.186.152:8080/geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ASD_9L@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf'
      ],
      minzoom: _visibleLevel
    }
  },
  layers: [
    {
      id: '9L_GVEGPL',
      type: 'fill',
      source: levelConfig.addLv15,
      'source-layer': 'GVEGPL_Merge',
      layout: {},
      paint: {
        'fill-color': '#CACFD2',
        'fill-antialias': false
      }
    }, {
      id: 'POI_LEVEL_9_1107',
      type: 'symbol',
      source: levelConfig.addLv9,
      'source-layer': 'POI_LEVEL_9_1107',
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_{KIND}',
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

export default style;