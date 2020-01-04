/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

// 建筑物详情
export const GetDetail = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/population/detail?' + param,
    method: 'GET'
  });
  return { res, err };
};
