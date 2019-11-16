/**
 * 7级图层配置
 */
import { LevelConfig } from 'tuyun-config';

const iconArr = [
  { id: 'QX_7L', src: 'QX_HZ' },
  { id: 'POI_LYJD', src: 'LXD8' },
  { id: 'POI_XZ', src: 'XZ_HZ' },
  { id: 'POI_CZ', src: 'CZ9' },
  { id: 'POI_DZJG', src: 'DZJG9' },
  { id: 'POI_GX', src: 'GX9' },
  { id: 'POI_GY', src: 'GY9' },
  { id: 'POI_LXD9', src: 'LXD9' },
  { id: 'LAYER10_DZJG', src: 'DZJG10' },
  { id: 'LAYER10_GX', src: 'GX10' },
  { id: 'LAYER10_GY', src: 'GY10' },
  { id: 'LAYER10_LXD', src: 'LXD10' },
  { id: 'LAYER11_LXD', src: 'LXD11' },
  { id: 'LAYER11_DZJG', src: 'DZJG11' },
  { id: 'LAYER12_QIAO', src: 'Qiao12' },
  { id: 'LAYER12_YY', src: 'YY12' },
  { id: 'LAYER12_ZXX', src: 'ZXX12' },
  { id: 'LAYER13_QIAO', src: 'Qiao13' },
  { id: 'LAYER13_YY', src: 'YY12' },
  { id: 'LAYER13_COMMERCE', src: 'SYSSJFW13' },
  { id: 'LAYER14_DZJG', src: 'DZJG14' },
  { id: 'LAYER14_ZXX', src: 'ZXX14' },
  { id: 'LAYER15_CUN', src: 'CUN15' },
  { id: 'LAYER15_JYWH', src: 'JYWH15' },
  { id: 'LAYER15_KJJJSFW', src: 'KJJJSFW15' },
  { id: 'LAYER15_LXD', src: 'LXD15' },
  { id: 'LAYER15_SYSSJFW', src: 'SYSSJFW15' },
  { id: 'LAYER15_WSSB', src: 'WSSB15' },
  { id: 'LV16_CANY', src: 'CANY16' },
  { id: 'LV16_GGSS', src: 'GGSS16' },
  { id: 'LV16_GSQY', src: 'GSQY16' },
  { id: 'LV16_JRBX', src: 'JRBX16' },
  { id: 'LV16_JMFW', src: 'JMFW16' },
  { id: 'LV16_SYSSJFW', src: 'SYSSJFW16' },
  { id: 'LV16_YTYSCC', src: 'YTYSCC16' },
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
  { id: 'LV18_QCXSJFW', src: 'QCXSJFW18' }
];

const PoiLayer = [];

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

console.log(PoiLayer);

export default PoiLayer;
