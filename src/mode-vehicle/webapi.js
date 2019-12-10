/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

/**
 * GPSServer/twoOneCurrentCar?
 * type=1&minx=114&maxx=121&miny=34&maxy=37
 */
export const FetchVehicleData = async param => {
  const { res, err } = await FetchRequest({
    url: 'GPSServer/twoOneCurrentCar?' + param,
    method: 'GET'
  });
  return { res, err };
};
