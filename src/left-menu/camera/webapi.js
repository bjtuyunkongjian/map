import { FetchRequest } from 'tuyun-utils';

/**
 * 摄像头点位图
 * mapServer/camera/distribution?minX=&maxX=&minY=&maxY=
 */
export const GetCameraData = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/camera/distribution?' + param,
    method: 'GET'
  });
  return { res, err };
};
