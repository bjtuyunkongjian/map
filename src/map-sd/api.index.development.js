import mapboxgl from 'mapbox-gl';

import BaseStyle from './map-styles/light-sd';
import LevelStyles from './add-levels';
import Config from './config';

import {
  AddLevel,
  AddCircleLayer,
  AddPolygonLayer,
  AddTextLayer,
  Add3dLayer,
  AddLineLayer,
  AddHeatMapLayer,
  AddLoadedImageLayer,
  RemoveLayer
} from 'tuyun-utils';

import {
  point as TurfPoint,
  multiPoint as MultiPoint,
  polygon as TurfPolygon,
  multiPolygon as MultiPolygon,
  lineString as LineString,
  multiLineString as MultiLineString,
  featureCollection as FeatureCollection,
  randomPoint as RandomPoint,
  randomLineString as RandomLineString,
  randomPolygon as RandomPolygon,
  center as PointCenter,
  distance as PointDistance,
  length as LineLength,
  area as PolygonArea,
  midpoint as MidPoint,
  pointToLineDistance as Point2LineDistance,
  nearestPointOnLine as NearestPointOnLine,
  along as AlongLine,
  booleanPointInPolygon as PointInPolygon,
  sector as Sector,
  convex as Convex,
  intersect as PolygonIntersect,
  union as PolygonUnion,
  difference as PolygonDiff
} from '@turf/turf';

const mapArr = [];

class TyMap {
  constructor(container, options = {}) {
    const {
      hash = true,
      center = [117.0856, 36.6754],
      zoom = 11,
      pitch = 0,
      bearing = 0,
      key = ''
    } = options;
    const transAns = transformStyle(key);
    if (transAns === -1) {
      console.error(new Error('没有识别到 key'));
      return Object.create({});
    }
    const tyMap = new mapboxgl.Map({
      style: BaseStyle,
      container: container,
      hash,
      center,
      zoom,
      pitch,
      bearing,
      minZoom: 7,
      maxZoom: 20,
      localIdeographFontFamily: '黑体'
    });

    tyMap
      .on('style.load', () => {
        addSource(tyMap); // 增加图层组
      })
      .on('zoomend', () => addSource(tyMap));

    this.mapIndex = mapArr.length;
    mapArr.push(tyMap);
  }

  resize = () => mapArr[this.mapIndex].resize();

  getBounds = () => mapArr[this.mapIndex].getBounds();

  setMaxBounds = bounds => {
    mapArr[this.mapIndex].setMaxBounds(bounds); // 不提供返回值
  };
  getMaxBounds = () => mapArr[this.mapIndex].getMaxBounds();

  setMinZoom = zoomLevel => {
    mapArr[this.mapIndex].setMinZoom(zoomLevel); // 不提供返回值
  };
  getMinZoom = () => mapArr[this.mapIndex].getMinZoom();

  setMaxZoom = () => {
    mapArr[this.mapIndex].setMaxZoom(zoomLevel);
  };
  getMaxZoom = () => mapArr[this.mapIndex].getMaxZoom();

  isZooming = () => mapArr[this.mapIndex].isZooming();
  isRotating = () => mapArr[this.mapIndex].isRotating();
  isMoving = () => mapArr[this.mapIndex].isMoving();

  queryRenderedFeatures = () => mapArr[this.mapIndex].queryRenderedFeatures();
  querySourceFeatures = id => mapArr[this.mapIndex].querySourceFeatures(id);

  getLayer = layerId => mapArr[this.mapIndex].getLayer(layerId);

  addCircleLayer = (source, layerId, options = {}) =>
    AddCircleLayer(mapArr[this.mapIndex], source, layerId, options);

  addLineLayer = (source, layerId, options = {}) =>
    AddLineLayer(mapArr[this.mapIndex], source, layerId, options);

  addPolygonLayer = (source, layerId, options = {}) =>
    AddPolygonLayer(mapArr[this.mapIndex], source, layerId, options);

  add3dLayer = (source, layerId, options = {}) =>
    Add3dLayer(mapArr[this.mapIndex], source, layerId, options);

  addTextLayer = (source, layerId, options = {}) =>
    AddTextLayer(mapArr[this.mapIndex], source, layerId, options);

  addImageLayer = (source, layerId, options = {}) =>
    AddLoadedImageLayer(mapArr[this.mapIndex], source, layerId, options);

  addHeatMapLayer = (source, layerId, options = {}) =>
    AddHeatMapLayer(mapArr[this.mapIndex], source, layerId, options);

  setFilter = (layerId, filterExpress) => {
    mapArr[this.mapIndex].setFilter(layerId, filterExpress);
  };

