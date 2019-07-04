/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

// 获取人口热力图
export const FetchBuildingData = async body => {
  Object.assign(body, { test: 'fwData' });
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body
  });
  return { res, err };
};

/**
 * 获取3D建筑物上的铭牌数字
 * @param { object } points
 * @param { number } firtype - 必填，类型  1:人口 2:单位 3:房屋
 * @param { number } sectype - 饼图分类  1:人口 2:单位 3:房屋
 * @param { number } thirtype - 饼图分类  1:人口 2:单位 3:房屋
 */
export const FetchNameplateData = async body => {
  Object.assign(body, { test: 'getNum' });
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body
  });
  return { res, err };
};

/**
 * 获取右侧统计图数据
 * @param { object } points
 * @param { number } flag - 区分标识 1：人口   2：单位   3：房屋
 * @param { number } mapLevel - 地图级别数
 * @param { object } points - 屏幕区分标识
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

export const FetchBuildingDensity = async body => {
  Object.assign(body, { test: 'fwDensity' });

  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body
  });
  return { res, err };
};
