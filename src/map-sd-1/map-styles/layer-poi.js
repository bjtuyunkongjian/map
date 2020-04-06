import { MapSource } from './constant';
import FontColor from './font-color';

const poiRef = [
  {
    id: 'poi-ref', // 做线的基层使用，铁路
    type: 'fill',
    source: MapSource,
    'source-layer': 'empty',
    paint: {
      'fill-opacity': 0,
    },
  },
];

const riverArr = [
  {
    id: 'river-name',
    type: 'symbol',
    source: MapSource,
    'source-layer': 'GHYDPL_Merge',
    filter: ['==', 'CLASID', '250100'],
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
      'text-keep-upright': false,
    },
    paint: {
      'text-color': 'rgba(65, 65, 65, 0.9)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)',
    },
  },
];

const townArr = [
  { id: 'POI_XZ', src: 'XZ_HZ' },
  { id: 'LAYER15_CUN', src: 'CUN15' },
].map((item) => {
  return {
    id: item.id,
    type: 'symbol',
    source: MapSource,
    'source-layer': item.src,
    layout: {
      'text-field': '{Name}',
      visibility: 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'text-justify': 'left',
      'text-anchor': 'left',
      'text-offset': [0.8, 0],
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
    },
    paint: {
      'text-color': 'rgba(65, 65, 65, 0.8)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)',
    },
  };
});

// 区县
const districtArr = [
  {
    id: 'QX_8L', //区，县的POI
    type: 'symbol',
    source: MapSource,
    'source-layer': 'POI_LEVEL_8',
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
      'text-keep-upright': false,
    },
    paint: {
      'text-color': 'rgba(65, 65, 65, 0.9)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)',
    },
  },
];

const levelArr = [
  { id: 'POI_LEVEL_9', src: 'POI_LEVEL_9' },
  { id: 'POI_LEVEL_10', src: 'POI_LEVEL_10' },
  { id: 'POI_LEVEL_11', src: 'POI_LEVEL_11' },
  { id: 'POI_LEVEL_12', src: 'POI_LEVEL_12' },
  { id: 'POI_LEVEL_13', src: 'POI_LEVEL_13' },
  { id: 'POI_LEVEL_14', src: 'POI_LEVEL_14' },
  { id: 'POI_LEVEL_15', src: 'POI_LEVEL_15' },
  { id: 'POI_LEVEL_16', src: 'POI_LEVEL_16' },
  { id: 'POI_LEVEL_17', src: 'POI_LEVEL_17' },
  { id: 'POI_LEVEL_18', src: 'POI_LEVEL_18' },
  { id: 'POI_LEVEL_19', src: 'POI_LEVEL_19' },
  // POI_LEVEL_12
].map((item) => {
  return {
    id: item.id,
    type: 'symbol',
    source: MapSource,
    'source-layer': item.src,
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
      'icon-rotation-alignment': 'viewport',
    },
    paint: {
      'text-color': ['get', ['get', 'KIND'], ['literal', FontColor]],
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)',
    },
  };
});

const waterStationLayer = [
  {
    id: 'SD_GHFCPT', // 此图层记录了一些水站和XX闸
    type: 'symbol',
    source: MapSource,
    'source-layer': 'SD_GHFCPT',
    layout: {
      'text-field': '{NAME}',
      visibility: 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'btn_bubble_a_normal',
      'text-justify': 'left',
      'text-anchor': 'left',
      'text-offset': [0.8, 0],
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport',
    },
    paint: {
      'text-color': '#737517',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)',
    },
  },
];

const villageLayer = [
  {
    id: 'SD_GAGNPT', // 此图层记录了村庄POI
    type: 'symbol',
    source: MapSource,
    'source-layer': 'SD_GAGNPT',
    layout: {
      'text-field': '{NAME}',
      visibility: 'visible',
      'symbol-placement': 'point',
      'text-size': 12,
      'text-padding': 4,
      'icon-image': 'ic_map_shequ',
      'text-justify': 'left',
      'text-anchor': 'left',
      'text-offset': [0.8, 0],
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport',
    },
    paint: {
      'text-color': 'rgb(89, 125, 155)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)',
    },
  },
];

const cityLayer = [
  {
    id: 'city-name', // POI图层
    type: 'symbol',
    source: MapSource,
    'source-layer': 'POI_LEVEL_7',
    maxzoom: 12,
    layout: {
      'text-field': '{NAME}',
      visibility: 'visible',
      'symbol-placement': 'point',
      'text-size': 16,
      'text-padding': 4,
      'icon-image': 'ic_map_{KIND}',
      'text-justify': 'left',
      'text-anchor': 'left',
      'text-offset': [0.5, 0],
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport',
    },
    paint: {
      'text-color': 'rgba(65, 65, 65, 1)', // ['get', ['get', 'KIND'], ['literal', FontColor]]
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)',
    },
  },
];

export default [
  ...poiRef,
  ...riverArr,
  ...townArr,
  ...districtArr,
  ...levelArr,

  ...waterStationLayer,
  ...villageLayer,
  ...cityLayer,
];
