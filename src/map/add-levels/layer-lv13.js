/**
 * @author sl 2019-01-02
 */
import { LevelConfig } from 'tuyun-config';
import { FontColor } from 'tuyun-utils';
import ZaDao from './road-zadao';

const _visibleLevel = 13;
const symbolLabelLayerId = 'symbol-ref';

const style = {
  visibleLevel: _visibleLevel,
  source: {
    [LevelConfig.addLv13]: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        'http://116.62.186.152:8080/geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ASD_13L@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf'
      ],
      minzoom: _visibleLevel
    }
  },
  layers: [
    ...ZaDao,
    {
      id: 'POI_LEVEL_13',
      type: 'symbol',
      source: LevelConfig.addLv13,
      'source-layer': 'POI_LEVEL_13',
      layout: {
        'text-field': '{NAME}',
        visibility: 'visible',
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
