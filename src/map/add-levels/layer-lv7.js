/**
 * @author sl 2019-01-02
 */

const visibleLevel = 7;

const style = {
  visibleLevel: visibleLevel,
  source: {
    [`wmsTestSource${visibleLevel}`]: {
      type: 'raster',
      tiles: ['http://localhost:8082/get-tiles/dev?z={z}&x={x}&y={y}'],
      minzoom: visibleLevel
    }
  },
  layers: [
    {
      id: `layer-${visibleLevel}`,
      type: 'raster',
      source: `wmsTestSource${visibleLevel}`,
      minzoom: visibleLevel
      // maxzoom: visibleLevel + 1
    }
  ]
};

export default style;
