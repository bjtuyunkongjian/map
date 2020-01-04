/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

/**
 * 获取警情的点位图
 * mapServer/policeSituation/distribute?
 * minX=&maxX=&minY=&maxY=&beginTime=&endTime=&code=&level=
 */
export const Getdistribution = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/policeSituation/distribute?' + param,
    method: 'GET'
  });
  return { res, err };
};

/**
 * 查询二级警情及数量
 * mapServer/casepoliceSituation/subCount?
 * minX=&maxX=&minY=&maxY=&startTime=&endTime=&type=&level=
 *
 * */
export const GetDetailNum = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/casepoliceSituation/subCount?' + param,
    method: 'GET'
  });
  return { res, err };
};
