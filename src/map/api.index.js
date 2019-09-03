import mapboxgl from 'mapbox-gl';

import BaseStyle from './map-styles/light-sd';
import AddLevels from './add-levels';

const mapArr = [];

class TyMap {
  constructor(container, options = { hash: true }) {
    const { hash } = options;
    const map = new mapboxgl.Map({
      hash: hash || true,
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
    this.mapIndex = mapArr.length;
    mapArr.push(map);
  }
}

console.log(mapArr);

window.__TyMap__ = TyMap;
