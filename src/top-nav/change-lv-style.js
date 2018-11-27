/**
 * 修改以下bug：
 * 1、切换视图后改变放大层级部分图层未变的问题
 * 2、配色，当前缩放层级该图层还未出现，缩放后该图层颜色并未改变的问题
 * 3、筛选 ------> 暂未解决
 */

import LevelStyles from '../map/add-levels'; // 这个等自己开发后台后要删掉

export const ChangeLvStyle = newStyle => {
  const { id, typeName, rgb } = newStyle;
  if (!id || !typeName || !rgb) return;
  for (let item of LevelStyles) {
    for (let layer of item.layers) {
      if (layer.id === id) {
        layer.paint[typeName] = rgb;
        console.log(newStyle, layer);
      }
    }
  }
};
