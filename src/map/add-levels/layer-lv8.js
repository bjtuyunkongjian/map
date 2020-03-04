/**
 * @author sl 2019-01-02
 * 八级是没有图标的
 */
import { BaseConfig } from 'tuyun-config';

const visibleLevel = 8;

const style = {
  visibleLevel: visibleLevel,
  source: {
    wmsTestSource8: {
      type: 'vector',
      scheme: 'tms',
      tiles: [
        `${BaseConfig.geoserverHost}geoserver/gwc/service/tms/1.0.0/SDWorkSpace%3ASD_8L@EPSG%3A900913@pbf/{z}/{x}/{y}.pbf`
      ],
      minzoom: visibleLevel
    }
  },
  layers: [
    {
      id: 'layer-8',
      type: 'raster',
      source: 'wmsTestSource8',
      'source-layer': '你对应的layer',
      paint: {}
    }
  ]
};

export default style;
