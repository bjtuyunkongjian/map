/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

// 人口详情
export const FetchPersonDetail = async body => {
  Object.assign(body, { test: 'personDetail' });
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body
  });
  return { res, err };
};

// 建筑物详情
export const FetchHouseDetail = async body => {
  // Object.assign(body, { test: 'jzwDetail' });
  const { res, err } = await FetchRequest({
    url: 'dataManage/testJzwDetail',
    method: 'POST',
    body
  });
  return { res, err };
};
