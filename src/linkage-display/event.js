import { Emitter } from 'tuyun-utils';

export default new Emitter(); // Event

const DefaultTab = 'population';
// 事件名称
const EventName = {
  changeNav: 'change:curBar'
};

export { DefaultTab, EventName };
