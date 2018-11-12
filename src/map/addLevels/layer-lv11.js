/**
 * @author sl 2019-01-02
 * 11级，包括公园，医院
 */
import {
  levelConfig
} from 'tuyun-config';

const _visibleLevel = 11;

const style = {
  visibleLevel: _visibleLevel,
  source: {
    [levelConfig.addLv11]: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        'http://116.62.186.152:8080/geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ASD_11L@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf'
      ],
      minzoom: _visibleLevel
    },
  },
  layers: [
    {
      id: 'POI_LEVEL_11_1108_1',
      type: 'symbol',
      source: levelConfig.addLv11,
      'source-layer': 'POI_LEVEL_11',
      'layout': {
        'text-field': '{NAME}',
        'visibility': 'visible',
        'symbol-placement': 'point',
        'text-size': 12,
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
        'text-color': 'rgba(65, 65, 65, 0.8)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    }
  ]
};


export default style;