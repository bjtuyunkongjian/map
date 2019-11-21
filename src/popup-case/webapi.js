/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

/**
 * 点击出现案件详情
 * http://56.8.2.241:12808/mapServer/case/detail? ajbh=
 */
export const GetCaseDetail = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/case/detail?' + param,
    method: 'GET'
  });
  return { res, err };
};
