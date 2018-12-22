/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

export const FetchPopulation = async body => {
  Object.assign(body, { test: 'pop' });
  // console.log(JSON.stringify(body));
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body
  });
  return { res, err };
};
