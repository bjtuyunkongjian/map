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
import LayerBackground from './layer-background';
import LayerPlayground from './layer-playground';
import LayerCounty from './layer-county';
import LayerBoundary from './layer-boundary';
import LayerRiver from './layer-river';
import LayerGrass from './layer-grass';
import LayerRoad from './layer-road';
import LayerBuilding from './layer-building';
import LayerPoi from './layer-poi';

const layers = [
  ...LayerBackground,
  ...LayerCounty,
  ...LayerBoundary,
  ...LayerRiver,
  ...LayerGrass,
  ...LayerPlayground,
  ...LayerRoad,
  ...LayerBuilding,
  ...LayerPoi
];

export default {
  version: 8,
  name: 'ty-map',
  metadata: {},
  sources: {
    [LevelConfig.addLv7]: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        `${BaseConfig.geoserverHost}get-geo/combine?type=geo&x={x}&y={y}&z={z}`
      ]
    }
  },
  sprite: `${BaseConfig.spriteHost}sprite/sprite`,
  glyphs: `${BaseConfig.glyphsHost}font/{fontstack}/{range}.pbf`, // http://localhost:3000/static/fonts
  visibility: 'public',
  layers
};
