import { BaseConfig } from 'tuyun-config';

const layers = [
  {
    id: 'simple-tiles7',
    type: 'raster',
    source: 'raster-tiles7'
    // minzoom: 6,
    // maxzoom: 7
  }
];

export default {
  version: 8,
  name: 'ty-map',
  metadata: {},
  sources: {
    'raster-tiles7': {
      type: 'raster',
      tiles: ['http://192.168.251.11:8082/get-tiles/dev?z={z}&x={x}&y={y}'],
      tileSize: 256
    }
  },
  sprite: `${BaseConfig.spriteHost}sprite/sprite`,
  glyphs: `${BaseConfig.glyphsHost}font/{fontstack}/{range}.pbf`, // http://localhost:3000/static/fonts
  visibility: 'public',
  layers
};
