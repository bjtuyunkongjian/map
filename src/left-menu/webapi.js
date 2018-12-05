/*
 *这部分js用来和后端进行数据交互
 */
import { FetchRequest } from 'tuyun-utils';

export const FetchXXX = async () => {
  const { res, err } = await FetchRequest({
    url: 'data',
    method: 'POST',
    body: {}
  });
  return { res, err };
};

export const fetchGiftCardSetting = () => {
  return Api.get('/giftCard/isOpen');
};
