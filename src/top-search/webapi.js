/*
 *这部分js用来和后端进行数据交互
 */

import { FetchRequest } from 'tuyun-utils';

/**
 * 文字转地址
 * 172.19.129.30:8080/trans/get?url=http://47.110.135.245:8888/geocode?addr=山东省济南市天桥区重汽翡翠郡南区20号楼
 * 47.110.135.245:8888/geocode?addr=山东省济南市天桥区重汽翡翠郡南区20号楼
 */
export const PostGeocode = async address => {
  const { res, err } = await FetchRequest({
    url: 'trans/get?url=http://47.110.135.245:8888/geocode?addr=' + address,
    method: 'GET',
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