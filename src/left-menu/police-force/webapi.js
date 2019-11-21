/**
 * @author sl
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

/**
 * 获取警车实时位置
 * GPSServer/policeCurrentCar
 */
export const GetPoliceCar = async () => {
  const { res, err } = await FetchRequest({
    url: 'GPSServer/policeCurrentCar',
    method: 'GET'
  });
  return { res, err };
};

/**
 * 2.获取警用设备的详情
 * /GPSServer/policeDetail?
 * objectId=37130000000000004
 */
export const GetPoliceDetail = async param => {
  const { res, err } = await FetchRequest({
    url: 'GPSServer/policeDetail?' + param,
    method: 'GET'
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
