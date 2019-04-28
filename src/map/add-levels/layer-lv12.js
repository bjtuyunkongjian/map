/**
 * @author sl 2019-01-02
 */
import { LevelConfig, BaseConfig } from 'tuyun-config';
import { FontColor } from 'tuyun-utils';

const visibleLevel = 12;
const symbolLabelLayerId = 'symbol-ref';

const style = {
  visibleLevel: visibleLevel,
  source: {
    [LevelConfig.addLv12]: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        `${
          BaseConfig.geoserverHost
        }geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ASD_12L@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`
      ],
      minzoom: visibleLevel
    }
  },
  layers: [
    // 12级新增绿地
    {
      id: 'new_grass',
      type: 'fill',
      source: LevelConfig.addLv12,
      'source-layer': 'GVEGPL1',
      paint: {
        'fill-color': '#b5e9b6',
        'fill-opacity': 1,
        'fill-antialias': false
      },
      labelLayerId: 'GVEGPL'
    },
    {
      id: 'new_grass1',
      type: 'fill',
      source: LevelConfig.addLv12,
      'source-layer': 'GVEGPL2',
      paint: {
        'fill-color': '#b5e9b6',
        'fill-opacity': 1,
        'fill-antialias': false
      },
      labelLayerId: 'GVEGPL'
    },
    {
      id: 'new_grass2',
      type: 'fill',
      source: LevelConfig.addLv12,
      'source-layer': 'GVEGPL3',
      paint: {
        'fill-color': '#b5e9b6',
        'fill-opacity': 1,
        'fill-antialias': false
      },
      labelLayerId: 'GVEGPL'
    },
    {
      id: 'new_grass3',
      type: 'fill',
      source: LevelConfig.addLv12,
      'source-layer': 'GVEGPL4',
      paint: {
        'fill-color': '#b5e9b6',
        'fill-opacity': 1,
        'fill-antialias': false
      },
      labelLayerId: 'GVEGPL'
    },
    {
      id: 'new_grass4',
      type: 'fill',
      source: LevelConfig.addLv12,
      'source-layer': 'GVEGPL21',
      paint: {
        'fill-color': '#b5e9b6',
        'fill-opacity': 1,
        'fill-antialias': false
      },
      labelLayerId: 'GVEGPL'
    },
    {
      id: 'POI_LEVEL_12',
      type: 'symbol',
      source: LevelConfig.addLv12,
      'source-layer': 'POI_LEVEL_12',
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
