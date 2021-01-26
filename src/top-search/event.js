import { Emitter } from 'tuyun-utils';

const Event = new Emitter();

export default Event;
//搜索部分中所有的事件名称
const EventName = {
  changeSearchNav: 'change:curBar', //不同类型的搜索tab切换
  clickSearchBtn: 'click:serchBtn', // 点击搜索按钮
};

export { EventName };
