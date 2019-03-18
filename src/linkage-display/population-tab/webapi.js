/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

// 获取图表信息
export const FetchHeatMapData = async body => {
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

/**
 * 获取右侧统计图数据
 * @param { 区分标识 } flag 1：人口   2：单位   3：房屋
 * @param { 地图级别数 } mapLevel
 * @param { 屏幕区分标识 } points
 */
export const FetchChartData = async body => {
  Object.assign(body, { test: 'chartData' });
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body
  });
  return { res, err };
};
