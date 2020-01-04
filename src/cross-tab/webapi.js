import { FetchRequest } from 'tuyun-utils';

/**
 * 获取人口右侧统计图数据
 * mapServer/population/countByEnvelop?minX=115&maxX=122&minY=35&maxY=38&level=7
 */
export const GetPopulationCount = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/population/countByEnvelop?' + param,
    method: 'GET'
  });
  return { res, err };
};

/**
 * 获取人口分布数据
 * http://host:port/mapServer/population/distribution?minX=&maxX=&minY=&maxY=&type=&level=
 */
export const GetPopulationDistribution = async param => {
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
export const GetCountOfBuilding = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/population/countOfBuilding?' + param,
    method: 'GET'
  });
  return { res, err };
};

/**
 * 获取案件柱状图数据
 * mapServer/case/countByEnvelop?
 * minX=115&maxX=122&minY=35&maxY=38&startTime=2017-08-01&endTime=2019-04-25&level=7.19
 */
export const GetCaseCount = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/case/countByEnvelop?' + param,
    method: 'GET'
  });
  return { res, err };
};

/**
 * 获取警情柱状图数据
 * mapServer/policeSituation/countByEnvelop?
 * minX=115&maxX=122&minY=35&maxY=38&startTime=${}&endTime=${}&level=${}
 */
export const GetSituationCount = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/policeSituation/countByEnvelop?' + param,
    method: 'GET'
  });
  return { res, err };
};
