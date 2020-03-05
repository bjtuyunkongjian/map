/**
 * @author sl 2019-01-02
 */

const visibleLevel = 10;

const style = {
  visibleLevel: visibleLevel,
  source: {
    [`wmsTestSource${visibleLevel}`]: {
      type: 'raster',
      tiles: [
        `http://116.62.186.152:9280/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=rasterTest:sd${visibleLevel +
          1}&STYLE=&TILEMATRIX=EPSG:900913:{z}&TILEMATRIXSET=EPSG:900913&FORMAT=image%2Fpng&TILECOL={x}&TILEROW={y}`
      ],
      minzoom: visibleLevel
    }
  },
  layers: [
    {
      id: `layer-${visibleLevel}`,
      type: 'raster',
      source: `wmsTestSource${visibleLevel}`,
      'source-layer': `sd${visibleLevel}`,
      minzoom: visibleLevel
      // maxzoom: visibleLevel + 1
    }
  ]
};

export default style;
