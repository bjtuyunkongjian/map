function _checkSource(map, source) {
  for (let key in source) {
    if (map.getSource(key)) return false;
  }
  return true;
}

export default function addLevel(map, style) {
  const source = style.source;
  const layers = style.layers;
  if (map.getZoom() >= style.visibleLevel && _checkSource(map, source)) {
    for (let key in source) {
      map.addSource(key, source[key]);
    }
    for (let item of layers) {
      map.addLayer(item, item.labelLayerId);
    }
  }
}