  removeLayer = layerId => RemoveLayer(mapArr[this.mapIndex], layerId);

  setCenter = center => {
    mapArr[this.mapIndex].setCenter(center);
  };
  getCenter = () => mapArr[this.mapIndex].getCenter();

  setZoom = zoomLevel => {
    mapArr[this.mapIndex].setZoom(zoomLevel);
  };
  getZoom = () => {
    mapArr[this.mapIndex].getZoom();
  };

  setBearing = bearing => {
    mapArr[this.mapIndex].setBearing(bearing);
  };
  getBearing = () => {
    mapArr[this.mapIndex].getBearing();
  };

  setPitch = pitch => {
    mapArr[this.mapIndex].setPitch(pitch);
  };
  getPitch = () => {
    mapArr[this.mapIndex].getPitch();
  };

  jumpTo = (options = {}) => {
    mapArr[this.mapIndex].jumpTo(options);
  };

  zoomIn = () => {
    mapArr[this.mapIndex].zoomIn();
  };
  zoomOut = () => {
    mapArr[this.mapIndex].zoomOut();
  };
  zoomTo = zoomLevel => {
    mapArr[this.mapIndex].zoomOut(zoomLevel);
  };

  rotateTo = bearing => {
    mapArr[this.mapIndex].rotateTo(bearing);
  };

  panTo = lnglat => {
    mapArr[this.mapIndex].panTo(lnglat);
  };

  flyTo = options => {
    mapArr[this.mapIndex].flyTo(options);
  };

  // 辅助计算
  unproject = point => mapArr[this.mapIndex].unproject(point);
  project = lnglat => mapArr[this.mapIndex].project(lnglat);

  point = TurfPoint;
  multiPoint = MultiPoint;
  lineString = LineString;
  multiLineString = MultiLineString;
  polygon = TurfPolygon;
  multiPolygon = MultiPolygon;
  polygon3d = TurfPolygon;
  multiPolygon3d = MultiPolygon;
  featureCollection = FeatureCollection;

  randomPoint = (count, boundingBox) =>
    RandomPoint(count, { bbox: boundingBox });

  randomLineString = (count, options = {}) => {
    const { boundingBox, verticesNum, maxLength, maxRotation } = options;
    RandomLineString(count, {
      num_vertices: verticesNum,
      max_length: maxLength,
      max_rotation: maxRotation,
      bbox: boundingBox
    });
  };

  midPoint = MidPoint;

  randomPolygon = (count, options = {}) => {
    const { verticesNum, maxRadialLen, boundingBox } = options;
    RandomPolygon(count, {
      num_vertices: verticesNum,
      max_radial_length: maxRadialLen,
      bbox: boundingBox
    });
  };

  pointCenter = PointCenter;

  pointDistance = (from, to, units = 'kilometers') =>
    PointDistance(from, to, { units });

  lineLength = (lineString, units = 'kilometers') =>
    LineLength(lineString, { units });

  polygonArea = PolygonArea;

  point2LineDistance = (pt, line, units = 'kilometers') =>
    Point2LineDistance((pt, line, { units }));

  nearestPointOnLine = (lines, point) =>
    NearestPointOnLine(lines, point, { units: 'kilometers' });

  alongLine = (lineString, distance, units = 'kilometers') =>
    AlongLine(lineString, distance, { units });

  pointInPolygon = PointInPolygon;

  sector = Sector;

  convex = Convex;

  polygonIntersect = PolygonIntersect;

  polygonUnion = PolygonUnion;

  polygonDiff = PolygonDiff;

