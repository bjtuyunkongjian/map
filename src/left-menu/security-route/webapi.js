/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

// 安保路线规划
export const FetchRoadInfo = async body => {
  Object.assign(body, { test: 'routePlanning' });
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body
  });
  return { res, err };
};

// 保存安保路线
export const SaveScurityRoute = async body => {
  Object.assign(body, { test: 'storeFile' });
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body
  });
  return { res, err };
};

// 获取所有的安保路线
export const FetchAllRoutes = async () => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body: { test: 'getAllFileNames' }
  });
  return { res, err };
};

export const FetchRouteInfo = async body => {
  Object.assign(body, { test: 'queryFile' });
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body: body
  });
  return { res, err };
};
