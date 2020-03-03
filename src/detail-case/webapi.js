/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

// 获取点位图
// http://56.8.2.241:12808/mapServer/case/distribution? minX=&maxX=&minY=&maxY=&startTime=&endTime=&type=&level=
export const GetCaseData = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/case/distribution?' + param,
    method: 'GET'
  });
  return { res, err };
};

/**
 * 查询二级案件及数量
 * mapServer/case/subCount? minX=&maxX=&minY=&maxY=&startTime=&endTime=&type=&level=
 * */

export const GetDetailNum = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/case/subCount?' + param,
    method: 'GET'
  });
  return { res, err };
};
