import { Emitter } from 'tuyun-utils';

const Event = new Emitter();

export default Event;

// 事件名称
const EventName = {
  toggleVisible: 'toggle:visible',
  changeDateRange: 'change:dateRange',
  changeData: 'change:data',
  createFinalGeo: 'create:finalGeo'
};

export { EventName };
