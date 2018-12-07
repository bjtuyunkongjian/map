/**
 * canvas 解决高倍屏文字变模糊问题
 * @param { canvas 预设的宽 } width
 * @param { canvas 预设的高 } width
 */
export default function ResolveBlurry(canvas, ctx, { width, height } = {}) {
  const _devicePixelRatio = window.devicePixelRatio || 1;
  const _backingStoreRatio =
    ctx.webkitBackingStorePixelRatio ||
    ctx.mozBackingStorePixelRatio ||
    ctx.msBackingStorePixelRatio ||
    ctx.oBackingStorePixelRatio ||
    ctx.backingStorePixelRatio ||
    1;
  const _ratio = _devicePixelRatio / _backingStoreRatio; // 计算canvas的实际渲染倍率
  canvas.style = `width: ${width}px; height: ${height}px;`;
  canvas.width = width * _ratio;
  canvas.height = height * _ratio;
  return _ratio;
}
