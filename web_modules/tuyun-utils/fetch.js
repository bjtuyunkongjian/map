import { BaseConfig as CONFIG } from 'tuyun-config';
import { TuyunMessage } from 'tuyun-kit';

/**
 * @param {string} url 接口地址
 * @param {string} method 请求方法：GET、POST、PUT、DELETE，只能大写，method 默认为 GET方法
 * @param {JSON} [body=''] body的请求参数，默认为空
 * @return {res: xxx, err: xxx}
 */
export const FetchRequest = async function({ url, method = 'GET', body = {} }) {
  const _request = {
    method: method || 'GET',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  };

  if (method !== 'GET') {
    _request.body = JSON.stringify(body);
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
      const _response = await fetch(CONFIG.bffHost + url, _request);

      clearTimeout(_timeoutId); // 获取到了数据，清除定时器
      // 判断状态码
      if (_response.status !== 200) {
        // 状态码不等于200
        TuyunMessage.error(`url：${url}，${_response.status}`);
        resolve({
          res: null,
          err: _response.statusText
        });
        return;
      }
      // 状态码没问题
      const { message, data, status } = await _response.json();
      const _err = status === 'success' && message;
      _err && TuyunMessage.error(_err);
      resolve({
        // 有时会返回0的结果
        res: _err ? null : data,
        err: _err ? message : null
      });
    } catch (err) {
      // 404 错误也会到这
      clearTimeout(_timeoutId); // 报错了，清除定时器
      __DEV__ && TuyunMessage.error(`请求错误（可能是404），url：${url}`);
      resolve({
        res: null,
        err: err
      });
    }
  });
};
