/**
 * @author sl
 * 更换服务器：style.sources.tiles[0] 更换内容
 * 以山东省数据为例
 * host:port/geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ASD_7L@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf
 * 1. ip + host
 * 2. SDWorkSpace ---> 对应的空间名称
 * 3. 3ASD_7L ----> 对应的图层名称
 * 4. z ----> 缩放等级
 * 5. x, y ----> 对应的瓦片
 *
 * 显示规则：
 * 面在最底层，其次是线，其次是点；居民区在绿地上面，绿地在水系面上面
 */

import { LevelConfig, BaseConfig } from 'tuyun-config';

const ditchVisibleLevel = 14; // 沟和渠道显示等级
const maxzoom = 12;

const layers = [
  // 面
  // {
  //   id: 'GVEGPL', // 记录了绿地
  //   type: 'fill',
  //   source: LevelConfig.addLv7,
  //   'source-layer': 'GVEGPL_Merge',
  //   paint: {
  //     'fill-color': '#b5e9b6',
  //     'fill-opacity': 1,
  //     'fill-antialias': false
  //   },
  //   labelLayerId: 'GHYDPL_7L'
  // },
  {
    id: 'layer1',
    type: 'raster',
    source: 'wmsTestSource',
    'source-layer': 'sdyx7',
    paint: {}
  }
];

export default {
  version: 8,
  name: 'ty-map',
  metadata: {},
  sources: {
    wmsTestSource: {
      type: 'raster',
      tiles: [WMSURL],
      tileSize: 256
    }
  },
  sprite: `${BaseConfig.spriteHost}sprite/sprite`,
  glyphs: `${BaseConfig.glyphsHost}font/{fontstack}/{range}.pbf`, // http://localhost:3000/static/fonts
  visibility: 'public',
  layers
};
