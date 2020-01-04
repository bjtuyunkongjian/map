/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

/**
 * 获取案件的动态播放数据
 * /mapServer/case/dynamic? minX=&maxX=&minY=&maxY=&startTime=&endTime=&intervals=&type=
 */
export const GetProgressData = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/case/dynamic?' + param,
    method: 'GET'
  });
  return { res, err };
};
