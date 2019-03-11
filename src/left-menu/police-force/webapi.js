/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

export const FetchLocationCar = async body => {
  Object.assign(body, { test: 'locationCar' });
  const { res, err } = await FetchRequest({
    url: 'GPSServer/string',
    method: 'POST',
    body: body
  });
  return { res, err };
};

export const QueryDetail = async body => {
  Object.assign(body, { test: 'queryDetail' });
  const { res, err } = await FetchRequest({
    url: 'GPSServer/string',
    method: 'POST',
    body: body
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
