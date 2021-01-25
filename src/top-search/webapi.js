/*
 *这部分js用来和后端进行数据交互
 */

import { FetchRequest } from 'tuyun-utils';

/**
 * 文字转地址
 * http://47.110.135.245:8888/geocode post
 * {addrs:["山东省济南市天桥区重汽翡翠郡南区20号楼","北园街道花格小区45号楼"],"radius": 100}
 */
export const PostGeocode = async address => {
  const body = { addrs:[ address] };
  const { res, err } = await FetchRequest({
    url: 'geocode',
    method: 'POST',
    body: body
  });
  return { res, err };
};

/**
 * 文字转地址
 * http://47.110.135.245:8888/geocode/reverse post
 */
export const PostGeocodeReverse = async lngLat => {
  const body = { geoms:[lngLat],"radius": 100, num: 5 };
  const { res, err } = await FetchRequest({
    url: 'geocode/reverse',
    method: 'POST',
    body: body
  });
  return { res, err };
};