/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

// 一标三实
export const FetchPopulation = async body => {
  Object.assign(body, { test: 'pop' });
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body
  });
  return { res, err };
};
