const PoliceLayerId = 'PROGRESS_POLICE_LAYER_ID';
const PoliceLayerLightId = 'PROGRESS_POLICE_LAYER_LIGHT_ID';

const RemoveLayer = (map, layerId) => {
  map.getLayer(layerId) && map.removeLayer(layerId).removeSource(layerId); // 删除所有 layer 和 source
};

const AddCircleLayer = (map, source) => {
  if (!map.getSource(PoliceLayerId)) {
    map.addLayer({
      id: PoliceLayerId,
      type: 'circle',
      source: source,
      paint: {
        'circle-color': '#f00',
        'circle-radius': 6
      }
    });
  } else {
    map.getSource(PoliceLayerId).setData({
      type: 'FeatureCollection',
      features: source.data.features
    });
  }
};

const heatmapRadius = ['interpolate', ['linear'], ['zoom'], 7, 15, 16, 60];
const AddHeatMapLayer = (map, source, light) => {
  let _layerId, _layerOpt, _refLayer;
  if (light) {
    _layerId = PoliceLayerLightId;
    _refLayer = PoliceLayerId;
    _layerOpt = {
      id: _layerId,
      type: 'heatmap',
      source: source,
      paint: {
        'heatmap-color': [
          'interpolate',
          ['linear'],
          ['heatmap-density'],
          0,
          'rgba(33,102,172,0)',
          0.1,
          'royalblue'
        ],
        'heatmap-radius': heatmapRadius,
        'heatmap-opacity': 0.4
      }
    };
  } else {
    _layerId = PoliceLayerId;
    _refLayer = 'line-gd-ref';
    _layerOpt = {
      id: _layerId,
      type: 'heatmap',
      source: source,
      paint: {
        'heatmap-radius': heatmapRadius,
        'heatmap-opacity': 0.9
      }
    };
  }
  if (!map.getSource(_layerId)) {
    map.addLayer(_layerOpt, _refLayer);
  } else {
    map.getSource(_layerId).setData({
      type: 'FeatureCollection',
      features: source.data.features
    });
  }
};

export {
  PoliceLayerId,
  PoliceLayerLightId,
  AddCircleLayer,
  AddHeatMapLayer,
  RemoveLayer
};
