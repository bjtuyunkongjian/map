/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

// 建筑物详情
export const FetchUnitDetail = async body => {
  Object.assign(body, { test: 'dwDetail' });
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body
  });
  return { res, err };
};
