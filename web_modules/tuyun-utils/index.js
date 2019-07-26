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
import Max from './max'; // 返回数组或者对象中的最大值
import CreateUid from './create-uid'; // 产生唯一的 uid
import FormatDate from './format-date'; // 格式化日期
import FmtSeconds from './fmt-seconds'; //  格式化秒，@example: FmtSeconds(128) // @return 02:08

// canvas 画图相关通用函数
import DrawRoundRect from './draw-round-rect'; // canvas 绘制圆角矩形
import ResolveBlurry from './resolve-blurry'; // canvas 解决模糊问题
import CreateRoundRect from './create-round-rect'; // 创造圆角矩形路径
// 请求函数
import {
  FetchRequest, // fetch 请求，调用 bffHost
  UploadRequest // 上传文件请求
} from './fetch';
// Event, Emitter
import Emitter from './emit';
import Event from './event';
import EventName from './event-name';
// 颜色转换
import RgbToHsl from './rgb-to-hsl';
// 图层
import RemoveLayer from './remove-layer';
import LayerIds from './layer-ids';
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
import THREE from './three';
// 全局要使用到的常量
import GlobalConst from './global-constant';

export {
  AddLevel,
  FontColor,
  BuildingType,
  BuildingColor,
  IsArray,
  IsEmpty,
  IsNullUndefined,
  CheckType,
  Max,
  CreateUid,
  DrawRoundRect,
  CreateRoundRect,
  ResolveBlurry,
  FetchRequest,
  UploadRequest,
  Emitter,
  Event,
  Event as GlobalEvent,
  EventName,
  EventName as GloEventName,
  FormatDate,
  FmtSeconds,
  RemoveLayer,
  LayerIds,
  AddCircleLayer,
  AddNamePlateLayer,
  AddPolygonLayer,
  AddTextLayer,
  Add3dLayer,
  AddLineLayer,
  AddHeatMapLayer,
  AddImageLayer,
  RgbToHsl,
  THREE,
  GlobalConst
};
