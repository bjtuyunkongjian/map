import { BaseConfig } from 'tuyun-config';

import Guodao from './road-guodao';
import RoadShengdao from './road-shengdao';
import XianDao from './road-xiandao';
import Gjl from './road-gjl';
import Ksl from './road-ksl';
import Zgd from './road-zgd';
import Cgd from './road-cgd';
import XiangDao from './road-xiangdao';
import Zx from './road-zx';
import Other from './road-other';

const layers = [
  {
    id: 'simple-tiles',
    type: 'raster',
    source: 'raster-tiles'
  },
  // ...Other,
  // ...Zx,
  // ...XiangDao,
  // ...Ksl,
  // ...Cgd,
  // ...Gjl,
  // ...Zgd,
  // ...XianDao,
  // ...RoadShengdao,
  ...Guodao
];

export default {
  version: 8,
  name: 'ty-map',
  metadata: {},
  sources: {
    'raster-tiles': {
      type: 'raster',
      tiles: ['http://192.168.251.11:8082/get-tiles/dev?z={z}&x={x}&y={y}'],
      tileSize: 256
    },
    'bff-tile-source': {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        `${BaseConfig.tileHost}originMapServer/string?test=200&type=tms&zoom={z}&row={x}&column={y}`
      ]
    }
  },
  sprite: `${BaseConfig.spriteHost}sprite/sprite`,
  glyphs: `${BaseConfig.glyphsHost}font/{fontstack}/{range}.pbf`, // http://localhost:3000/static/fonts
  visibility: 'public',
  layers
};
