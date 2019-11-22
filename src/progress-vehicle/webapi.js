import { FetchRequest } from 'tuyun-utils';

/**
 * 取两客一危车辆的回放信息
 * GPSServer/twoOneCarHistory
 * type=1&minX=114&maxX=121&minY=34&maxY=37
 */
export const PostCarHistory = async body => {
  const { res, err } = await FetchRequest({
    url: 'GPSServer/twoOneCarHistory',
    method: 'POST',
    body
  });
  return { res, err };
};
