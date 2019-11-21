import { FetchRequest } from 'tuyun-utils';

/**
 * 查询数量
 * http://56.8.2.241:12808/mapServer/jurisdiction/count?
 * code=
 * */
export const GetCount = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/jurisdiction/count?' + param,
    method: 'GET'
  });
  return { res, err };
};
