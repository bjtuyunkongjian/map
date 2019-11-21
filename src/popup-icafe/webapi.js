import { FetchRequest } from 'tuyun-utils';
/**
 * 点击出现网吧详情
 * /mapServer/bar/detail?
 * yycsdm=37142810000023
 */
export const GetIcafeDetail = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/bar/detail?' + param,
    method: 'GET'
  });
  return { res, err };
};
