/*
 *这部分js用来和后端进行数据交互
 */

import { FetchRequest } from 'tuyun-utils';

export const FetchCityInfo = async body => {
  Object.assign(body, { test: 'switchCity' });
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body
  });
  return { res, err };
};
