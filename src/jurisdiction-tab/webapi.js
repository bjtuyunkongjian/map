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

/**
 * 辖区统计数据
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
 * 判断辖区所处位置和层级
 * mapServer/index/getBoundary
 */
export const GetCurArea = async () => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/index/getBoundary',
    method: 'GET'
  });
  return { res, err };
};
