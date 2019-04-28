/**
 * @author sl 2019-01-02
 */
import { LevelConfig, BaseConfig } from 'tuyun-config';
import { FontColor } from 'tuyun-utils';
import ZaDao from './road-zadao';

const visibleLevel = 13;
const symbolLabelLayerId = 'symbol-ref';

const style = {
  visibleLevel: visibleLevel,
  source: {
    [LevelConfig.addLv13]: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        `${
          BaseConfig.geoserverHost
        }geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ASD_13L@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`
      ],
      minzoom: visibleLevel
    }
  },
  layers: [
    // 玉叶新增水系
    {
      id: 'new_River',
      type: 'fill',
      source: LevelConfig.addLv13,
      'source-layer': 'GHYDPL',
      paint: {
        'fill-color': '#b3d8ff',
        'fill-opacity': 1,
        'fill-antialias': false
      },
      labelLayerId: 'GHYDPL_7L'
    },

    ...ZaDao,
    {
      id: 'SD_JINAN1', // 此图层显示方便玉叶他们找
      source: LevelConfig.addLv13,
      'source-layer': 'DY',
      type: 'circle',
      paint: {
        'circle-color': '#ff0000',
        'circle-radius': 20
      },
      labelLayerId: symbolLabelLayerId
    },
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
