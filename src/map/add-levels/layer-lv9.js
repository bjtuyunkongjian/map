/**
 * @author sl 2019-01-02
 */
import { LevelConfig, BaseConfig } from 'tuyun-config';
import { FontColor } from 'tuyun-utils/index.base.js';

const visibleLevel = 9;
const symbolLabelLayerId = 'symbol-ref';

const style = {
  visibleLevel: visibleLevel,
  source: {
    [LevelConfig.addLv9]: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        `${BaseConfig.geoserverHost}geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ASD_9L@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`
      ],
      minzoom: visibleLevel
    }
  },
  layers: [
    {
      id: 'POI_LEVEL_9_1107',
      type: 'symbol',
      source: LevelConfig.addLv9,
      'source-layer': 'POI_LEVEL_9',
      layout: {
        'text-field': '{NAME}',
        visibility: 'visible',
        'symbol-placement': 'point',
        'text-size': 11,
        'text-padding': 4,
        'icon-image': 'ic_map_{KIND}',
        'text-justify': 'left',
        'text-anchor': 'left',
        'text-offset': [0.8, 0],
        'text-font': ['黑体'],
        'text-pitch-alignment': 'viewport',
        'text-rotation-alignment': 'viewport',
        'icon-rotation-alignment': 'viewport'
      },
      paint: {
        'text-color': ['get', ['get', 'KIND'], ['literal', FontColor]],
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      },
      labelLayerId: symbolLabelLayerId
    }
  ]
};

export default style;
