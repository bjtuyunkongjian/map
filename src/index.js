/**
 * @author sl 2019-01-02
 */

import mapboxgl from 'mapbox-gl';
import { addLevel } from 'tuyun-utils';

import baseStyle from './styles/light-sd';
import addSource from './addSource';

var map = new mapboxgl.Map({
  hash: true,
  container: 'map',
  style: baseStyle,
  showTileBoundaries: true,
  center: [118.034803, 36.80564],
  zoom: 18,
  pitch: 60,
  bearing: -13.6,
  minZoom: 7,
  maxZoom: 22,
  localIdeographFontFamily: "'黑体'"
});


map.on('mouseup', function (e) {
  console.log(e.lngLat);
});

const _addSourceFunc = function (map) {
  for (let item of addSource) {
    addLevel(map, item);
  }
}

map.on('load', function () {
  _addSourceFunc(map);
}).on('zoom', function () { /* 为zoom事件添加监听器 */
  _addSourceFunc(map);
});

map.addControl(new mapboxgl.NavigationControl());