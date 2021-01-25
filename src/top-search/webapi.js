/*
 *这部分js用来和后端进行数据交互
 */

import { FetchRequest } from 'tuyun-utils';

// http://47.110.135.245:8888/geocode   post
// {addrs:["山东省济南市天桥区重汽翡翠郡南区20号楼","北园街道花格小区45号楼","青后小区四区5号楼","山东省济南市平阴县新世纪广场2号楼","山东省济南市天桥区前陈家楼22号","明珠东区二区(石河街西70米)"],"radius": 100}

// http://47.110.135.245:8888/geocode/reverse		post
// {"geoms":["116.45400392954893,36.27996949812147","116.73941647280677,36.560322185464265","117.05113834386147,36.67904470485607","116.97140108923175,36.64915925901595","117.060584222153,36.67805110800583","116.97695186221038,36.6324651935658"],
// "radius": 100,
// "num": 3
// }

/**
 * 文字转地址
 * http://47.110.135.245:8888/geocode
 */
export const PostGeocode = async address => {
  const body = { addrs:[ address],"radius": 100 };
  const { res, err } = await FetchRequest({
    url: 'geocode',
    method: 'POST',
    body: body
  });
  return { res, err };
};

/**
 * 文字转地址
 * http://47.110.135.245:8888/geocode
 */
export const PostGeocodeReverse = async address => {
  const body = { addrs:[address],"radius": 100, num: 5 };
  const { res, err } = await FetchRequest({
    url: 'geocode/reverse',
    method: 'POST',
    body: body
  });
  return { res, err };
};