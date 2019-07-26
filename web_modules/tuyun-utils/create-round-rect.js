/**
 *
 * @param { 开始x坐标 } x
 * @param { 开始y坐标 } y
 * @param { 圆角矩形宽度 } width
 * @param { 圆角矩形高度 } height
 * @param { 圆角半径 } r
 */

export default function CreateRoundRect({
  x = 0,
  y = 0,
  width = 0,
  height = 0,
  r = 0
} = {}) {
  const _path2D = new Path2D();
  const _shortSide = Math.min(height, width); // 短边
  const _r = r < 0 || !r ? _shortSide / 2 : Math.min(r, _shortSide / 2); // 圆角矩形最大半径
  if (_r <= 0) return;
  _path2D.moveTo(x + _r, y);
  // param: x1, y1, x2, y2, radius
  _path2D.arcTo(x, y, x, y + _r, _r); // 左上 1/4 圆
  if (_r !== _shortSide / 2) {
    _path2D.lineTo(x, y + height - _r); // 绘制直线
  }
  _path2D.arcTo(x, y + height, x + _r, y + height, _r); // 左下 1/4 圆
  _path2D.lineTo(x + width - _r, y + height); // 底部直线
  _path2D.arcTo(x + width, y + height, x + width, y + height - _r, _r); // 右下 1/4 圆
  if (_r !== _shortSide / 2) {
    _path2D.lineTo(x + width, y + _r); // 绘制直线
  }
  _path2D.arcTo(x + width, y, x + width - _r, y, _r); // 右上 1/4 圆
  _path2D.lineTo(x + _r, y); // 起始点
  return _path2D;
}
