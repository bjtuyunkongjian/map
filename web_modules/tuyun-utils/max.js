export default function Max(data) {
  const _dataType = Object.prototype.toString.call(data);
  if (_dataType === '[object Array]') {
    return Math.max(...data);
  } else if (_dataType === '[object Object]') {
    const _dataArr = [];
    for (let key in data) {
      _dataArr.push(data[key]);
    }
    return Math.max(..._dataArr);
  } else {
    return NaN;
  }
}
