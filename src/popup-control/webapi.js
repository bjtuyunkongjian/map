import { FetchRequest } from 'tuyun-utils';

/**
 * 网吧重点人员列表
 * /mapServer/bar/keyPeople?yycsmc=临邑县翰林网吧&pageSize=10&pageNum=1
 */
export const GetIcafePop = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/bar/keyPeople?' + param,
    method: 'GET'
  });
  return { res, err };
};

/**
 * 宾馆重点人员列表
 * /mapServer/hotel/keyPeople?code=3724120110&pageSize=10&pageNum=1
 */
export const GetHotelPop = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/hotel/keyPeople?' + param,
    method: 'GET'
  });
  return { res, err };
};

/**
 * 卡口重点人员列表
 * mapServer/bayonet/carInfoByBayonet/?timeStart=1572007200&timeEnd=1572307200&pn=1&length=20&kkId=372822418053
 */
export const GetBayonetPop = async param => {
  const { res, err } = await FetchRequest({
    url: 'mapServer/bayonet/carInfoByBayonet/?' + param,
    method: 'GET'
  });
  return { res, err };
};
