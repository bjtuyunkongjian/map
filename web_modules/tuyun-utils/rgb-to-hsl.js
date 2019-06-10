/**
 * @author sl204984
 * @description 颜色 rgb 格式转换为 hsl 格式
 * @param { string, number } r
 * @param { string, number } g
 * @param { string, number } b
 * @returns { Array<string> }
 */
export default function rgbToHsl(r, g, b) {
  (r /= 255), (g /= 255), (b /= 255);
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  let h,
    s,
    l = (max + min) / 2;

  if (max == min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return [
    Math.floor(h * 360),
    Math.round(s * 100) + '%',
    Math.round(l * 100) + '%'
  ];
}
