import { Emitter } from 'tuyun-utils';

export default new Emitter(); // Event

// tab 页
const DefaultTab = 'population';
// 事件名称
const EventName = {
  changeNav: 'change:curBar'
};

export { DefaultTab, EventName };
