/*
 *这部分js用来和后端进行数据交互
 */

import { FetchRequest } from 'tuyun-utils';

export const SearchDevice = async body => {
  Object.assign(body, { test: 'searchDevice' });
  const { res, err } = await FetchRequest({
    url: 'GPSServer/string',
    method: 'POST',
    body
  });
  return { res, err };
};

/**
 * 基础搜索：
 * 1.身份证搜索
 * http://56.8.2.164:12808/mapServer/search/people/?idCard=372801197501116229
 */
export const GetIdSearch = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/search/people/?' + param,
    method: 'GET'
  });
  return { res, err };
};

/* 2.单位名称搜索
 * http://56.8.2.164:12808/mapServer/search/unit/?unitName=凤凰岭
 */
export const GetUnitData = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/search/unit/?' + param,
    method: 'GET'
  });
  return { res, err };
};

/* 3.地点名称搜索
 * http://56.8.2.164:12808/mapServer/search/poi/?poiName=百临超市
 */
export const GetPoiData = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/search/poi/?' + param,
    method: 'GET'
  });
  return { res, err };
};

/* 4.车牌号搜索
 * http://56.8.2.164:12808/mapServer/search/car/?plateName=S035458
 */
export const GetCarData = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/search/car/?' + param,
    method: 'GET'
  });
  return { res, err };
};

/**
 * 5.案件搜索（案件名称或案件编号）
 * mapServer/search/case/?option=济南大学
 */
export const GetCaseResult = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/search/case/?' + param,
    method: 'GET'
  });
  return { res, err };
};
/**
 * 6.警员搜索
 * GPSServer/selPolice?objectId=37140000000004288
 */
export const GetPoliceResult = async param => {
  const { res, err } = await FetchRequest({
    url: 'GPSServer/selPolice?' + param,
    method: 'GET'
  });
  return { res, err };
};
/**
 * 7.警车搜索
 * GPSServer/selPoliceCar?objectId=37000000035577
 */
export const GetPoliceCarResult = async param => {
  const { res, err } = await FetchRequest({
    url: 'GPSServer/selPoliceCar?' + param,
    method: 'GET'
  });

  return { res, err };
};
/**
 * 多边形搜索 POST请求
 * http://56.8.2.241:12808/mapServer/geoSearch/polygonSearch
 *
 * type表示搜索的类型，值为下列中的一个：
 * importantPerson: 重点人口搜索
 * camera：摄像头搜索
 * specialCompany：特种单位搜索
 * protectCompany：保护单位搜索
 * case：案件搜索
 * policeSituation：警情搜索
 * polygon是下面JSON的字符串格式：
 * {
 * 	type: "Polygon",
 * 	coordinates: [[[x1, y1], [x2, y2], [x3, y3], [x4, y4], . . . , [xn, yn]]]
 * }
 * polygon:geojson格式的面
 *
 */
export const PostPolygonSearch = async body => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/geoSearch/polygonSearch',
    method: 'POST',
    body
  });
  return { res, err };
};

/**
 * http://56.8.2.241:12808/mapServer/geoSearch/circleSearch?
 * type= &point=&radius=
 * type 同上
 * point是下面JSON的字符串格式：
 * {
 * 	type: "Point",
 * 	coordinates: [longitude, latitude]
 * }
 * radius: 半径，单位米，double类型
 */
export const GetCircleSearch = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/geoSearch/circleSearch?' + param,
    method: 'GET'
  });
  return { res, err };
};
