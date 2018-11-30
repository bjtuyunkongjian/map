/**
 * @author sl 2019-01-02
 * 八级是没有图标的
 */
import { levelConfig } from 'tuyun-config';

const _visibleLevel = 8;
const symbolLabelLayerId = 'symbol-ref';
const _maxzoom = 10;

const style = {
  visibleLevel: _visibleLevel,
  source: {
    [levelConfig.addLv8]: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        'http://116.62.186.152:8080/geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ASD_8L@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf'
      ],
      minzoom: _visibleLevel
    }
  },
  layers: [
    {
      id: 'POI_LEVEL8',
      type: 'symbol',
      source: levelConfig.addLv8,
      'source-layer': 'POI_LEVEL_8',
      maxzoom: _maxzoom,
      layout: {
        'text-field': '{NAME}',
        visibility: 'visible',
        'symbol-placement': 'point',
        'text-size': 15,
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
