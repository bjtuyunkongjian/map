/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

/**
 * 单位详情
 * /mapServer/company/detail?
 * zagldwbm=56D775F3-395F-4184-E050-310A48086102
 */
export const GetDetail = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/company/detail?' + param,
    method: 'GET'
  });
  return { res, err };
};
