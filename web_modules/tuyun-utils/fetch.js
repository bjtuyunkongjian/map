import { BaseConfig as CONFIG } from 'tuyun-config';

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
    const timeoutId = setTimeout(() => {
      resolve({
        res: null,
        err: 'timeout'
      });
    }, CONFIG.httpTimeOut * 1000);

    try {
      const response = await fetch(CONFIG.bffHost + url, request);

      clearTimeout(timeoutId); // 获取到了数据，清除定时器
      const responseData = await response.json();

      const { statusInfo, data, ok } = responseData;

      // if (__DEV__) {
      //   console.log('responseData', responseData);
      // }

      return new Promise(resolve => {
        resolve({
          // 有时会返回0的结果
          res: ok ? data : null,
          err: ok ? null : statusInfo
        });
      });
    } catch (err) {
      clearTimeout(timeoutId); // 获取到了数据，清除定时器
      return new Promise(resolve => {
        resolve({
          res: null,
          err: err
        });
      });
    }
  });

  // // 添加网络超时机制
  // const timeoutId = setTimeout(() => {
  //   return new Promise(resolve => {
  //     resolve({
  //       res: null,
  //       err: 'timeout'
  //     });
  //   });
  // }, CONFIG.httpTimeOut * 1000);

  // try {
  //   const response = await fetch(CONFIG.bffHost + url, request);

  //   clearTimeout(timeoutId);
  //   const responseData = await response.json();

  //   const { statusInfo, data, ok } = responseData;

  //   // if (__DEV__) {
  //   //   console.log('responseData', responseData);
  //   // }

  //   return new Promise(resolve => {
  //     resolve({
  //       // 有时会返回0的结果
  //       res: ok ? data : null,
  //       err: ok ? null : statusInfo
  //     });
  //   });
  // } catch (err) {
  //   clearTimeout(timeoutId);
  //   return new Promise(resolve => {
  //     resolve({
  //       res: null,
  //       err: err
  //     });
  //   });
  // }
};
