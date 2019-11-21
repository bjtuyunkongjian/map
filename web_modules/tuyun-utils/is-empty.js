/**
 * 判断 js 对象是否为空
 */

export default function IsEmpty(obj) {
  // null and undefined are "empty"
  if (obj === null || obj === undefined) {
    return true;
  }

  if (typeof obj === 'number' && isNaN(obj)) {
    return true;
  }

  if (obj.length !== undefined) {
    return obj.length === 0;
  }

  if (obj instanceof Date) {
    return false;
  }

  if (typeof obj === 'object') {
    return Object.keys(obj).length === 0;
  }

  return false;
}
