/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

export const FetchPopulation = async body => {
  Object.assign(body, { test: 'pop' });
  // console.log(JSON.stringify(body));
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body
  });
  return { res, err };
};

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
  // console.log(JSON.stringify(body));
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body
  });
  console.log('_fetchRes', { res, err });
  return { res, err };
};
