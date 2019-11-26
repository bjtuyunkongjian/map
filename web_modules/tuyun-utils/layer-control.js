// 点的数据量在 1000/1500 以上，以最小的点呈现，肉眼可见
// 点的数据量在 200~1000/1500 之间， 以中等的点呈现，不需要点击功能
// 点的数据量在 200 以内，现有点的大小，需要有点击功能

/**
 * @description 添加点位图层
 * @param {*} map
 * @param {*} source
 * @param {*} layerId
 */
const AddCircleLayer = (map, source, layerId, option = {}) => {
  const { color, labelLayerId, strokeWidth, strokeColor, radius } = option;
  if (!map.getSource(layerId)) {
    map.addLayer(
      {
        id: layerId,
        type: 'circle',
        source: source,
        paint: {
          'circle-color': color || '#f00',
          'circle-radius': radius || ['get', 'radius'],
          'circle-stroke-width': strokeWidth || 0,
          'circle-stroke-color': strokeColor || 'rgba(0,0,0,0)'
        }
      },
      labelLayerId
    );
  } else {
    map.getSource(layerId).setData({
      type: 'FeatureCollection',
      features: source.data.features
    });
  }
};

const AddTextLayer = (map, source, layerId, option = {}) => {
  const { textColor, textHaloWith, textHaloColor, labelLayerId } = option;
  if (!map.getSource(layerId)) {
    map.addLayer(
      {
        id: layerId,
        type: 'symbol',
        source: source,
        layout: {
          'text-field': '{text}',
          'symbol-placement': 'point',
          'text-size': 14,
          'icon-text-fit': 'both',
          'icon-text-fit-padding': [2, 4, 2, 4],
          'text-justify': 'center',
          'text-font': ['黑体'],
          'text-pitch-alignment': 'viewport',
          'text-rotation-alignment': 'viewport',
          'icon-rotation-alignment': 'viewport',
          'text-anchor': 'center',
          'text-keep-upright': false
        },
        paint: {
          'text-color': textColor || 'rgba(65, 65, 65, 0.9)',
          'text-halo-width': textHaloWith || 2,
          'text-halo-color': textHaloColor || 'rgba(255, 255, 255, 1)'
        }
      },
      labelLayerId
    );
  } else {
    map.getSource(layerId).setData({
      type: 'FeatureCollection',
      features: source.data.features
    });
  }
};

/**
 * @description 添加铭牌
 * @param {*} map
 * @param {*} source
 * @param {*} layerId
 */
