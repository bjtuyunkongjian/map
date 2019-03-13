import { Emitter } from 'tuyun-utils';

const Event = new Emitter();

export default Event;

// 事件名称
const EventName = {
  showContentModal: 'show:contentModal',
  closeContentModal: 'close:contentModal',
  // 一标三识
  showPoDataPop: 'show:poData:pop',
  showPoDataUnit: 'show:poData:unit',
  showPoDataHouse: 'show:poData:house'
};

export { EventName };
