/**
 * @description 删除图层
 * @param { Object } map 全局 map 对象
 * @param { String } layerId 对应图层的 ID
 */
const RemoveLayer = (map, layerId) => {
  map.getLayer(layerId) && map.removeLayer(layerId).removeSource(layerId); // 删除所有 layer 和 source
};

export default RemoveLayer;
