/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

/**
 * 获取人口热力图
 */
export const FetchHeatMapData = async body => {
  Object.assign(body, { test: 'popDynamic' });
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

export const FetchDetailNum = async body => {
  Object.assign(body, { test: 'getThirNum' });
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body
  });
  return { res, err };
};
