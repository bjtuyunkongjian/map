/**
 * @description 格式化日期时间
 * @param {*} date 日期时间
 * @param {*} fmtType 格式化形式
 */
const FormatDate = (date, fmtType) => {
  const _newDate = new Date(date);
  const _year = _newDate.getFullYear();
  const _month = _newDate.getMonth() + 1;
  const _fmtMonth = _month < 10 ? '0' + _month : _month;
  const _date = _newDate.getDate();
  const _fmtDate = _date < 10 ? '0' + _date : _date;
  const _hour = _newDate.getHours();
  const _fmtHour = _hour < 10 ? '0' + _hour : _hour;
  const _minute = _newDate.getMinutes();
  const _fmtMinute = _minute < 10 ? '0' + _minute : _minute;
  const _second = _newDate.getSeconds();
  const _fmtSecond = _second < 10 ? '0' + _second : _second;
  if (fmtType === 'xxxx/xx/xx') {
    return `${_year}/${_fmtMonth}/${_fmtDate}`;
  } else if (fmtType === 'xxxx/xx/xx xx:xx:xx') {
    return `${_year}/${_fmtMonth}/${_fmtDate} ${_fmtHour}:${_fmtMinute}:${_fmtSecond}`;
  } else if (fmtType === 'xxxx-xx-xx') {
    return `${_year}-${_fmtMonth}-${_fmtDate}`;
  } else {
    return `${_year}-${_fmtMonth}-${_fmtDate} ${_fmtHour}:${_fmtMinute}:${_fmtSecond}`;
  }
};

export default FormatDate;
