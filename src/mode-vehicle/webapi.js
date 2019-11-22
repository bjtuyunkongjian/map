/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

//
export const FetchVehicleData = async body => {
  Object.assign(body, { test: 'locationCar' });
  const { res, err } = await FetchRequest({
    url: 'GPSServer/string',
    method: 'POST',
    body
  });
  return { res, err };
};
