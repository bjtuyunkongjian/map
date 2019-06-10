/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

// 获取点位图
export const FetchCaseData = async body => {
  Object.assign(body, { test: 'case' });
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body
  });
  return { res, err };
};

// 查询二级案件及数量
export const FetchDetailNum = async body => {
  Object.assign(body, { test: 'getSecNum' });
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body
  });
  return { res, err };
};
