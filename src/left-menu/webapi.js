/*
 *这部分js用来和后端进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

export const FetchXXX = async () => {
  const { res, err } = await FetchRequest({
    url: 'test',
    method: 'POST',
    body: {}
  });
  return { res, err };
};
