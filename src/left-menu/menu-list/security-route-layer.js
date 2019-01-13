/**
 * 绘制 安保路线 中的点和线
 */

/**
 * 绘制车辆起始点图层
 */
const RouteLayers = {
  routeStart: 'SECURITY_ROUTE_START',
  startEndMapping: 'SECURITY_SELECT_START_MAPPING', // 起始点的映射点
  toSelect: 'SECURITY_ROUTE_POINT_TO_SELECT', // 待选择的点
  lineRingRoute: 'SECURITY_ROUTE_LING_RING', // 环形路
  selectedRoute: 'SECURITY_ROUTE_SELECTED', // 已选择的安保路线
  selectedRouteMark: 'SECURITY_ROUTE_SELECTED_MARK', // 安保路线
  endRoute: 'SECURITY_ROUTE_END', // 末尾点
  routeNode: 'SECURITY_ROUTE_NODE_POINT', // 已选择的路的节点
  securityCar: 'SECURITY_ROUTE_CAR' // 安保车辆
};

const DrawStartPoint = (map, coord) => {
  // 绘制起始点
  const _feature = CreatePointFeature({
    coordinates: [coord.lng, coord.lat],
    properties: { title: '点' }
  });
  map.addLayer({
    id: RouteLayers.routeStart,
    type: 'circle',
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [_feature]
      }
    },
    paint: {
      'circle-radius': {
        base: 5,
        stops: [[10, 5], [20, 20]]
      },
      'circle-color': '#e55e5e'
    }
  });
};

/**
 * 绘制车辆待选择点图层
 */
const DrawIconPoint = (map, { id, features, iconImage }) => {
  if (!map.getSource(id)) {
    map.addLayer({
      id: id,
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: features
        }
      },
      layout: {
        'icon-image': iconImage || 'security_route_start'
      }
    });
  } else {
    map.getSource(id).setData({
      type: 'FeatureCollection',
      features: features
    });
  }
};

/**
 * 绘制车辆末尾点路线图层
 */
const DrawRoad = (map, { id, features, lineColor = '#888', lineWidth = 8 }) => {
  if (!map.getSource(id)) {
    map.addLayer({
      id: id,
      type: 'line',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: features
        }
      },
      layout: {
        'line-join': 'round',
        'line-cap': 'round'
      },
      paint: {
        'line-color': lineColor,
        'line-width': lineWidth
      }
    });
  } else {
    map.getSource(id).setData({
      type: 'FeatureCollection',
      features: features
    });
  }
  // 绘制方向
  id === RouteLayers.selectedRoute &&
    drawRoadMark(map, {
      id: RouteLayers.selectedRouteMark,
      features: features
    });
};

const drawRoadMark = (map, { id, features }) => {
  if (!map.getSource(id)) {
    map.addLayer({
      id: id,
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: features
        }
      },
      layout: {
        'text-field': '{roadMark}',
        visibility: 'visible',
        'symbol-placement': 'line',
        'text-font': ['黑体'],
        'text-pitch-alignment': 'viewport',
        'symbol-spacing': 500,
        'text-rotation-alignment': 'map',
        'text-size': 10,
        'icon-rotation-alignment': 'viewport'
      },
      paint: {
        'text-color': 'rgba(65, 65, 65, 0.8)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    });
  } else {
    map.getSource(id).setData({ type: 'FeatureCollection', features });
  }
};

// 绘制节点
const DrawNodePoint = (map, nodeArr) => {
  const _features = [];
  for (let i = 0; i < nodeArr.length; i++) {
    if (i === 0) continue; // 从第二个节点开始
    const { coordinates } = nodeArr[i];
    const _feature = CreatePointFeature({
      coordinates: [coordinates[0].x, coordinates[0].y],
      properties: {
        index: i
      }
    });
    _features.push(_feature);
  }
  if (!map.getSource(RouteLayers.routeNode)) {
    map.addLayer({
      id: RouteLayers.routeNode,
      type: 'circle',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: _features
        }
      },
      paint: {
        'circle-radius': {
          base: 5,
          stops: [[10, 5], [20, 20]]
        },
        'circle-color': '#0f0'
      }
    });
  } else {
    map.getSource(RouteLayers.routeNode).setData({
      type: 'FeatureCollection',
      features: _features
    });
  }
};

const DrawSecurityCar = (map, { id, features }) => {
  if (!map.getSource(id)) {
    map.addLayer({
      id: id,
      type: 'symbol',
      source: {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: features
        }
      },
      layout: {
        'text-field': '{roadMark}',
        visibility: 'visible',
        'symbol-placement': 'line',
        'text-font': ['黑体'],
        'text-pitch-alignment': 'viewport',
        'symbol-spacing': 500,
        'text-rotation-alignment': 'map',
        'text-size': 10,
        'icon-rotation-alignment': 'viewport'
      },
      paint: {
        'text-color': 'rgba(65, 65, 65, 0.8)',
        'text-halo-width': 2,
        'text-halo-color': 'rgba(255, 255, 255, 1)'
      }
    });
  } else {
    map.getSource(id).setData({ type: 'FeatureCollection', features });
  }
};

const CreatePointFeature = ({ coordinates, properties }) => {
  return {
    type: 'Feature',
    geometry: {
      type: 'Point',
      coordinates: coordinates
    },
    properties
  };
};

export {
  DrawStartPoint,
  DrawIconPoint,
  DrawRoad,
  DrawNodePoint,
  DrawSecurityCar,
  RouteLayers,
  CreatePointFeature
};
