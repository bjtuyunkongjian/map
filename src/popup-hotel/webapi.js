import { FetchRequest } from 'tuyun-utils';
/**
 * 点击出现宾馆详情
 * mapServer/hotel/detail?
 * code=3714280208
 */
export const GetHotelDetail = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/hotel/detail?' + param,
    method: 'GET'
  });
  return { res, err };
};
