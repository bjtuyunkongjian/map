import { BaseConfig as CONFIG } from 'tuyun-config';

/**
 * @param {string} url 接口地址
 * @param {string} method 请求方法：GET、POST、PUT、DELETE，只能大写
 * @param {JSON} [body=''] body的请求参数，默认为空
 * @return {res: xxx, err: xxx}
 */
export const FetchRequest = async function({ url, method, body = {} }) {
  const request = {
    method: method || 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  };

  if (method !== 'GET') {
    request.body = JSON.stringify(body);
  }

  // 添加网络超时机制
  const timeoutId = setTimeout(() => {
    return new Promise(resolve => {
      resolve({
        res: null,
        err: 'timeout'
      });
    });
  }, CONFIG.httpTimeOut * 1000);

  try {
    const response = await fetch(CONFIG.geojsonHost + url, request);

    clearTimeout(timeoutId);
    const responseData = await response.json();

    const { statusInfo, data, ok } = responseData;

    // if (__DEV__) {
    //   console.log('responseData', responseData);
    // }

    return new Promise(resolve => {
      resolve({
        // 有时会返回0的结果
        res: ok ? data : null,
        err: ok ? null : statusInfo,
        ok: ok
      });
    });
  } catch (err) {
    clearTimeout(timeoutId);
    return new Promise(resolve => {
      resolve({
        res: null,
        err: err
      });
    });
  }
};
