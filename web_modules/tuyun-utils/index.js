/**
 * @author sl204984
 */

// mapbox 用到的通用函数
import AddLevel from './add-level'; // 添加图层
import FontColor from './font-color'; // mapbox 中精灵图对应的字体颜色
// 判断函数
import IsArray from './is-array'; // 判断是否为数组
import IsEmpty from './is-empty'; // 判断是否为空
import IsNullUndefined from './is-null-undefined'; // 判断是 null 或者 undfined
import RegRgb from './reg-rgb'; // 颜色的rgb值的正则
import CheckType from './check-type'; // 判断对象类型
//
import Max from './max'; // 返回数组或者对象中的最大值
import CreateUid from './create-uid'; // 产生唯一的 uid

// canvas 画图相关通用函数
import DrawRoundRect from './draw-round-rect'; // canvas 绘制圆角矩形
import ResolveBlurry from './resolve-blurry'; // canvas 解决模糊问题
// 请求函数
import {
  FetchRequest, // fetch 请求，调用 bffHost
  UploadRequest // 上传文件请求
} from './fetch';

import Emitter from './emit';
import Event from './event';

export {
  AddLevel,
  FontColor,
  IsArray,
  IsEmpty,
  IsNullUndefined,
  RegRgb,
  CheckType,
  Max,
  CreateUid,
  DrawRoundRect,
  ResolveBlurry,
  FetchRequest,
  UploadRequest,
  Emitter,
  Event
};
