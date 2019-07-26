/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

// 建筑物详情
export const FetchProgressData = async body => {
  Object.assign(body, { test: 'lkywHF' });
  const { res, err } = await FetchRequest({
    url: 'GPSServer/string',
    method: 'POST',
    body
  });
  return { res, err };
};
