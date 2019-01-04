/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

// 一标三实
export const FetchPopulation = async body => {
  Object.assign(body, { test: 'pop' });
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body
  });
  return { res, err };
};

// 摄像头
export const FetchCamera = async body => {
  Object.assign(body, { test: 'cameraNum' });
  console.log(JSON.stringify(body));
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body
  });
  return { res, err };
};

// 民警工作日常
export const FetchWorkContent = async body => {
  Object.assign(body, { test: 'policeDaily' });
  console.log(JSON.stringify(body));
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body
  });
  return { res, err };
};

// 安保路线规划
export const FetchRoadInfo = async body => {
  Object.assign(body, { test: 'routePlanning' });
  console.log(body);
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body
  });
  console.log('_fetchRes', { res, err });
  return { res, err };
};

// 报警
export const FetchCallPolice = async body => {
  Object.assign(body, { test: 'alarmNum' });
  console.log(body);
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
  console.log(body);
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body
  });
  console.log(res, err);
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

export const DivideRoute = async body => {
  Object.assign(body, { test: 'divDistance' });
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body: body
  });
  return { res, err };
};
