import { FetchRequest } from 'tuyun-utils';

/**
 * 查询数量
 * http://56.8.2.241:12808/mapServer/jurisdiction/count?
 * code=
 * http://56.8.2.241:12808/mapServer/jurisdiction/count?
 * code=&startTime=&endTime=
 * */
export const GetCount = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/jurisdiction/count?' + param,
    method: 'GET'
  });
  return { res, err };
};

/**
 * 辖区统计数据的点位
 * mapServer/jurisdiction/distribution?
 * code=&type=&startTime=&endTime=&level=   type：点位的类型
 */
export const GetAreaData = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/jurisdiction/distribution?' + param,
    method: 'GET'
  });
  return { res, err };
};

/**
 * 自定义辖区数据
 * http://56.8.2.241:12808/mapServer/jurisdiction/customCount
 * POST
 * boundary: startTime: endTime:
 */
export const GetCustomCount = async body => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/jurisdiction/customCount',
    method: 'POST',
    body
  });
  return { res, err };
};

/**
 * 自定义辖区数据的点位
 * http://56.8.2.241:12808/mapServer/jurisdiction/customDistribution
 */

export const GetCustomData = async body => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/jurisdiction/customDistribution',
    method: 'POST',
    body
  });
  return { res, err };
};
