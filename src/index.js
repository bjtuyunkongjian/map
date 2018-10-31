/**
 * @author sl 2019-01-02
 */

import mapboxgl from 'mapbox-gl';
import { addLevel } from 'tuyun-utils';

import baseStyle from './styles/light-sd';
import addLevels from './addLevels';

import groaln from './shengGDBt_cx';

// import '../style/index.less';

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

// 点击地图在控制台打出经纬度
map.on('mouseup', function (e) {
  console.log(e.lngLat);
});

map.on('load', function () {
  map.addLayer({
    id: 'road',
    type: 'line',
    source: {
      type: 'geojson',
      data: groaln
    },
    layout: {
      'line-join': 'round',
      'line-cap': 'round'
    },
    paint: {
      'line-width': {
        base: 2,
        stops: [
          [7, 3],
          [8, 2],
          [9, 3],
          [10, 4],
          [11, 4],
          [12, 7],
          [13, 9],
          [14, 9],
          [15, 10],
          [16, 10],
          [17, 12],
          [18, 14],
          [19, 14],
          [20, 22],
          [21, 24],
          [22, 26],

        ]
      },
      'line-color': '#ffae00'
    }
  })
})


const _addSourceFunc = function (map) {
  for (let item of addLevels) {
    addLevel(map, item);
  }
}

map.on('load', function () {
  _addSourceFunc(map);
}).on('zoom', function () { /* 为zoom事件添加监听器 */
  _addSourceFunc(map);
});

map.addControl(new mapboxgl.NavigationControl());