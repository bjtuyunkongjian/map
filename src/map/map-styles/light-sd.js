import { BaseConfig } from 'tuyun-config';

// import Guodao from './road-guodao';
import RoadSiWei from './road-siwei';
import Water from './water';
import PoiLayer from './poi';
import Boundary from './boundary';

const layers = [
  {
    id: 'simple-tiles',
    type: 'raster',
    source: 'raster-tiles',
  },

  // ...Guodao,
  ...Water,
  ...Boundary,
  ...RoadSiWei,
  ...PoiLayer,
];

export default {
  version: 8,
  name: 'ty-map',
  metadata: {},
  sources: {
    'raster-tiles': {
      type: 'raster',
      tiles: [
        // 'https://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=3991cefea7f40e49e48f26915530f3c8',
        // './static/lvdi.png',
        // '
        // 'http://192.168.251.67:6080/arcgis/rest/services/test1/sdxy1/MapServer/tile/{z}/{y}/{x}/lvdi.png',
        // 'http://localhost:8083/get-tiles/dev?z={z}&x={x}&y={y}',
        'http://192.168.251.120:8888/direct?z={z}&x={x}&y={y}',
        // 'http://47.110.135.245:8101/direct?z={z}&x={x}&y={y}',
        // 'http://124.128.48.215/tileservice/spot2006?layer=c&style=c&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix={z}&TileCol={y}&TileRow={x}',
      ],
      tileSize: 256,
    },
    // 'bff-tile-source': {
    //   type: 'vector',
    //   scheme: 'tms',
    //   tiles: [
    //     `${BaseConfig.tileHost}originMapServer/string?test=200&type=tms&zoom={z}&row={x}&column={y}`,
    //   ],
    // },
    'water-7': {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        `${BaseConfig.geoserverHost}geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ASD_7L@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`,
      ],
      minzoom: 7,
    },
    'road-siwei': {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        `${BaseConfig.geoserverHost}geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ARoad_SiWei@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`,
      ],
      minzoom: 16,
    },
    'layer-lv8': {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        `${BaseConfig.geoserverHost}geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ASD_8L@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`,
      ],
      minzoom: 8,
      maxzoom: 10,
    },
  },
  sprite: `${BaseConfig.spriteHost}sprite/sprite`,
  glyphs: `${BaseConfig.glyphsHost}font/{fontstack}/{range}.pbf`,
  visibility: 'public',
  layers,
};
// http://124.128.48.215/tileservice/SdRasterPubMap2018?layer=c&style=c&tilematrixset=c&Service=WMTS&Request=GetTile&Version=1.0.0&Format=image%2Fpng&TileMatrix=18&TileCol=217325&TileRow=38982
