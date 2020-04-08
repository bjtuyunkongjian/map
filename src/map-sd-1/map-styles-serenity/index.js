/**
 * @author sl
 * 显示规则：
 * 面在最底层，其次是线，其次是点；
 * 水系 -> 绿地 -> 道路 -> 道路名称 -> 建筑物 -> POI
 */

import { MapSource } from './constant';

import BaseConfig from '../base-config';
import LayerBackground from './layer-background';
import LayerBoundary from './layer-boundary';
import LayerRiver from './layer-river';
import LayerGrass from './layer-grass';
import LayerRoad from './layer-road';
import LayerBuilding from './layer-building';
import LayerPoi from './layer-poi';
import LayerRdName from './layer-rd-name';

const layers = [
  ...LayerBackground,
  ...LayerRiver,
  ...LayerGrass,
  ...LayerBoundary,
  ...LayerRoad,
  ...LayerRdName,
  ...LayerBuilding,
  ...LayerPoi,
];

export default {
  version: 8,
  name: 'ty-map',
  metadata: {},
  sources: {
    [MapSource]: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        `${BaseConfig.geoserverHost}get-geo/combine?type=geo&x={x}&y={y}&z={z}`,
      ],
    },
  },
  sprite: `${BaseConfig.spriteHost}sprite/sprite`,
  glyphs: `${BaseConfig.glyphsHost}font/{fontstack}/{range}.pbf`, // http://localhost:3000/static/fonts
  visibility: 'public',
  layers,
};
