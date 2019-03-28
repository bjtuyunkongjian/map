import { PopulationLayerId } from './constant';

const RemoveLayer = (map, layerId) => {
  map.getLayer(layerId) && map.removeLayer(layerId).removeSource(layerId); // 删除所有 layer 和 source
};

const AddPointLayer = (map, source) => {
  map.addLayer({
    id: PopulationLayerId,
    type: 'circle',
    source: source,
    paint: {
      'circle-color': '#f00',
      'circle-radius': 6
    }
  });
};

const AddHeatMapLayer = (map, source) => {
  map.addLayer(
    {
      id: PopulationLayerId,
      type: 'heatmap',
      source: source,
      paint: {
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0,
          'rgba(33,102,172,0)',
          0.5,
          'green',
          0.8,
          'yellow',
          1,
          'red'
        ],
        // Adjust the heatmap radius by zoom level
        'heatmap-radius': 10,
        // Transition from heatmap to circle layer by zoom level
        'heatmap-opacity': 1
      }
    },
    'line-gd-ref'
  );
};

const AddNamePlateLayer = (map, source) => {
  map.addLayer({
    id: PopulationLayerId,
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

export { AddPointLayer, AddHeatMapLayer, AddNamePlateLayer, RemoveLayer };
