/*
 *这部分js用来和后端进行数据交互
 */

import { FetchRequest, UploadRequest } from 'tuyun-utils';

export const FetchCityInfo = async body => {
  Object.assign(body, { test: 'switchCity' });
  const { res, err } = await FetchRequest({
    url: 'mapServer/string',
    method: 'POST',
    body
  });
  return { res, err };
};

export const UploadImages = async body => {
  const { res, err } = await UploadRequest('mapServer/fileUpload', body);
  return { res, err };
};

export const SearchDevice = async body => {
  Object.assign(body, { test: 'searchDevice' });
  const { res, err } = await FetchRequest({
    url: 'GPSServer/string',
    method: 'POST',
    body
  });
  return { res, err };
};
