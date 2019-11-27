/**
 * @author sl204984
 */

// mapbox 用到的通用函数
import AddLevel from './add-level'; // 添加图层
import FontColor from './font-color'; // 底图 中精灵图对应的字体颜色
import BuildingColor from './building-color'; // 底图 中部分建筑物的颜色

// 图层
import RemoveLayer from './remove-layer';
import {
  AddCircleLayer,
  AddNamePlateLayer,
  AddPolygonLayer,
  AddTextLayer,
  Add3dLayer,
  AddLineLayer,
  AddHeatMapLayer,
  AddImageLayer,
  AddLoadedImageLayer
} from './layer-control';
import THREE from './three';
// 全局要使用到的常量

export {
  AddLevel,
  FontColor,
  BuildingColor,
  RemoveLayer,
  AddCircleLayer,
  AddNamePlateLayer,
  AddPolygonLayer,
  AddTextLayer,
  Add3dLayer,
  AddLineLayer,
  AddHeatMapLayer,
  AddImageLayer,
  AddLoadedImageLayer,
  THREE
};
