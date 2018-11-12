

import {
  levelConfig
} from 'tuyun-config';

const _visibleLevel = 17;
const labelLayerId = 'background';

const style = {
  visibleLevel: _visibleLevel,
  source: {
    [levelConfig.addLv17]: {
      type: 'vector',
      scheme: 'tms',
      tiles: ['http://116.62.186.152:8080/geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ASD_17L@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf'],
      minzoom: _visibleLevel
    }
  },
  layers: [{
    id: 'POI_LEVEL_17_1108',
    type: 'symbol',
    source: levelConfig.addLv17,
    'source-layer': 'POI_LEVEL_17',
    'layout': {
      'text-field': '{NAME}',
      'visibility': 'visible',
      'symbol-placement': 'point',
      'text-size': 10,
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
  },
  /**
   * 3d建筑
   * */
  {
    'id': 'GRESPL_1_3D',
    source: levelConfig.addLv17,
    'source-layer': 'GRESPL_Merge_1',
    'type': 'fill-extrusion',
    'minzoom': 15,
    'paint': {
      'fill-extrusion-color': '#aaa',
      // use an 'interpolate' expression to add a smooth transition effect to the
      // buildings as the user zooms in
      'fill-extrusion-height': [
        "interpolate", ["linear"],
        ["zoom"],
        15, 0,
        15.05, ['*', ['+', ["get", "H"], 1], 3]
      ],
      'fill-extrusion-base': 0,
      'fill-extrusion-opacity': .4
    },
  },
  {
    'id': 'GRESPL_2_3D',
    source: levelConfig.addLv17,
    'source-layer': 'GRESPL_Merge_2',
    'type': 'fill-extrusion',
    'minzoom': 15,
    'paint': {
      'fill-extrusion-color': '#aaa',
      'fill-extrusion-height': [
        "interpolate", ["linear"],
        ["zoom"],
        15, 0,
        15.05, ['*', ['+', ["get", "H"], 1], 3]
      ],
      'fill-extrusion-base': 0,
      'fill-extrusion-opacity': .4
    },
  }, {
    'id': 'GRESPL_3_3D',
    source: levelConfig.addLv17,
    'source-layer': 'GRESPL_Merge_3',
    'type': 'fill-extrusion',
    'minzoom': 15,
    'paint': {
      'fill-extrusion-color': '#aaa',
      'fill-extrusion-height': [
        "interpolate", ["linear"],
        ["zoom"],
        15, 0,
        15.05, ['*', ['+', ["get", "H"], 1], 3]
      ],
      'fill-extrusion-base': 0,
      'fill-extrusion-opacity': .4
    },
  }
  ]
}

export default style;