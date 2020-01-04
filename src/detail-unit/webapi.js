/**
 * 这部分js用于和后台进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

/**
 * 获取单位数据
 * /mapServer/company/distribution?
 * minX=120&maxX=125&minY=36.4&maxY=37&level=9.5&type=BHDW&tzbhbm=252
 */
export const GetDistribution = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/company/distribution?' + param,
    method: 'GET'
  });
  return { res, err };
};

/**
 * 获取3D建筑物上的铭牌数字
 * /mapServer/company/countOfBuilding?
 * minX=120&maxX=125&minY=36.4&maxY=37&type=PTDW
 */
export const GetNameplate = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/company/countOfBuilding?' + param,
    method: 'GET'
  });
  return { res, err };
};

/**
 * 获取二级分类的数量
 * /mapServer/company/subCatalogsOfOther?
 * minX=120&maxX=125&minY=36.4&maxY=37&type=BHDW&code=999&subCode=252
 */
export const GetSubCatalogs = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/company/subCatalogsOfOther?' + param,
    method: 'GET'
  });
  return { res, err };
};
