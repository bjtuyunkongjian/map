/**
 * @author sl 2019-01-02
 * 八级是没有图标的
 */
import { LevelConfig, BaseConfig } from 'tuyun-config';

const visibleLevel = 12;
const symbolLabelLayerId = 'symbol-ref';
// const maxzoom = 10;
/*
const typeColor = {
  0: 'rgb(230, 145, 135)', // 党政机关、电台 红色 'rgb(230, 145, 135)',
  1: 'rgb(116, 211, 208)', // 学校
  2: 'rgb(116, 211, 208)', // 医院
  3: 'rgb(197, 172, 201)', // 大型商贸
  4: 'rgb(197, 172, 201)' // 交通枢纽
};
*/

const style = {
  visibleLevel: visibleLevel,
  source: {
    [LevelConfig.addLv8]: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        `${BaseConfig.geoserverHost}geoserver/gwc/service/tms/1.0.0/HZWorkSpace%3A12L@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`
      ],
      minzoom: visibleLevel
    }
  },
  layers: [
    {
      id: 'DZJG_POI',
      type: 'symbol',
      source: LevelConfig.addLv8,
      'source-layer': 'DZJG_POI',
      layout: {
        'text-field': '{NAME}',
        visibility: 'visible',
        'symbol-placement': 'point',
        'text-size': 12,
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
        'text-color': 'rgb(230, 145, 135)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      },
      labelLayerId: symbolLabelLayerId
    },
    {
      id: 'JTYSCC_JTSN',
      type: 'symbol',
      source: LevelConfig.addLv8,
      'source-layer': 'JTYSCC_JTSN',
      layout: {
        'text-field': '{NAME}',
        visibility: 'visible',
        'symbol-placement': 'point',
        'text-size': 12,
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
        'text-color': 'rgb(197, 172, 201)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      },
      labelLayerId: symbolLabelLayerId
    },
    {
      id: 'JYWH_XX',
      type: 'symbol',
      source: LevelConfig.addLv8,
      'source-layer': 'JYWH_XX',
      layout: {
        'text-field': '{Name}',
        visibility: 'visible',
        'symbol-placement': 'point',
        'text-size': 12,
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
        'text-color': 'rgb(116, 211, 208)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      },
      labelLayerId: symbolLabelLayerId
    },
    {
      id: 'PFLS_SM',
      type: 'symbol',
      source: LevelConfig.addLv8,
      'source-layer': 'PFLS_SM',
      layout: {
        'text-field': '{Name}',
        visibility: 'visible',
        'symbol-placement': 'point',
        'text-size': 12,
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
        'text-color': 'rgb(197, 172, 201)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      },
      labelLayerId: symbolLabelLayerId
    },
    {
      id: 'SYSSJFW_SM1',
      type: 'symbol',
      source: LevelConfig.addLv8,
      'source-layer': 'SYSSJFW_SM1',
      layout: {
        'text-field': '{Name}',
        visibility: 'visible',
        'symbol-placement': 'point',
        'text-size': 12,
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
        'text-color': 'rgb(197, 172, 201)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      },
      labelLayerId: symbolLabelLayerId
    },
    // HZWorkSpace:WSSB_YY
    {
      id: 'WSSB_YY',
      type: 'symbol',
      source: LevelConfig.addLv8,
      'source-layer': 'WSSB_YY',
      layout: {
        'text-field': '{Name}',
        visibility: 'visible',
        'symbol-placement': 'point',
        'text-size': 12,
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
        'text-color': 'rgb(197, 172, 201)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      },
      labelLayerId: symbolLabelLayerId
    }
  ]
};

export default style;
