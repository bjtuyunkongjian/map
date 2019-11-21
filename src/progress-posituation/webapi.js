/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

/**
 * 获取警情的动态播放数据
 * mapServer/policeSituation/dynamic?minX=&code=&beginTime=&endTime=&level=&minY=&maxX=&maxY=&split=
 */
export const GetProgressData = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/policeSituation/dynamic?' + param,
    method: 'GET'
  });
  return { res, err };
};
