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
import Layer7 from './layer7';
import Layer8 from './layer8';
// const areaColor = {
//   370502: '#412f1f', /// 东营区
//   370503: '#f05b72', //  河口区
//   370505: '#f47920', // 垦利县
//   370522: '#74905d', //  利津县
//   370523: '#6a6da9' // 广饶县
// };

const layers = [...Layer7, ...Layer8];

export default {
  version: 8,
  name: 'ty-map',
  metadata: {},
  sources: {
    [LevelConfig.addLv7]: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        `${BaseConfig.geoserverHost}geoserver/gwc/service/tms/1.0.0/HZWorkSpace%3A7L@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`
      ]
    }
  },
  sprite: `${BaseConfig.spriteHost}sprite/sprite`,
  glyphs: `${BaseConfig.glyphsHost}font/{fontstack}/{range}.pbf`, // http://localhost:3000/static/fonts
  visibility: 'public',
  layers
};
