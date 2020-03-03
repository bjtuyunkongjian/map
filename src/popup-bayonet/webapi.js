/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

/**
 * 点击出现卡口详情
 * mapServer/bayonet/bayonetDetail/?
 * kkId=372822418053
 */
export const GetBayonetDetail = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/bayonet/bayonetDetail/?' + param,
    method: 'GET'
  });
  return { res, err };
};
