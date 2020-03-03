/**
 * @author sl 2019-01-02
 * 八级是没有图标的
 */
import { LevelConfig, BaseConfig } from 'tuyun-config';

const visibleLevel = 8;
const symbolLabelLayerId = 'symbol-ref';
const maxzoom = 10;

const style = {
  visibleLevel: visibleLevel,
  source: {
    [LevelConfig.addLv8]: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        `${BaseConfig.geoserverHost}geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ASD_8L@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`
      ],
      minzoom: visibleLevel
    }
  },
  layers: [
    {
      id: 'POI_LEVEL8',
      type: 'symbol',
      source: LevelConfig.addLv8,
      'source-layer': 'POI_LEVEL_8',
      maxzoom: maxzoom,
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
        'text-keep-upright': false
      },
      paint: {
        'text-color': 'rgba(65, 65, 65, 0.9)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      },
      labelLayerId: symbolLabelLayerId
    }
  ]
};

export default style;
