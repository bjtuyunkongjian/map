/**
 * 绘制 车辆 ===> 安保路线 中的点和线
 */

/**
 * 绘制车辆起始点图层
 */
const CarLayers = {
  routeStart: 'SECURITY_ROUTE_START',
  startEndMapping: 'SECURITY_SELECT_START_MAPPING', // 起始点的映射点
  toSelect: 'SECURITY_ROUTE_POINT_TO_SELECT', // 待选择的点
  lineRingRoute: 'SECURITY_ROUTE_LING_RING', // 环形路
  selectedRoute: 'SECURITY_ROUTE_SELECTED', // 已选择的安保路线
  endRoute: 'SECURITY_ROUTE_END' // 末尾点
};

const DrawStartPoint = (map, coord) => {
  // 绘制起始点
  const _features = [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [coord.lng, coord.lat]
      },
      properties: {
        title: '点',
        icon: 'monument'
      }
    }
  ];
  map.addLayer({
    id: CarLayers.routeStart,
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
          features: features.reverse()
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
};

const CreateLineFeatures = coordinates => {};

export {
  DrawStartPoint,
  DrawIconPoint,
  DrawRoad,
  CarLayers,
  CreateLineFeatures
};
