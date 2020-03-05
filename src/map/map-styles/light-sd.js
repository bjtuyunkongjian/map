import { BaseConfig } from 'tuyun-config';

import Guodao from './road-guodao';

const layers = [
  {
    id: 'simple-tiles',
    type: 'raster',
    source: 'raster-tiles'
  },
  ...Guodao
];

export default {
  version: 8,
  name: 'ty-map',
  metadata: {},
  sources: {
    'raster-tiles': {
      type: 'raster',
      tiles: [`${BaseConfig.wmsHost}get-tiles/dev?z={z}&x={x}&y={y}`],
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