  // 地图事件回调
  onResize = callback =>
    mapArr[this.mapIndex].on('resize', ev => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type
      });
    });

  onMouseDown = callback =>
    mapArr[this.mapIndex].on('mousedown', ev => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type
      });
    });

  onMouseUp = callback =>
    mapArr[this.mapIndex].on('mouseup', ev => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type
      });
    });

  onMouseOver = callback =>
    mapArr[this.mapIndex].on('mouseover', ev => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type
      });
    });

  onMouseOut = callback =>
    mapArr[this.mapIndex].on('mouseout', ev => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type
      });
    });

  onMouseMove = callback =>
    mapArr[this.mapIndex].on('mousemove', ev => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type
      });
    });

  onClick = callback =>
    mapArr[this.mapIndex].on('click', ev => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type
      });
    });

  onDblClick = callback =>
    mapArr[this.mapIndex].on('dblclick', ev => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type
      });
    });

  onContextMenu = callback =>
    mapArr[this.mapIndex].on('contextmenu', ev => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type
      });
    });

  onDrag = callback =>
    mapArr[this.mapIndex].on('drag', ev => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type
      });
    });

  onZoom = callback =>
    mapArr[this.mapIndex].on('zoom', ev => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type
      });
    });

  onRotate = callback =>
    mapArr[this.mapIndex].on('rotate', ev => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type
      });
    });

  onPitch = callback =>
    mapArr[this.mapIndex].on('pitch', ev => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type
      });
    });

  onMove = callback =>
    mapArr[this.mapIndex].on('move', ev => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type
      });
    });

  onMoveEnd = callback =>
    mapArr[this.mapIndex].on('moveend', ev => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type
      });
    });

  onLoad = callback =>
    mapArr[this.mapIndex].on('load', ev => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type
      });
    });

  // 图层事件回调
  onLayerMousedown = (layerId, callback) =>
    mapArr[this.mapIndex].on('mousedown', layerId, ev => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type
      });
    });

  onLayerMouseUp = (layerId, callback) =>
    mapArr[this.mapIndex].on('mouseup', layerId, ev => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type
      });
    });

  onLayerMouseOver = (layerId, callback) =>
    mapArr[this.mapIndex].on('mouseover', layerId, ev => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type
      });
    });

  onLayerMouseOut = (layerId, callback) =>
    mapArr[this.mapIndex].on('mouseout', layerId, ev => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type
      });
    });

  onLayerMouseMove = (layerId, callback) =>
    mapArr[this.mapIndex].on('mousemove', layerId, ev => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type
      });
    });

  onLayerClick = (layerId, callback) =>
    mapArr[this.mapIndex].on('click', layerId, ev => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type
      });
    });

  onLayerDblClick = (layerId, callback) =>
    mapArr[this.mapIndex].on('dblclick', layerId, ev => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type
      });
    });

  onLayerContextMenu = (layerId, callback) =>
    mapArr[this.mapIndex].on('contextmenu', layerId, ev => {
      callback({
        features: ev.features,
        lngLat: ev.lngLat,
        originalEv: ev.originalEvent,
        point: ev.point,
        type: ev.type
      });
    });
}

window.TyMap = TyMap;

const addSource = tyMap => {
  for (let item of LevelStyles) {
    AddLevel(tyMap, item);
  }
};

const transformStyle = userKey => {
  if (!userKey) return -1; // 没有 userKey
  const { hostname } = window.location;
  if (!hostname) return 0; // 没有 hostame
  const encMap = {}; // enc 代表 加密 的意思
  if (/^[\d|\.]{1,}$/.test(hostname)) {
    // 代表是 ip
    const pre = 'p';
    const encArr = [];
    const hostArr = hostname.split('.');
    const addedLen = (255 ** 2 * parseInt(pre, 36)).toString(36).length - 1; // 增加的 0 的最多的个数
    for (let index = 0; index < hostArr.length; index++) {
      const host36 = (hostArr[index] ** 2 * parseInt(pre, 36)).toString(36);
      const encHost36 =
        createZeros(pre.length + addedLen - host36.length) + host36;
      encArr.push(encHost36);
    }
    encMap.key = pre;
    encMap.value = encArr.join('');
  } else {
    // 代表是 域名
    const pre = 'd';
    const encArr = [];
    for (let index = 0; index < hostname.length; index++) {
      const encHost36 = (
        hostname[index].charCodeAt() * parseInt(pre, 36)
      ).toString(36);
      encArr.push(encHost36.length.toString(36) + encHost36);
    }
    encMap.key = pre;
    encMap.value = encArr.join('');
  }
  transformUrl(BaseStyle, userKey, encMap);
  for (let item of LevelStyles) {
    transformUrl(item, userKey, encMap);
  }
};

const transformUrl = (style, userKey, encMap) => {
  let preUrl = `${Config.apiHost}get-tiles/dev?key=${userKey}&${encMap.key}=${encMap.value}`;
  const sources = style.sources || style.source;
  for (let key of Object.keys(sources)) {
    if (!sources[key]) continue;
    let url = sources[key].tiles[0];
    if (url.indexOf('geoserver/gwc') > -1) {
      let level = /%3ASD_(\d{1,})L@/.test(url) ? RegExp.$1 : '';
      // 赋值
      sources[key].tiles[0] = preUrl + `&l=${level}&type=geo&x={x}&y={y}&z={z}`;
    } else if (url.indexOf('originMapServer/string') > -1) {
      // 赋值
      sources[key].tiles[0] = preUrl + '&type=ori&x={x}&y={y}&z={z}';
    } else {
      continue;
    }
  }
};

const createZeros = count => '0'.repeat(count);
