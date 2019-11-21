/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

/**
 * 获取3D建筑物上的铭牌数字
 * mapServer/house/countOfBuilding?
 * minX=117.00559573082222&maxX=117.01411977004557&minY=36.65298595795507&maxY=36.65634282667543&type=QBFW
 */
export const GetCountOfBuilding = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/house/countOfBuilding?' + param,
    method: 'GET'
  });
  return { res, err };
};

/**
 * 获取右侧统计图数据
 * mapServer/house/count?
 * minX=120&maxX=125&minY=36.4&maxY=37&level=8.7
 */
export const GetCount = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/house/count?' + param,
    method: 'GET'
  });
  return { res, err };
};

/**
 * 获取单位密度图
 * mapServer/house/density?type=ZZFW
 */
export const GetDensity = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/house/density?' + param,
    method: 'GET'
  });
  return { res, err };
};
