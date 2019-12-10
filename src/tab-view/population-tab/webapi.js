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
 * http://host:port/mapServer/population/countOfBuilding?minX=&maxX=&minY=&maxY=&type=&zdrylb=&level=
 */
export const GetNameplate = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/population/countOfBuilding?' + param,
    method: 'GET'
  });
  return { res, err };
};

/**
 * 获取右侧统计图数据
 * http://host:port/mapServer/population/count?minX=&maxX=&minY=&maxY=&level=
 */
export const GetChartData = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/population/count?' + param,
    method: 'GET'
  });
  return { res, err };
};

export const GetPopDenisty = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/population/density?' + param,
    method: 'GET'
  });
  return { res, err };
};
