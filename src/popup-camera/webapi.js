import { FetchRequest } from 'tuyun-utils';

/**
 * http://56.8.2.241:12808/mapServer/geoSearch/polygonSearch?
 * type= &polygon=
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
 */

export const GetPolygonSearch = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/geoSearch/polygonSearch?' + param,
    method: 'GET'
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

export const GetCamera = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/camera/distribution?' + param,
    method: 'GET'
  });
  return { res, err };
};
