import { FetchRequest } from 'tuyun-utils';

/**
 * 获取警员警车的详情
 * http://localhost:8082/GPSServer/policeDetail?objectId=37130000000000004
 */
export const GetPoliceDetail = async param => {
  const { res, err } = await FetchRequest({
    url: 'GPSServer/policeDetail?' + param,
    method: 'GET'
  });
  return { res, err };
};
