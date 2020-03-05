/**
 * @author sl 2019-01-02
 * 八级是没有图标的
 */

const visibleLevel = 10;

const style = {
  visibleLevel: visibleLevel,
  source: {
    [`wmsTestSource${visibleLevel}`]: {
      type: 'raster',
      tiles: [
        `http://116.62.186.152:9280/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=rasterTest:sdyx${visibleLevel}&STYLE=&TILEMATRIX=EPSG:3857:{z}&TILEMATRIXSET=EPSG:3857&FORMAT=image%2Fpng&TILECOL={x}&TILEROW={y}`
      ],
      minzoom: visibleLevel
    }
  },
  layers: [
    {
      id: `layer-${visibleLevel}`,
      type: 'raster',
      source: `wmsTestSource${visibleLevel}`,
      'source-layer': `sdyx${visibleLevel}`,
      minzoom: visibleLevel
      // maxzoom: visibleLevel + 1
    }
  ]
};

export default style;
