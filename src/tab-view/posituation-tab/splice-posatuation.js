/**
 * 划分规则：
 * 日/星期/月/季度/年
 * 自然月
 * 自然季度
 * */
import { IsEmpty } from 'tuyun-utils';

/**
 * @description 分割起始和终止日期
 * @param { Object } param0
 * 1. 小于 7 天，按天分割，如果 5 天就分割成 5 份；
 * 2. 大于 7 天小于 maxSplitTimes 周，按周分割，如果 5 就分割为 5 份；
 * 3. 大于 maxSplitTimes 周小于 maxSplitTimes 月，按月分割；
 * 4. 大于 maxSplitTimes 月小于 maxSplitTimes 个季度，按季度分割；
 * 5. 小于 maxSplitTimes 季度大于 maxSplitTimes 年，按年分割；
 * 6. 大于 maxSplitTimes 年，按照新的分割形式
 */
function SplitDate({ start, end }) {
  if (IsEmpty(start) || IsEmpty(end)) return [];
  const _startMilliSecs = new Date(
    start.year,
    start.month,
    start.date
  ).getTime();
  const _endMilliSecs = new Date(end.year, end.month, end.date).getTime();
  const _totalDays = (_endMilliSecs - _startMilliSecs) / DayMilliSecs; // 总的天数
  const _totalMonths = (end.year - start.year) * 12 + (end.month - start.month);
  const _totalYears = end.year - start.year;
  let _dateArr = [];
  if (_totalDays <= weekDays) {
    _dateArr = splitByDay(_startMilliSecs, _totalDays);
  } else if (_totalDays <= weekDays * maxSplitTimes) {
    _dateArr = splitByWeek(_startMilliSecs, _endMilliSecs, _totalDays);
  } else if (_totalMonths < maxSplitTimes) {
    _dateArr = splitByMonth(_startMilliSecs, _endMilliSecs);
  } else if (_totalMonths < maxSplitTimes * 3) {
    _dateArr = splitByQuarter(_startMilliSecs, _endMilliSecs);
  } else if (_totalYears < maxSplitTimes) {
    _dateArr = splitByYear(_startMilliSecs, _endMilliSecs);
  } else {
    _dateArr = splitByMaxYear(_startMilliSecs, _endMilliSecs);
  }
  return { dateArr: _dateArr };
}

/**
 * @description 按天划分
 * @param { Number } startMilliSecs
 * @param { Number } totalDays
 */
function splitByDay(startMilliSecs, totalDays) {
  // 总天数小于一周，直接按天分
  const _dateArr = [];
  for (let i = 0; i <= totalDays; i++) {
    const _date = new Date(startMilliSecs + DayMilliSecs * i);
    _dateArr.push({
      year: _date.getFullYear(),
      month: _date.getMonth(),
      date: _date.getDate()
    });
  }
  return _dateArr;
}

/**
 * @description 按周划分
 * @param { Number } startMilliSecs
 * @param { Number } endMilliSecs
 * @param { Number } totalDays
 */
function splitByWeek(startMilliSecs, endMilliSecs, totalDays) {
  const _dateArr = [];
  const _arrLen = Math.ceil(totalDays / weekDays);
  for (let i = 0; i <= _arrLen; i++) {
    const _date = new Date(
      Math.min(startMilliSecs + DayMilliSecs * i * weekDays, endMilliSecs)
    );
    _dateArr.push({
      year: _date.getFullYear(),
      month: _date.getMonth(),
      date: _date.getDate()
    });
  }
  return _dateArr;
}

/**
 * @description 将日期按月划分
 * @param { number } startMilliSecs
 * @param { number } endMilliSecs
 */
function splitByMonth(startMilliSecs, endMilliSecs) {
  const _dateArr = [];
  const _start = new Date(startMilliSecs);
  const _end = new Date(endMilliSecs);
  const _startY = _start.getFullYear(); // 起始年
  const _startM = _start.getMonth(); // 起始月
  const _endY = _end.getFullYear(); // 结束年
  const _endM = _end.getMonth(); // 结束月
  const _arrLen = (_endY - _startY) * 12 + (_endM - _startM) + 1; // 共有多少个月，包括起始和终止月份
  for (let i = 0; i <= _arrLen; i++) {
    const _curMonth = new Date(_startY, _startM + i, 1);
    const _monthMilliSecs = _curMonth.getTime();
    let _date = _curMonth;
    if (_monthMilliSecs < startMilliSecs) {
      _date = _start;
    } else if (_monthMilliSecs > endMilliSecs) {
      _date = _end;
    }
    _dateArr.push({
      year: _date.getFullYear(),
      month: _date.getMonth(),
      date: _date.getDate()
    });
  }
  return _dateArr;
}

/**
 * @description 按季度划分
 * @param { number } startMilliSecs 开始日期的毫秒数
 * @param { number } endMilliSecs 结束日期的毫秒数
 * 返回自然季度分组
 */
function splitByQuarter(startMilliSecs, endMilliSecs) {
  const _dateArr = [];
  const _start = new Date(startMilliSecs);
  const _end = new Date(endMilliSecs);
  const _startY = _start.getFullYear(); // 起始年
  const _startM = _start.getMonth(); // 起始月
  const _endY = _end.getFullYear(); // 结束年
  const _endM = _end.getMonth(); // 结束月
  const _months = (_endY - _startY) * 12 + (_endM - _startM); // 期间有多少个月
  const _arrLen = Math.ceil(_months / 3) + 1;
  for (let i = 0; i < _arrLen; i++) {
    const _quarterStartM = Math.floor(_startM / 3) + i;
    const _curQuarterM = new Date(_startY, _quarterStartM * 3, 1);
    const _quarterMilliSecs = _curQuarterM.getTime();
    let _date = _curQuarterM;
    if (_quarterMilliSecs < startMilliSecs) {
      _date = _start;
    } else if (_quarterMilliSecs > endMilliSecs) {
      _date = _end;
    }
    _dateArr.push({
      year: _date.getFullYear(),
      month: _date.getMonth(),
      date: _date.getDate()
    });
  }
  return _dateArr;
}

/**
 * @description 按年划分，没有考虑超过七年的情况
 * @param { number } startMilliSecs
 * @param { number } endMilliSecs
 * 返回按年分组
 */
function splitByYear(startMilliSecs, endMilliSecs) {
  let _dateArr = [];
  const _start = new Date(startMilliSecs);
  const _end = new Date(endMilliSecs);
  const _startY = _start.getFullYear();
  const _endY = _end.getFullYear();
  const _arrLen = _endY - _startY + 1;
  for (let i = 0; i <= _arrLen; i++) {
    const _curYear = new Date(_startY + i, 0, 1);
    const _yearMilliSecs = _curYear.getTime();
    let _date = _curYear;
    if (_yearMilliSecs < startMilliSecs) {
      _date = _start;
    } else if (_yearMilliSecs > endMilliSecs) {
      _date = _end;
    }
    _dateArr.push({
      year: _date.getFullYear(),
      month: _date.getMonth(),
      date: _date.getDate()
    });
  }
  return _dateArr;
}

/**
 * @description 超过 maxSplitTimes 年，执行该函数
 * @param { Number } startMilliSecs
 * @param { Number } endMilliSecs
 */
function splitByMaxYear(startMilliSecs, endMilliSecs) {
  return [];
}

const DayMilliSecs = 24 * 3600 * 1000; // 一天的毫秒数
const weekDays = 7; // 一周的天数
const maxSplitTimes = 7; // 划分的最多的份数

export { SplitDate, DayMilliSecs };
