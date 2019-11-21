export const BayonetOpt = {
  value: 'bayonet',
  name: '卡口',
  hsl: [315, 26, 48],
  rgb: [155, 92, 139],
  rgbHex: '9b5c8b',
  type: 3
};

export const IcafeOpt = {
  value: 'icafe',
  name: '网吧',
  hsl: [208, 59, 51],
  rgb: [56, 134, 204],
  rgbHex: '3886cc',
  type: 1
};

export const HotelOpt = {
  value: 'hotel',
  name: '宾馆',
  hsl: [0, 100, 50],
  rgb: [255, 0, 0],
  rgbHex: 'ff0000',
  type: 2
};

export const TypeOptions = [BayonetOpt, IcafeOpt, HotelOpt].map(item => {
  const [r, g, b] = item.rgb;
  item.rgb2 = [Math.floor(r / 1.5), Math.floor(g / 1.5), Math.floor(b / 1.5)];
  item.rgbHex2 = item.rgb2
    .map(item => {
      const _hex = item.toString(16);
      return _hex.length > 1 ? _hex : `0${_hex}`;
    })
    .join('');
  return item;
});
