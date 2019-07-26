import { FormatDate } from 'tuyun-utils';

export const CreateUnitArr = (timeArr, len) => {
  const _unitArr = [];
  const _unitCount = Math.ceil(timeArr.length / len); // 不满一次算一次
  for (let i = 0; i < _unitCount; i++) {
    const _start = i * len;
    const _end = Math.min(_start + len, timeArr.length); // 取最小值
    const _unitDate = timeArr.slice(_start, _end);
    _unitArr.push(_unitDate);
  }
  return _unitArr;
};

export const ConvertDateList = (dateList = [], timeInterval, endMilliSec) => {
  endMilliSec += timeInterval;
  const _dateArr = [];
  for (let i = 0; i < dateList.length; i++) {
    const _start = dateList[i];
    const _startMilliSec = new Date(_start).getTime();
    const _endMilliSec = Math.min(_startMilliSec + timeInterval, endMilliSec);
    const _endDate = new Date(_endMilliSec);
    const _end = FormatDate(_endDate);
    if (_start !== _end) {
      _dateArr.push({ start: _start, end: _end });
    }
  }
  return _dateArr;
};

export const ReqArrLen = 24; // 每次请求的分段数量
export const DateMilliSecs = 24 * 3600 * 1000; // 一天的毫秒数
