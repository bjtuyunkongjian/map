import { BaseConfig } from 'tuyun-config';

const layers = [
  {
    id: 'simple-tiles',
    type: 'raster',
    source: 'raster-tiles'
  }
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
    'tms-tiles': {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        `${BaseConfig.geoserverHost}geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ASD_7L@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`
      ]
    }
  },
  sprite: `${BaseConfig.spriteHost}sprite/sprite`,
  glyphs: `${BaseConfig.glyphsHost}font/{fontstack}/{range}.pbf`, // http://localhost:3000/static/fonts
  visibility: 'public',
  layers
};
