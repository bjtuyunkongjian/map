import { BaseConfig } from 'tuyun-config';

const layers = [
  // {
  //   id: 'layer7',
  //   type: 'raster',
  //   source: 'wmsTestSource'
  // }
];

export default {
  version: 8,
  name: 'ty-map',
  metadata: {},
  sources: {
    wmsTestSource: {
      type: 'raster',
      tiles: ['http://localhost:8082/'],
      tileSize: 256
    }
  },
  sprite: `${BaseConfig.spriteHost}sprite/sprite`,
  glyphs: `${BaseConfig.glyphsHost}font/{fontstack}/{range}.pbf`, // http://localhost:3000/static/fonts
  visibility: 'public',
  layers
};
