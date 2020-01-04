/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

/**
 * 点击出现警情详情
 * /policeSituation/detail?jjdbh=
 * mapServer/policeSituation/detail?jjdbh=370100012018011
 */
export const GetPosituationDetail = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/policeSituation/detail?' + param,
    method: 'GET'
  });
  return { res, err };
};
