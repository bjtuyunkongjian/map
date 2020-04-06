export const Layout = {
  'line-join': 'round',
  'line-cap': 'round'
};

// lw -> line width, lv -> level
const lvStart = 7; // 最小的层级
const lvStop = 22; // 最大的层级
const CreateLwStops = function(baseLw, lvAddLw) {
  const lwStops = []; // line-width stops 数组
  let _lvAddLwInd = 0; // 当前元素索引， lvAddLw 中后一个元素的第一位要比前一个元素的第一位来的大
  let _curLw = baseLw; // 当前的 line-width ，初值为 baseLw
  for (let curLv = lvStart; curLv < lvStop + 1; curLv++) {
    const [lvAdd, addLw] = lvAddLw[_lvAddLwInd];
    if (curLv === lvAdd) {
      _curLw += addLw; // 添加线宽
      lwStops.push([curLv, _curLw]); // 添加值
      _lvAddLwInd++; // lvAddLw 中下一个元素
    } else {
      lwStops.push([curLv, _curLw]);
    }
  }
  return lwStops;
};

const CreateLwBgStops = function(lwStops, lvAddLw) {
  const lwStops = []; // line-width stops 数组
  let _lvAddLwInd = 0; // 当前元素索引， lvAddLw 中后一个元素的第一位要比前一个元素的第一位来的大
  let _curAddLw = 0; //  line-width 增量的初始值，初值为 0
  for (let item of lwStops) {
    const [curLv, lw] = item; //解构，当前 level 和 线条的宽度
    const [lvAdd, addLw] = lvAddLw[_lvAddLwInd]; // 待增加宽度的 level ， 待增加的宽度
    if (curLv === lvAdd) {
      _curAddLw = addLw;
      lwStops.push([curLv, lw + _curAddLw]); // 添加值
      _lvAddLwInd++; // lvAddLw 中下一个元素
    } else {
      lwStops.push([curLv, lw + _curAddLw]); // 添加值
    }
  }
  return lwStops;
};