const AddNamePlateLayer = (map, source, layerId, option = {}) => {
  const { iconImage } = option;
  if (!map.getSource(layerId)) {
    map.addLayer({
      id: layerId,
      type: 'symbol',
      source: source,
      minzoom: 16,
      layout: {
        'text-field': '{num}',
        'symbol-placement': 'point',
        'text-size': 10,
        'icon-image': iconImage || 'ic_map_gh.9',
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
  } else {
    updateSource(map, layerId, source);
  }
};

/**
 * @description 添加图片
 * @param {*} map
 * @param {*} source
 * @param {*} layerId
 */
const AddImageLayer = (map, source, layerId, option = {}) => {
  const {
    iconImage,
    iconSize = 1,
    iconRotate = 0,
    iconOpacity,
    labelLayerId,
    allowOverlap = false,
    iconOffset = [0, 0]
  } = option;

  if (!map.getSource(layerId)) {
    map.addLayer(
      {
        id: layerId,
        type: 'symbol',
        source: source,
        // minzoom: 14,
        layout: {
          'icon-image': iconImage || ['get', 'img'],
          'icon-size': iconSize,
          'icon-allow-overlap': allowOverlap,
          'icon-rotation-alignment': 'map',
          // 'icon-pitch-alignment': 'viewport',
          'icon-rotate': iconRotate,
          'icon-offset': iconOffset
        },
        paint: {
          'icon-opacity': iconOpacity || 1
        }
      },
      labelLayerId
    );
  } else {
    updateSource(map, layerId, source);
  }
};

/**
 * @description 添加图片
 * @param {*} map
 * @param {*} source
 * @param {*} layerId
 */
const AddLoadedImageLayer = (map, source, layerId, option = {}) => {
  const { imgUrl, imgName } = option;
  if (!imgUrl) throw new Error('请输入 imgUrl, tyMap.addImageLayer');
  map.loadImage(imgUrl, (error, image) => {
    if (error) throw error;
    const _imgId = imgName || imgUrl;
    if (!map.hasImage(_imgId)) map.addImage(_imgId, image);
    const {
      iconSize = 1,
      iconRotate = 0,
      iconOpacity,
      labelLayerId,
      iconOffset = [0, 0],
      minzoom = 0,
      rotationAlign = 'viewport',
      pitchAlign = 'viewport'
    } = option;

    if (!map.getSource(layerId)) {
      map.addLayer(
        {
          id: layerId,
          type: 'symbol',
          source: source,
          minzoom: minzoom,
          layout: {
            'icon-image': _imgId,
            'icon-size': iconSize,
            'icon-rotation-alignment': rotationAlign,
            'icon-pitch-alignment': pitchAlign,
            'icon-rotate': iconRotate,
            'icon-offset': iconOffset
          },
          paint: {
            'icon-opacity': iconOpacity || 1
          }
        },
        labelLayerId
      );
    } else {
      updateSource(map, layerId, source);
    }
  });
};

/**
 * @description 添加热力图
 * @param {*} map
 * @param {*} source
 * @param {*} layerId
 */
const AddHeatMapLayer = (map, source, layerId, option = {}) => {
  const {
    colorArr = [0, 'rgba(33,102,172,0)', 0.5, 'green', 0.8, 'yellow', 1, 'red'],
    radius = 10,
    opacity = 1
  } = option;
  if (!map.getSource(layerId)) {
    map.addLayer(
      {
        id: layerId,
        type: 'heatmap',
        source: source,
        paint: {
          'heatmap-color': [
            'interpolate',
            ['linear'],
            ['heatmap-density'],
            ...colorArr
          ],
          // Adjust the heatmap radius by zoom level
          'heatmap-radius': radius,
          // Transition from heatmap to circle layer by zoom level
          'heatmap-opacity': opacity
        }
      },
      'line-gd-ref'
    );
  } else {
    updateSource(map, layerId, source);
  }
};

/**
 * @description 添加折线图层
 * @param {*} map
 * @param {*} source
 * @param {*} layerId
 * @param {*} option
 */
const AddLineLayer = (map, source, layerId, option = {}) => {
  const { labelLayerId, width, color, dasharray } = option;
  if (!map.getSource(layerId)) {
    map.addLayer(
      {
        id: layerId,
        type: 'line',
        source: source,
        paint: {
          'line-width': width || 1,
          'line-color': color || '#f00',
          'line-dasharray': dasharray || [1]
        }
      },
      labelLayerId
    );
  } else {
    updateSource(map, layerId, source);
  }
};

/**
 * @description 添加点位图层
 * @param {*} map
 * @param {*} source
 * @param {*} layerId
 */
const AddPolygonLayer = (map, source, layerId, option = {}) => {
  const { color, labelLayerId } = option;
  if (!map.getSource(layerId)) {
    map.addLayer(
      {
        id: layerId,
        type: 'fill',
        source: source,
        paint: {
          'fill-color': color || '#f00'
        }
      },
      labelLayerId
    );
  } else {
    updateSource(map, layerId, source);
  }
};

const Add3dLayer = (map, source, layerId, option = {}) => {
  const { labelLayerId, color, opacity } = option;
  if (!map.getSource(layerId)) {
    map.addLayer(
      {
        id: layerId,
        source: source,
        type: 'fill-extrusion',
        paint: {
          'fill-extrusion-color': color || '#f00',
          'fill-extrusion-height': ['number', ['get', 'height']],
          'fill-extrusion-base': 0,
          'fill-extrusion-opacity': opacity || 1
        }
      },
      labelLayerId
    );
  } else {
    map.getSource(layerId).setData({
      type: 'FeatureCollection',
      features: source.data.features
    });
  }
};

// 更新数据
const updateSource = (map, layerId, source) => {
  if (source.data.type === 'FeatureCollection') {
    map.getSource(layerId).setData({
      type: 'FeatureCollection',
      features: source.data.features
    });
  } else if (source.data.type === 'Feature') {
    map.getSource(layerId).setData({
      type: 'Feature',
      geometry: source.data.geometry
    });
  }
};

export {
  AddCircleLayer,
  AddTextLayer,
  AddNamePlateLayer,
  AddHeatMapLayer,
  AddLineLayer,
  AddPolygonLayer,
  Add3dLayer,
  AddImageLayer,
  AddLoadedImageLayer
};
