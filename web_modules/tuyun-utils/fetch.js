/**
 * @param {string} url 接口地址
 * @param {string} method 请求方法：GET、POST、PUT、DELETE，只能大写，method 默认为 GET方法
 * @param {JSON} [body={}] body的请求参数，默认为空
 * @return {res: xxx, err: xxx}
 */
import { BaseConfig as CONFIG } from 'tuyun-config';
import { TuyunMessage } from 'tuyun-kit';

export const FetchRequest = async function({
  host = CONFIG.bffHost,
  url,
  method = 'GET',
  body = {}
}) {
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
      const _response = await fetch(host + url, _request);

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
      const _err = status !== 'success' && message;
      _err && TuyunMessage.error(_err);
      resolve({
        // 有时会返回0的结果
        res: _err ? null : data,
        err: _err ? message : null
      });
    } catch (err) {
      // 404 错误也会到这
      clearTimeout(_timeoutId); // 报错了，清除定时器
      // __DEV__ && TuyunMessage.error(`请求错误，url：${url}`);
      resolve({
        res: null,
        err: err
      });
    }
  });
};

///////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                   //
//                                              沈良最帅                                              //
//                                                                                                   //
///////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * @param {string} url 接口地址
 * @param {JSON} [uploadFile={}] body的请求参数，默认为空
 * @return {res: xxx, err: xxx}
 */
export const UploadRequest = async function({
  host = CONFIG.bffHost,
  url,
  uploadFile = {}
}) {
  const _request = {
    method: 'POST'
    // headers: {
    //   'Content-Type': 'multipart/form-data;charset=utf-8' // 为什么不需要设置 Content-Type ?
    // }
  };
  return new Promise(async resolve => {
    // 判断选择的图片数量
    const _fileCount = Object.keys(uploadFile).length; // 上传文件数量
    // 没有文件，直接 resolve
    if (_fileCount <= 0) {
      TuyunMessage.show('未选择任何图片');
      resolve({
        res: null,
        err: '未选择任何图片'
      });
      return;
    }
    // 设置 formData
    const _fromData = new FormData();
    if (_fileCount === 1) {
      _fromData.append('file', uploadFile[0]);
    } else {
      Object.keys(uploadFile).map(key => {
        _fromData.append('files', uploadFile[key]);
      });
    }

    // 添加网络超时机制
    const _timeoutId = setTimeout(() => {
      __DEV__ && TuyunMessage.error(`网络传输超时！url：${url}`); // 开发环境，报网络超时错误
      resolve({
        res: null,
        err: 'timeout'
      });
    }, CONFIG.httpTimeOut * 1000);

    // 请求 http://192.168.8.111:8080/mapServer/fileUpload
    // url mapServer/fileUpload
    try {
      const _response = await fetch(host + url, _request);

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
      const _err = status !== 'success' && message;
      _err && TuyunMessage.error(_err);
      resolve({
        // 有时会返回0的结果
        res: _err ? null : data,
        err: _err ? message : null
      });
    } catch (err) {
      // 404 错误也会到这
      clearTimeout(_timeoutId); // 报错了，清除定时器
      __DEV__ && TuyunMessage.error(`请求错误，url：${url}`);
      resolve({
        res: null,
        err: err
      });
    }
  });
};
