import { UnitLayerId } from './chart-info';

// 点的数据量在 1000/1500 以上，以最小的点呈现，肉眼可见
// 点的数据量在 200~1000/1500 之间， 以中等的点呈现，不需要点击功能
// 点的数据量在 200 以内，现有点的大小，需要有点击功能

const RemoveLayer = (map, layerId) => {
  map.getLayer(layerId) && map.removeLayer(layerId).removeSource(layerId); // 删除所有 layer 和 source
};

const AddPointLayer = (map, source, circleRadius) => {
  map.addLayer({
    id: UnitLayerId,
    type: 'circle',
    source: source,
    paint: {
      'circle-color': '#f00',
      'circle-radius': circleRadius || 6
    }
  });
};

const AddNamePlateLayer = (map, source) => {
  map.addLayer({
    id: UnitLayerId,
    type: 'symbol',
    source: source,
    layout: {
      'text-field': '{num}',
      'symbol-placement': 'point',
      'text-size': 10,
      'icon-image': 'ic_map_gh.9',
      'icon-text-fit': 'both',
      'icon-text-fit-padding': [1, 2, 1, 2],
      'text-justify': 'center',
      'text-font': ['黑体'],
      'text-pitch-alignment': 'viewport',
      'text-rotation-alignment': 'viewport',
      'icon-rotation-alignment': 'viewport',
      'text-anchor': 'center',
      'text-keep-upright': false
    },
    paint: {
      'text-color': '#FFFFFF'
    }
  });
};

export { AddPointLayer, AddNamePlateLayer, RemoveLayer };
