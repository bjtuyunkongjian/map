/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

// 获取图表信息
export const FetchChartData = async body => {
  Object.assign(body, { test: 'popDynamic' });
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body
  });
  return { res, err };
};

// 获取图表信息
export const FetchDensityMap = async body => {
  Object.assign(body, { test: 'popDensity', firtype: 1 });
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body
  });
  return { res, err };
};
