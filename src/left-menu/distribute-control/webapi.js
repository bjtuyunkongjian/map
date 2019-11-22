import { FetchRequest } from 'tuyun-utils';
import {
  point as TurfPoint,
  featureCollection as FeatureCollection
} from 'turf';

/**
 * 获取卡口数据
 * mapServer/bayonet/bayonetPosition/?
 * minX=116.98261&maxX=118.98261&minY=36.64974&maxY=37.64974
 */
export const GetBayonetPosition = async (param, rgbHex, rgbHex2) => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/bayonet/bayonetPosition/?' + param,
    method: 'GET'
  });
  if (!res || err) return { err }; // 返回
  const _features = [];
  const _features2 = [];
  for (let item of res) {
    const { x, y, id } = item;
    _features.push(TurfPoint([x, y], { code: id, color: `#${rgbHex}` }));
    _features2.push(TurfPoint([x, y], { code: id, color: `#${rgbHex2}` }));
  }
  const _geo = {
    type: 'geojson',
    data: FeatureCollection(_features)
  };
  const _geo2 = {
    type: 'geojson',
    data: FeatureCollection(_features2)
  };
  return { res: { geo: _geo, geo2: _geo2 }, err };
};

/**
 * 获取网吧数据
 * mapServer/bar/screenPoint?minX=116.09357909623746&maxX=118.09357909623746&minY=36.96251473211209&maxY=38.96251473211209
 */

export const GetIcafePosition = async (param, rgbHex, rgbHex2) => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/bar/screenPoint?' + param,
    method: 'GET'
  });
  if (!res || err) return { err };
  const _features = [];
  const _features2 = [];
  for (let item of res) {
    const { x, y, yycsdm, hasKey } = item;
    _features.push(
      TurfPoint([x, y], { code: yycsdm, color: `#${rgbHex}`, _has: hasKey })
    );
    _features2.push(
      TurfPoint([x, y], { code: yycsdm, color: `#${rgbHex2}`, _has: hasKey })
    );
  }
  const _hasList = res.map(item => item.hasKey);
  const _geo = {
    type: 'geojson',
    data: FeatureCollection(_features)
  };
  const _geo2 = {
    type: 'geojson',
    data: FeatureCollection(_features2)
  };
  return { res: { geo: _geo, geo2: _geo2, _hasList }, err };
};

/**
 * 获取宾馆数据
 * mapServer/hotel/screenPoint?minX=116.09357909623746&maxX=118.09357909623746&minY=36.96251473211209&maxY=38.96251473211209
 */
export const GetHotelPosition = async (param, rgbHex, rgbHex2) => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/hotel/screenPoint?' + param,
    method: 'GET'
  });
  if (!res || err) return { err };
  const _features = [];
  const _features2 = [];
  for (let item of res) {
    const { x, y, code } = item;
    _features.push(TurfPoint([x, y], { code: code, color: `#${rgbHex}` }));
    _features2.push(TurfPoint([x, y], { code: code, color: `#${rgbHex2}` }));
  }
  const _geo = {
    type: 'geojson',
    data: FeatureCollection(_features)
  };
  const _geo2 = {
    type: 'geojson',
    data: FeatureCollection(_features2)
  };
  return { res: { geo: _geo, geo2: _geo2 }, err };
};
