/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

export const FetchRoadInfo = async body => {
  Object.assign(body, { test: 'routePlanning' });
  console.log(body);
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body
  });
  return { res, err };
};
