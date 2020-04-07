import { BaseConfig } from 'tuyun-config';

import Guodao from './road-guodao';

const layers = [
  {
    id: 'simple-tiles',
    type: 'raster',
    source: 'raster-tiles',
  },
  ...Guodao,
];

export default {
  version: 8,
  name: 'ty-map',
  metadata: {},
  sources: {
    'raster-tiles': {
      type: 'raster',
      tiles: [`${BaseConfig.wmsHost}get-tiles/dev?z={z}&x={x}&y={y}`],
      tileSize: 256,
    },
    'bff-tile-source': {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        `${BaseConfig.tileHost}originMapServer/string?test=200&type=tms&zoom={z}&row={x}&column={y}`,
      ],
    },
  },
  sprite: `${BaseConfig.spriteHost}sprite/sprite`,
  glyphs: `${BaseConfig.glyphsHost}font/{fontstack}/{range}.pbf`, // http://localhost:3000/static/fonts
  visibility: 'public',
  layers,
};
// http://124.128.48.215/tileservice/SdRasterPubMap2018?layer=c&style=c&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=18&TileCol=217325&TileRow=38982
