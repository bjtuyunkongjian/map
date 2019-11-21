/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

/**
 * 警情多发区域
 *mapServer/policeSituation/aggregation?
 *minX=&maxX=&minY=&maxY=&beginTime=&endTime=&pitch=&code=&level=
 */
export const GetAreaAggregation = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/policeSituation/aggregation?' + param,
    method: 'GET'
  });
  return { res, err };
};

/**
 * 获取图表数据
 *mapServer/policeSituation/count?minX=&code=&beginTime=&endTime=&level=&minY=&maxX=&maxY=
 */
export const GetChartData = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/policeSituation/count?' + param,
    method: 'GET'
  });
  return { res, err };
};

/**
 * 获取案件趋势 --折线图
 * mapServer/policeSituation/line?
 * minX=&maxX=&minY=&maxY=&beginTime=&endTime=&isplit=&level=
 */
export const GetTendency = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/policeSituation/line?' + param,
    method: 'GET'
  });
  return { res, err };
};

/**
 * 获取派出所辖区对应的案件平均密度
 * mapServer/policeSituation/density?beginTime=&endTime=
 */
export const GetPosituationDensity = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/policeSituation/density?' + param,
    method: 'GET'
  });
  return { res, err };
};
