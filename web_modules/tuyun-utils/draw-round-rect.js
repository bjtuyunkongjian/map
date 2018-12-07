/**
 *
 * @param { canvas context } ctx
 * @param { 开始x坐标 } x
 * @param { 开始y坐标 } y
 * @param { 圆角矩形宽度 } width
 * @param { 圆角矩形高度 } height
 * @param { 圆角半径 } r
 * @param { 填充，与 stroke 二选一 } fill
 * @param { 填充颜色，与 strokeStyle 二选一 } fillStyle
 * @param { 画线条，与 fill 二选一 } stroke
 * @param { 画线条的颜色，与 fillStyle 二选一 } strokeStyle
 */

export default function DrawRoundRect(
  ctx,
  {
    x = 0,
    y = 0,
    width = 0,
    height = 0,
    r = 0,
    fill,
    fillStyle = '#000',
    stroke,
    strokeStyle = '#000'
  } = {}
) {
  const _shortSide = width > height ? height : width; // 短边
  r = r > _shortSide / 2 ? _shortSide / 2 : r; // 圆角矩形最大半径
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + width, y, x + width, y + r, r);
  ctx.arcTo(x + width, y + height, x + width - r, y + height, r);
  ctx.arcTo(x, y + height, x, y + height - r, r);
  ctx.arcTo(x, y, x + r, y, r);
  if (fill) {
    ctx.fillStyle = fillStyle;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = strokeStyle;
    ctx.stroke();
  }
  ctx.restore();
}
