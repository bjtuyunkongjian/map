/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from './node_modules/tuyun-utils';

// 民警工作日常
export const FetchGeoRes = async body => {
  const { res, err } = await FetchRequest({
    url: 'get-results',
    method: 'POST',
    body
  });
  return { res, err };
};
