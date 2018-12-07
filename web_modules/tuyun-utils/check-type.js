/**
 * 返回对象类型信息
 * boolean/number/string/array/object/function
 */

const toString = Object.prototype.toString;
const CheckType = obj =>
  toString
    .call(obj)
    .slice(8, -1)
    .toLowerCase();

export default CheckType;
