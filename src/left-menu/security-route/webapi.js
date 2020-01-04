import { FetchRequest } from 'tuyun-utils';

/**
 * 安保路线第一个点
 * GPSServer/routeFirst?
 * minx=116.91671650144087&maxx=116.91689661214819&miny=36.992216289773154&maxy=36.99297007617527&x=116.91675650144087&y=36.992316289773154
 */
export const GetRouteFirst = async param => {
  return await FetchRequest({
    url: 'GPSServer/routeFirst?' + param,
    method: 'GET'
  });
};

/**
 * 获取当前屏幕所有路的id
 * GPSServer/switchScreen?
 * minX=116&maxX=116&minY=36&maxY=36
 */
export const GetRoadIds = async param => {
  return await FetchRequest({
    url: 'GPSServer/switchScreen?' + param,
    method: 'GET'
  });
};

/**
 * 安保路线的第二个到倒数第二个点
 * GPSServer/routePlus
 * @param {Object} body
 */
export const PostRoutePlus = async body => {
  return await FetchRequest({
    url: 'GPSServer/routePlus',
    method: 'POST',
    body
  });
};

/**
 * 安保路线倒数第二个点，就是按下 设置终点
 * GPSServer/routePenult?
 * x=116&y=36&userData=088b3c47-fcf3-4766-acf4-6ffd4d541eed
 * @param {*} param
 */
export const GetRoutePenult = async param => {
  return await FetchRequest({
    url: 'GPSServer/routePenult?' + param,
    method: 'GET'
  });
};

/**
 * 安保路线最后一个点
 * GPSServer/routeLast?
 * preX=116&preY=36&userData=088b3c47-fcf3-4766-acf4-6ffd4d541eed&curX=116&curY=36
 * @param {*} param
 */
export const GetRouteLast = async param => {
  return await FetchRequest({
    url: 'GPSServer/routeLast?' + param,
    method: 'GET'
  });
};

/**
 * 保存安保路线
 * GPSServer/storeFile?
 * fileName=test&id=1&jsonString={"a":"1"}
 */
export const SaveScurityRoute = async body => {
  Object.assign(body, { test: 'storeFile' });
  const { res, err } = await FetchRequest({
    url: 'GPSServer/storeFile?',
    method: 'POST',
    body
  });
  return { res, err };
};

/**
 * 获取所有的安保路线
 * GPSServer/securityName
 */
export const GetAllRoutes = async () => {
  const { res, err } = await FetchRequest({
    url: 'GPSServer/securityName',
    method: 'GET'
  });
  return { res, err };
};

/**
 * 查看安保具体路线
 * GPSServer/securityDetail?
 * fileName=test_1
 */
export const GetRouteDetail = async param => {
  return await FetchRequest({
    url: 'GPSServer/securityDetail?' + param,
    method: 'GET'
  });
};

/**
 * 删除接口
 * GPSServer/delFile?
 * fileName=测试_1571191031714
 */
export const DeleteFile = async param => {
  return await FetchRequest({
    url: 'GPSServer/delFile?' + param,
    method: 'DELETE'
  });
};
