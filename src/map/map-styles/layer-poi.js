import { LevelConfig } from 'tuyun-config';
import RdNameArr from './layer-rd-name';

const townArr = [
  { id: 'POI_XZ', src: 'XZ_HZ' },
  { id: 'LAYER15_CUN', src: 'CUN15' }
].map(item => {
  return {
    id: item.id,
    type: 'symbol',
    source: LevelConfig.addLv7,
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
      'text-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': 'rgba(65, 65, 65, 0.8)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  };
});

// 区县
const districtArr = [{ id: 'QX_7L', src: 'QX_HZ' }].map(item => {
  return {
    id: item.id, //区，县的POI
    type: 'symbol',
    source: LevelConfig.addLv7,
    'source-layer': item.src,
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
      'text-color': 'rgba(65, 65, 65, 0.9)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  };
});

const travelArr = [
  { id: 'LXD8', src: 'LXD8' },
  { id: 'LXD9', src: 'LXD9' },
  { id: 'LYD9-1', src: 'LYD9-1' },
  { id: 'LXD10', src: 'LXD10' },
  { id: 'LYD10-1', src: 'LYD10-1' },
  { id: 'LYD11-1', src: 'LYD11-1' },
  { id: 'LXD11', src: 'LXD11' },
  { id: 'LAYER15_LXD', src: 'LXD15' },
  { id: 'LYD15-1', src: 'LYD15-1' },
  { id: 'LYD10-2', src: 'LYD10-2' },
  { id: 'LYD11-2', src: 'LYD11-2' },
  { id: 'LYD15-2', src: 'LYD15-2' },
  { id: 'LYD9-2', src: 'LYD9-2' }
].map(item => {
  return {
    id: item.id,
    type: 'symbol',
    source: LevelConfig.addLv7,
    'source-layer': item.src,
    layout: {
      'text-field': '{Name}',
      visibility: 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_180400',
      'text-justify': 'left',
      'text-anchor': 'left',
      'text-offset': [0.8, 0],
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': 'rgb(126, 79, 175)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  };
});

const stationArr = [
  { id: 'POI_CZ', src: 'CZ9' },
  { id: 'POI_CZ_1', src: 'CZ16-1' },
  { id: 'CZ16-2', src: 'CZ16-2' },
  { id: 'CZ-16-2-1', src: 'CZ-16-2-1' },
  { id: 'CZ-16-2-2', src: 'CZ-16-2-2' }
].map(item => {
  return {
    id: item.id,
    type: 'symbol',
    source: LevelConfig.addLv7,
    'source-layer': item.src,
    layout: {
      'text-field': '{Name}',
      visibility: 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_230100',
      'text-justify': 'left',
      'text-anchor': 'left',
      'text-offset': [0.8, 0],
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': 'rgb(89, 125, 155)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  };
});

// 190201: 'rgb(207, 62, 62)'
const policeStationArr = [
  { id: 'DZJG11-1', src: 'DZJG11-1' },
  { id: 'DZJG14-1', src: 'DZJG14-1' }
].map(item => {
  return {
    id: item.id,
    type: 'symbol',
    source: LevelConfig.addLv7,
    'source-layer': item.src,
    layout: {
      'text-field': '{NAME}',
      visibility: 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_190201',
      'text-justify': 'left',
      'text-anchor': 'left',
      'text-offset': [0.8, 0],
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': 'rgb(207, 62, 62)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  };
});

const governmentArr = [
  { id: 'POI_DZJG', src: 'DZJG9' },
  { id: 'LAYER10_DZJG', src: 'DZJG10' },
  { id: 'DZJG11-2', src: 'DZJG11-2' },
  { id: 'DZJG14-2', src: 'DZJG14-2' }
].map(item => {
  return {
    id: item.id,
    type: 'symbol',
    source: LevelConfig.addLv7,
    'source-layer': item.src,
    layout: {
      'text-field': '{NAME}',
      visibility: 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_190100',
      'text-justify': 'left',
      'text-anchor': 'left',
      'text-offset': [0.8, 0],
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': 'rgb(207, 62, 62)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  };
});

const schoolArr = [
  { id: 'POI_GX', src: 'GX9-1' },
  { id: 'LAYER10_GX', src: 'GX10-1' },
  { id: 'GX9-2', src: 'GX9-2' },
  { id: 'GX9-1-1', src: 'GX9-1-1' },
  { id: 'GX10-1-1', src: 'GX10-1-1' },
  { id: 'GX10-1-2', src: 'GX10-1-2' },
  { id: 'GX10-2', src: 'GX10-2' },
  { id: 'GX9-1-2', src: 'GX9-1-2' },
  { id: 'LAYER12_ZXX', src: 'ZXX12' },
  { id: 'LAYER12_ZXX_1', src: 'ZXX12-1' },
  { id: 'ZXX12-2', src: 'ZXX12-2' },
  { id: 'ZXX12-1-1', src: 'ZXX12-1-1' },
  { id: 'ZXX12-2-1', src: 'ZXX12-2-1' },
  { id: 'ZXX12-1-2', src: 'ZXX12-1-2' },
  { id: 'ZXX12-2-2', src: 'ZXX12-2-2' },
  { id: 'LAYER14_ZXX', src: 'ZXX14' },
  { id: 'ZXX14-1', src: 'ZXX14-1' },
  { id: 'ZXX14-2', src: 'ZXX14-2' },
  { id: 'LAYER15_JYWH', src: 'JYWH15' },
  { id: 'JYWH15-1', src: 'JYWH15-1' },
  { id: 'JYWH15-2', src: 'JYWH15-2' }
].map(item => {
  return {
    id: item.id,
    type: 'symbol',
    source: LevelConfig.addLv7,
    'source-layer': item.src,
    layout: {
      'text-field': '{Name}',
      visibility: 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_160106',
      'text-justify': 'left',
      'text-anchor': 'left',
      'text-offset': [0.8, 0],
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': 'rgb(77, 116, 148)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  };
});

// 180304: 'rgb(56, 136, 49)',
const gardenArr = [
  { id: 'POI_GY', src: 'GY9-1' },
  { id: 'LAYER10_GY', src: 'GY10-1' },
  { id: 'GY10-2', src: 'GY10-2' },
  { id: 'GY9-2', src: 'GY9-2' },
  { id: 'GY9-1-1', src: 'GY9-1-1' },
  { id: 'GY9-1-2', src: 'GY9-1-2' },
  { id: 'GY10-1-1', src: 'GY10-1-1' },
  { id: 'GY10-1-2', src: 'GY10-1-2' }
].map(item => {
  return {
    id: item.id,
    type: 'symbol',
    source: LevelConfig.addLv7,
    'source-layer': item.src,
    layout: {
      'text-field': '{Name}',
      visibility: 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_180304',
      'text-justify': 'left',
      'text-anchor': 'left',
      'text-offset': [0.8, 0],
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': 'rgb(56, 136, 49)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  };
});

const hospitalArr = [
  { id: 'LAYER12_YY', src: 'YY12' },
  { id: 'LAYER13_YY', src: 'YY12' },
  { id: 'YY12-1', src: 'YY12-1' },
  { id: 'YY13-1', src: 'YY13-1' },
  { id: 'YY12-2', src: 'YY12-2' },
  { id: 'YY13-2', src: 'YY13-2' }
].map(item => {
  return {
    id: item.id,
    type: 'symbol',
    source: LevelConfig.addLv7,
    'source-layer': item.src,
    layout: {
      'text-field': '{Name}',
      visibility: 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_170100',
      'text-justify': 'left',
      'text-anchor': 'left',
      'text-offset': [0.8, 0],
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': 'rgb(207, 62, 62)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  };
});

// 230201: 'rgb(77, 116, 148)',
const bridgeArr = [
  { id: 'LAYER12_QIAO', src: 'Qiao12' },
  { id: 'Qiao12-1', src: 'Qiao12-1' },
  { id: 'Qiao12-2', src: 'Qiao12-2' },
  { id: 'LAYER13_QIAO', src: 'Qiao13' },
  { id: 'Qiao13-1', src: 'Qiao13-1' },
  { id: 'Qiao13-2', src: 'Qiao13-2' }
].map(item => {
  return {
    id: item.id,
    type: 'symbol',
    source: LevelConfig.addLv7,
    'source-layer': item.src,
    layout: {
      'text-field': '{Name}',
      visibility: 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_230201',
      'text-justify': 'left',
      'text-anchor': 'left',
      'text-offset': [0.8, 0],
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': 'rgb(77, 116, 148)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  };
});

// 200105: 'rgb(126, 79, 175)',
const facilityArr = [
  { id: 'LAYER13_COMMERCE', src: 'SYSSJFW13' },
  { id: 'LV16_SYSSJFW', src: 'SYSSJFW16' },
  { id: 'SYSSJFW15', src: 'SYSSJFW15' },
  { id: 'LV16_GGSS', src: 'GGSS16' },
  { id: 'GGSS16-1', src: 'GGSS16-1' }
].map(item => {
  return {
    id: item.id,
    type: 'symbol',
    source: LevelConfig.addLv7,
    'source-layer': item.src,
    layout: {
      'text-field': '{Name}',
      visibility: 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_200105',
      'text-justify': 'left',
      'text-anchor': 'left',
      'text-offset': [0.8, 0],
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': 'rgb(126, 79, 175)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  };
});

// 卫生社保 170106: 'rgb(207, 62, 62)',
const healthArr = [
  { id: 'LAYER15_WSSB', src: 'WSSB15' },
  { id: 'WSSB15-1', src: 'WSSB15-1' },
  { id: 'WSSB15-2', src: 'WSSB15-2' }
].map(item => {
  return {
    id: item.id,
    type: 'symbol',
    source: LevelConfig.addLv7,
    'source-layer': item.src,
    layout: {
      'text-field': '{Name}',
      visibility: 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_170106',
      'text-justify': 'left',
      'text-anchor': 'left',
      'text-offset': [0.8, 0],
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': 'rgb(207, 62, 62)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  };
});

// 110101: 'rgb(201, 101, 57)',
const restaurantArr = [
  { id: 'LV16_CANY', src: 'CANY16' },
  { id: 'LV17_CANY', src: 'CANY17' },
  { id: 'LV18_CANY', src: 'CANY18' }
].map(item => {
  return {
    id: item.id,
    type: 'symbol',
    source: LevelConfig.addLv7,
    'source-layer': item.src,
    layout: {
      'text-field': '{Name}',
      visibility: 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_110101',
      'text-justify': 'left',
      'text-anchor': 'left',
      'text-offset': [0.8, 0],
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': 'rgb(201, 101, 57)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  };
});

// 220100: 'rgb(126, 79, 175)',
const companyArr = [
  { id: 'LV16_GSQY', src: 'GSQY16' },
  { id: 'LV17_GSQY', src: 'GSQY17' },
  { id: 'LV18_GSQY', src: 'GSQY18' }
].map(item => {
  return {
    id: item.id,
    type: 'symbol',
    source: LevelConfig.addLv7,
    'source-layer': item.src,
    layout: {
      'text-field': '{Name}',
      visibility: 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_220100',
      'text-justify': 'left',
      'text-anchor': 'left',
      'text-offset': [0.8, 0],
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': 'rgb(126, 79, 175)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  };
});

// 150200: 'rgb(77, 116, 148)',
const insuranceArr = [
  { id: 'LV16_JRBX', src: 'JRBX16' },
  { id: 'LV17_JRBX', src: 'JRBX17' }
].map(item => {
  return {
    id: item.id,
    type: 'symbol',
    source: LevelConfig.addLv7,
    'source-layer': item.src,
    layout: {
      'text-field': '{Name}',
      visibility: 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_150200',
      'text-justify': 'left',
      'text-anchor': 'left',
      'text-offset': [0.8, 0],
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': 'rgb(77, 116, 148)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  };
});

// 210400: 'rgb(126, 79, 175)'
const residentArr = [
  { id: 'LV16_JMFW', src: 'JMFW16' },
  { id: 'LV17_JMFW', src: 'JMFW17' },
  { id: 'JMFW16-1', src: 'JMFW16-1' },
  { id: 'JMFW16-2', src: 'JMFW16-2' }
].map(item => {
  return {
    id: item.id,
    type: 'symbol',
    source: LevelConfig.addLv7,
    'source-layer': item.src,
    layout: {
      'text-field': '{Name}',
      visibility: 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_210400',
      'text-justify': 'left',
      'text-anchor': 'left',
      'text-offset': [0.8, 0],
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': 'rgb(126, 79, 175)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  };
});

// 120102: 'rgb(126, 79, 175)',
const hotelArr = [{ id: 'LV18_ZS', src: 'ZS18' }].map(item => {
  return {
    id: item.id,
    type: 'symbol',
    source: LevelConfig.addLv7,
    'source-layer': item.src,
    layout: {
      'text-field': '{Name}',
      visibility: 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_120102',
      'text-justify': 'left',
      'text-anchor': 'left',
      'text-offset': [0.8, 0],
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': 'rgb(126, 79, 175)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  };
});

// 250200: 'rgb(207, 62, 62)'
const agricultureArr = [{ id: 'LV17_NLMYY', src: 'NLMYY17' }].map(item => {
  return {
    id: item.id,
    type: 'symbol',
    source: LevelConfig.addLv7,
    'source-layer': item.src,
    layout: {
      'text-field': '{Name}',
      visibility: 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_250200',
      'text-justify': 'left',
      'text-anchor': 'left',
      'text-offset': [0.8, 0],
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': 'rgb(207, 62, 62)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  };
});

// 130101: 'rgb(126, 79, 175)',
const marketArr = [
  { id: 'LV17_PFLS', src: 'PFLS17' },
  { id: 'LV18_PFLS', src: 'PFLS18' }
].map(item => {
  return {
    id: item.id,
    type: 'symbol',
    source: LevelConfig.addLv7,
    'source-layer': item.src,
    layout: {
      'text-field': '{Name}',
      visibility: 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_130101',
      'text-justify': 'left',
      'text-anchor': 'left',
      'text-offset': [0.8, 0],
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': 'rgb(126, 79, 175)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  };
});

// 180100: 'rgb(77, 116, 148)',
const sportsArr = [{ id: 'LV17_YDXX', src: 'YDXX17' }].map(item => {
  return {
    id: item.id,
    type: 'symbol',
    source: LevelConfig.addLv7,
    'source-layer': item.src,
    layout: {
      'text-field': '{Name}',
      visibility: 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_180100',
      'text-justify': 'left',
      'text-anchor': 'left',
      'text-offset': [0.8, 0],
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': 'rgb(77, 116, 148)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  };
});

// 240100: 'rgb(77, 116, 148)',
const scienceArr = [{ id: 'KJJJSFW15', src: 'KJJJSFW15' }].map(item => {
  return {
    id: item.id,
    type: 'symbol',
    source: LevelConfig.addLv7,
    'source-layer': item.src,
    layout: {
      'text-field': '{Name}',
      visibility: 'visible',
      'symbol-placement': 'point',
      'text-size': 11,
      'text-padding': 4,
      'icon-image': 'ic_map_240100',
      'text-justify': 'left',
      'text-anchor': 'left',
      'text-offset': [0.8, 0],
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': 'rgb(77, 116, 148)',
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  };
});

const cityLayer = [
  {
    id: 'DJS', // 地级市
    type: 'symbol',
    source: LevelConfig.addLv7,
    'source-layer': 'DJS_HZ',
    maxzoom: 13,
    layout: {
      'text-field': '{Name}',
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
      'icon-rotation-alignment': 'viewport'
    },
    paint: {
      'text-color': 'rgba(65, 65, 65, 1)', // ['get', ['get', 'KIND'], ['literal', FontColor]]
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  }
];

const PoiLayer = [
  ...townArr,
  ...districtArr,
  ...travelArr,
  ...stationArr,
  ...policeStationArr,
  ...governmentArr,
  ...schoolArr,
  ...gardenArr,
  ...hospitalArr,
  ...bridgeArr,
  ...facilityArr,
  ...healthArr,
  ...restaurantArr,
  ...companyArr,
  ...insuranceArr,
  ...residentArr,
  ...hotelArr,
  ...agricultureArr,
  ...marketArr,
  ...sportsArr,
  ...scienceArr,

  ...cityLayer,
  ...RdNameArr
];

export default PoiLayer;
