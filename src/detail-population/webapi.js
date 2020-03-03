/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

/**
 * 获取人口分布数据
 * http://host:port/mapServer/population/distribution?minX=&maxX=&minY=&maxY=&type=&level=
 */
export const GetDistribution = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/population/distribution?' + param,
    method: 'GET'
  });
  return { res, err };
};

/**
 * 获取3D建筑物上的铭牌数字
 * @param { object } points
 * @param { number } firtype - 必填，类型  1:人口 2:单位 3:房屋
 * @param { number } sectype - 饼图分类  1:人口 2:单位 3:房屋
 * @param { number } thirtype - 饼图分类  1:人口 2:单位 3:房屋
 * http://56.8.2.241:12808/mapServer/population/countOfBuilding?minX=&maxX=&minY=&maxY=&type=
 */
export const FetchNameplateData = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/population/countOfBuilding?' + param,
    method: 'GET'
  });
  return { res, err };
};

/**
 * 查询某一类重点人员所有子类的数量
 * /mapServer/population/subImportantCount?minX=120&maxX=121&minY=36.4&maxY=
 * @param {*} body
 */
export const GetSubKeyNum = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/population/subImportantCount?' + param,
    method: 'GET'
  });
  return { res, err };
};
