export default function FmtSeconds(sec) {
  sec = Math.ceil(sec); // 半秒算一秒
  if (sec < 60) {
    const _sec = sec < 10 ? `0${sec}` : sec;
    return `00:${_sec}`;
  } else if (sec < 3600) {
    let _min = Math.floor(sec / 60);
    _min = _min < 10 ? `0${_min}` : _min;
    let _sec = sec % 60;
    _sec = _sec < 10 ? `0${_sec}` : _sec;
    return `${_min}:${_sec}`;
  } else {
    const _hour = Math.floor(sec / 3600);
    let _min = Math.floor((sec % 3600) / 60);
    _min = _min < 10 ? `0${_min}` : _min;
    let _sec = sec % 60;
    _sec = _sec < 10 ? `0${_sec}` : _sec;
    return `${_hour}:${_min}:${_sec}`;
  }
}
