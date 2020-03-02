import MapStyles from './map-styles';
import BaseConfig from './base-config';

import BaseMap from './api.index.base';

class TyMap extends BaseMap {
  constructor(container, options = {}) {
    const { key } = options;
    const transAns = transformStyle(key);
    if (transAns === -1) {
      console.error(new Error('没有识别到 key'));
      return Object.create({});
    } else {
      super(container, options);
    }
  }
}

window.TyMap = TyMap;

const transformStyle = userKey => {
  if (!userKey) return -1; // 没有 userKey
  const { hostname } = window.location;
  if (!hostname) return 0; // 没有 hostame
  const encMap = {}; // enc 代表 加密 的意思
  if (/^[\d|\.]{1,}$/.test(hostname)) {
    // 代表是 ip
    const pre = 'p';
    const encArr = [];
    const hostArr = hostname.split('.');
    const addedLen = (255 ** 2 * parseInt(pre, 36)).toString(36).length - 1; // 增加的 0 的最多的个数
    for (let index = 0; index < hostArr.length; index++) {
      const host36 = (hostArr[index] ** 2 * parseInt(pre, 36)).toString(36);
      const encHost36 =
        createZeros(pre.length + addedLen - host36.length) + host36;
      encArr.push(encHost36);
    }
    encMap.key = pre;
    encMap.value = encArr.join('');
  } else {
    // 代表是 域名
    const pre = 'd';
    const encArr = [];
    for (let index = 0; index < hostname.length; index++) {
      const encHost36 = (
        hostname[index].charCodeAt() * parseInt(pre, 36)
      ).toString(36);
      encArr.push(encHost36.length.toString(36) + encHost36);
    }
    encMap.key = pre;
    encMap.value = encArr.join('');
  }
  transformUrl(MapStyles, userKey, encMap);
};

const transformUrl = (style, userKey, encMap) => {
  let preUrl = `${BaseConfig.apiHost}get-tiles/dev?key=${userKey}&${encMap.key}=${encMap.value}`;
  const sources = style.sources;
  for (let key of Object.keys(sources)) {
    if (!sources[key]) continue;
    sources[key].tiles[0] = preUrl + `&type=geo&x={x}&y={y}&z={z}`;
  }
};

const createZeros = count => '0'.repeat(count);
