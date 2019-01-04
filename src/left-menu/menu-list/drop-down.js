/**
 * 确保
 * 1. 下拉总时间相同 ====> 下拉总时间： animateTime
 * 2. 每次时间间隔相同
 */

const DropDown = (
  { startHeight = 0, endHeight, animateTime = 500 },
  callback
) => {
  const _millisec = 10; // 每次 interval 间隔的时间
  const _counts = animateTime / _millisec; // setInterval 循环次数
  const _step = (endHeight - startHeight) / _counts; // 每一步增加的高度
  let _height = startHeight; // 当前高度，一开始设置为起始高度
  clearInterval(intervalHandler); // 每次重新调用时清除定时器
  const intervalHandler = setInterval(() => {
    // 定时器句柄
    if (_height >= endHeight) return clearInterval(intervalHandler);
    _height = _height + _step;
    callback && callback(_height);
  }, _millisec);
  return intervalHandler;
};

export default DropDown;
