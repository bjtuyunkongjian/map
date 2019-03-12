import { Emitter } from 'tuyun-utils';

const Event = new Emitter();

export default Event;

// 事件名称
const EventName = {
  showContentModal: 'show:contentModal',
  closeContentModal: 'close:contentModal'
};

export { EventName };
