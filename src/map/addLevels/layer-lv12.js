/**
 * @author sl 2019-01-02
 */
import {
  levelConfig
} from 'tuyun-config';

const _visibleLevel = 12;
const symbolLabelLayerId = 'symbol-ref';

const style = {
  visibleLevel: _visibleLevel,
  source: {
    [levelConfig.addLv12]: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        'http://116.62.186.152:8080/geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ASD_12L@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf'
      ],
      minzoom: _visibleLevel
    }
  },
  layers: [{
      id: 'GRAILN_bg_LV12', // 记录了铁路，底层颜色灰色
      type: 'line',
      source: levelConfig.addLv12,
      'source-layer': 'SD_GRAILN', // LN，line的简写
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': '#B6B3B7',
        'line-width': 2.4
      }
    },
    {
      id: 'GRAILN_LV12', // 记录了铁路，间隔白色
      type: 'line',
      source: levelConfig.addLv12,
      'source-layer': 'SD_GRAILN', // LN，line的简写
      layout: {
        'line-cap': 'round',
        'line-join': 'round'
      },
      paint: {
        'line-color': '#FFFFFF',
        'line-dasharray': [5, 5],
        'line-width': 1.6
      }
    },
    {
      id: 'POI_LEVEL_12',
      type: 'symbol',
      source: levelConfig.addLv12,
      'source-layer': 'POI_LEVEL_12',
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
      },
      labelLayerId: symbolLabelLayerId
    }
  ]
};

export default style;