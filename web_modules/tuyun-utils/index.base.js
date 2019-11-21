/**
 * @author sl204984
 */

// mapbox 用到的通用函数
import AddLevel from './add-level'; // 添加图层
import FontColor from './font-color'; // 底图 中精灵图对应的字体颜色
import BuildingType from './building-type'; // 底图 中部分建筑物的类型
import BuildingColor from './building-color'; // 底图 中部分建筑物的颜色
// 判断函数
import IsArray from './is-array'; // 判断是否为数组
import IsEmpty from './is-empty'; // 判断是否为空
import IsNullUndefined from './is-null-undefined'; // 判断是 null 或者 undfined
import CheckType from './check-type'; // 判断对象类型
//
import CreateUid from './create-uid'; // 产生唯一的 uid
import FormatDate from './format-date'; // 格式化日期
import FmtSeconds from './fmt-seconds'; //  格式化秒，@example: FmtSeconds(128) // @return 02:08

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
  AddImageLayer
} from './layer-control';

export {
  AddLevel,
  FontColor,
  BuildingType,
  BuildingColor,
  IsArray,
  IsEmpty,
  IsNullUndefined,
  CheckType,
  CreateUid,
  FormatDate,
  FmtSeconds,
  RemoveLayer,
  AddCircleLayer,
  AddNamePlateLayer,
  AddPolygonLayer,
  AddTextLayer,
  Add3dLayer,
  AddLineLayer,
  AddHeatMapLayer,
  AddImageLayer
};
