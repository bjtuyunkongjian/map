import mapboxgl from 'mapbox-gl';

import BaseStyle from './map-styles/light-sd';

// const map = new mapboxgl.Map({
//   hash: true,
//   container: document.getElementById('app'),
//   style: BaseStyle,
//   showTileBoundaries: true,
//   center: [117.0856, 36.6754],
//   zoom: 11,
//   // pitch: 60,
//   // bearing: -13.6,
//   minZoom: 7,
//   maxZoom: 20,
//   localIdeographFontFamily: '黑体'
// });
// console.log(map);

class TyMap {
  constructor(container, options = { hase: true }) {
    const map = new mapboxgl.Map({
      hash: true,
      container: container,
      style: BaseStyle,
      showTileBoundaries: true,
      center: [117.0856, 36.6754],
      zoom: 11,
      // pitch: 60,
      // bearing: -13.6,
      minZoom: 7,
      maxZoom: 20,
      localIdeographFontFamily: '黑体'
    });
  }
}

window.__TyMap__ = TyMap;
