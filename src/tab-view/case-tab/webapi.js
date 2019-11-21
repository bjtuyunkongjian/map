/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

/**
 * 案件多发区域
 *mapServer/case/aggregation? minX=&maxX=&minY=&maxY=&startTime=&endTime=&pitch=&type=&level=
 */
export const GetAreaAggregation = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/case/aggregation?' + param,
    method: 'GET'
  });
  return { res, err };
};

/**
 * 获取右侧所有图表数据
 *mapServer/case/countAndDensity?minX=&maxX=&minY=&maxY=&startTime=&endTime=&level=
 */
export const GetChartData = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/case/countAndDensity?' + param,
    method: 'GET'
  });
  return { res, err };
};

/**
 * 获取案件趋势
 * http://56.8.2.241:12808/mapServer/case/tendency?
 * minX=&maxX=&minY=&maxY=&startTime=&endTime=&intervals=&level=
 */
export const GetCaseTendency = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/case/tendency?' + param,
    method: 'GET'
  });
  return { res, err };
};

/**
 * 获取派出所辖区对应的案件平均密度
 * /mapServer/case/density? startTime=&endTime=
 */
export const GetCaseDensity = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/case/density?' + param,
    method: 'GET'
  });
  return { res, err };
};
