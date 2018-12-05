import { BaseConfig as CONFIG } from 'tuyun-config';
import { TuyunMessage } from 'tuyun-kit';

/**
 * @param {string} url 接口地址
 * @param {string} method 请求方法：GET、POST、PUT、DELETE，只能大写，method 默认为 GET方法
 * @param {JSON} [body=''] body的请求参数，默认为空
 * @return {res: xxx, err: xxx}
 */
export const FetchRequest = async function({ url, method = 'GET', body = {} }) {
  const request = {
    method: method || 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  };

  if (method !== 'GET') {
    request.body = JSON.stringify(body);
  }

  return new Promise(async resolve => {
    // 添加网络超时机制
    const _timeoutId = setTimeout(() => {
      __DEV__ && TuyunMessage.error(`网络传输超时！url：${url}`); // 开发环境，报网络超时错误
      resolve({
        res: null,
        err: 'timeout'
      });
    }, CONFIG.httpTimeOut * 1000);
    try {
      const _response = await fetch(CONFIG.bffHost + url, request);

      clearTimeout(_timeoutId); // 获取到了数据，清除定时器
      const { statusInfo, data, ok } = await _response.json();

      const _err = ok ? null : statusInfo;
      TuyunMessage.error(_err);
      resolve({
        // 有时会返回0的结果
        res: ok ? data : null,
        err: ok ? null : statusInfo
      });
    } catch (err) {
      // 永远不会到达这~
      clearTimeout(_timeoutId); // 报错了，清除定时器
      TuyunMessage.error(`前端请求错误，url：${url}`);
      resolve({
        res: null,
        err: err
      });
    }
  });
};
