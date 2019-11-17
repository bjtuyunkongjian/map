/**
 * 7级图层配置
 */
import { LevelConfig } from 'tuyun-config';

const townArr = [
  {
    id: 'POI_XZ',
    type: 'symbol',
    source: LevelConfig.addLv7,
    'source-layer': 'XZ_HZ',
    layout: {
      'text-field': '{Name}',
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
      'text-halo-width': 2,
      'text-halo-color': 'rgba(255, 255, 255, 1)'
    }
  }
];

const iconArr = [
  { id: 'QX_7L', src: 'QX_HZ' },
  { id: 'POI_LYJD', src: 'LXD8' },
  // { id: 'POI_XZ', src: 'XZ_HZ' },
  { id: 'POI_CZ', src: 'CZ9' },
  { id: 'POI_CZ_1', src: 'CZ16-1' },
  { id: 'POI_DZJG', src: 'DZJG9' },
  { id: 'POI_GX', src: 'GX9-1' },
  { id: 'POI_GY', src: 'GY9-1' },
  { id: 'POI_LXD9', src: 'LXD9' },
  { id: 'LAYER10_DZJG', src: 'DZJG10' },
  { id: 'LAYER10_GX', src: 'GX10-1' },
  { id: 'LAYER10_GY', src: 'GY10-1' },
  { id: 'LAYER10_LXD', src: 'LXD10' },
  { id: 'LAYER11_LXD', src: 'LXD11' },
  { id: 'LAYER11_DZJG', src: 'DZJG11' },
  { id: 'LAYER12_QIAO', src: 'Qiao12' },
  { id: 'LAYER12_YY', src: 'YY12' },
  { id: 'LAYER12_ZXX', src: 'ZXX12' },
  { id: 'LAYER12_ZXX_1', src: 'ZXX12-1' },
  { id: 'LAYER13_QIAO', src: 'Qiao13' },
  { id: 'LAYER13_YY', src: 'YY12' },
  { id: 'LAYER13_COMMERCE', src: 'SYSSJFW13' },
  { id: 'LAYER14_DZJG', src: 'DZJG14' },
  { id: 'LAYER14_ZXX', src: 'ZXX14' },
  { id: 'LAYER15_CUN', src: 'CUN15' },
  { id: 'LAYER15_JYWH', src: 'JYWH15' },
  { id: 'LAYER15_LXD', src: 'LXD15' },
  { id: 'LAYER15_WSSB', src: 'WSSB15' },
  { id: 'LV16_CANY', src: 'CANY16' },
  { id: 'LV16_GGSS', src: 'GGSS16' },
  { id: 'LV16_GSQY', src: 'GSQY16' },
  { id: 'LV16_JRBX', src: 'JRBX16' },
  { id: 'LV16_JMFW', src: 'JMFW16' },
  { id: 'LV16_SYSSJFW', src: 'SYSSJFW16' },
  { id: 'LV16_YTYSCC', src: 'CZ16-2' },
  { id: 'LV17_CANY', src: 'CANY17' },
  { id: 'LV17_GSQY', src: 'GSQY17' },
  { id: 'LV17_JMFW', src: 'JMFW17' },
  { id: 'LV17_JRBX', src: 'JRBX17' },
  { id: 'LV17_NLMYY', src: 'NLMYY17' },
  { id: 'LV17_PFLS', src: 'PFLS17' },
  { id: 'LV17_YDXX', src: 'YDXX17' },
  { id: 'LV18_CANY', src: 'CANY18' },
  { id: 'LV18_GSQY', src: 'GSQY18' },
  { id: 'LV18_PFLS', src: 'PFLS18' },
  { id: 'LV18_ZS', src: 'ZS18' },
  { id: 'GY10-2', src: 'GY10-2' },
  { id: 'CX10-2', src: 'CX10-2' },
  { id: 'GX9-2', src: 'GX9-2' },
  { id: 'GY9-2', src: 'GY9-2' },
  { id: 'ZXX12-2', src: 'ZXX12-2' },
  { id: 'CZ16-2', src: 'CZ16-2' },
  { id: 'LYD9-1', src: 'LYD9-1' },
  { id: 'GY9-1-1', src: 'GY9-1-1' },
  { id: 'GX9-1-1', src: 'GX9-1-1' },
  { id: 'LYD10-1', src: 'LYD10-1' },
  { id: 'GY10-1-1', src: 'GY10-1-1' },
  { id: 'GX10-1-1', src: 'GX10-1-1' },
  { id: 'LYD11-1', src: 'LYD11-1' },
  { id: 'Qiao12-1', src: 'Qiao12-1' },
  { id: 'YY12-1', src: 'YY12-1' },
  { id: 'ZXX12-1-1', src: 'ZXX12-1-1' },
  { id: 'Qiao13-1', src: 'Qiao13-1' },
  { id: 'YY13-1', src: 'YY13-1' },
  { id: 'ZXX14-1', src: 'ZXX14-1' },
  { id: 'JYWH15-1', src: 'JYWH15-1' },
  { id: 'LYD15-1', src: 'LYD15-1' },
  { id: 'WSSB15-1', src: 'WSSB15-1' },
  { id: 'ZXX12-2-1', src: 'ZXX12-2-1' },
  { id: 'JMFW16-1', src: 'JMFW16-1' },
  { id: 'GGSS16-1', src: 'GGSS16-1' },
  { id: 'CZ-16-2-1', src: 'CZ-16-2-1' },
  { id: 'KJJJSFW15', src: 'KJJJSFW15' },
  { id: 'SYSSJFW15', src: 'SYSSJFW15' },
  { id: 'CZ-16-2-2', src: 'CZ-16-2-2' },
  { id: 'GX10-1-2', src: 'GX10-1-2' },
  { id: 'GX9-1-2', src: 'GX9-1-2' },
  { id: 'YY12-2', src: 'YY12-2' },
  { id: 'YY13-2', src: 'YY13-2' },
  { id: 'ZXX12-1-2', src: 'ZXX12-1-2' },
  { id: 'ZXX12-2-2', src: 'ZXX12-2-2' },
  { id: 'GY9-1-2', src: 'GY9-1-2' },
  { id: 'GY10-1-2', src: 'GY10-1-2' },
  { id: 'JMFW16-2', src: 'JMFW16-2' },
  { id: 'JYWH15-2', src: 'JYWH15-2' },
  { id: 'LYD10-2', src: 'LYD10-2' },
  { id: 'LYD11-2', src: 'LYD11-2' },
  { id: 'LYD15-2', src: 'LYD15-2' },
  { id: 'LYD9-2', src: 'LYD9-2' },
  { id: 'Qiao12-2', src: 'Qiao12-2' },
  { id: 'Qiao13-2', src: 'Qiao13-2' },
  { id: 'WSSB15-2', src: 'WSSB15-2' },
  { id: 'ZXX14-2', src: 'ZXX14-2' }
];

const PoiLayer = [];

for (let item of townArr) {
  PoiLayer.push(item);
}

for (let item of iconArr) {
  PoiLayer.push({
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
  });
}

PoiLayer.push({
  id: 'DJS', // 地级市
  type: 'symbol',
  source: LevelConfig.addLv7,
  'source-layer': 'DJS_HZ',
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
});

export default PoiLayer;
