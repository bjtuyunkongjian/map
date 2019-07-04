/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

// 获取点位图
export const FetchAreaAggregation = async body => {
  Object.assign(body, { test: 'caseAreaAggregation' });
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body
  });
  return { res, err };
};

/**
 * 获取右侧统计图数据
 * @param { object } body
 */
export const FetchChartData = async body => {
  Object.assign(body, { test: 'caseChartData' });
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body
  });
  return { res, err };
};

/**
 * 获取案件趋势
 * @param { object } body
 */
export const FetchCaseTendency = async body => {
  Object.assign(body, { test: 'caseTendency' });
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body
  });
  return { res, err };
};

/**
 * 获取派出所辖区对应的案件密度
 * @param { object } body
 */
export const FetchCaseDensity = async body => {
  Object.assign(body, { test: 'caseDensity' });
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body
  });
  return { res, err };
};
