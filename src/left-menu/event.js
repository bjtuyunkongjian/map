import { Emitter } from 'tuyun-utils';

const Event = new Emitter();

export default Event;

// 事件名称
const EventName = {
  showContentModal: 'show:contentModal',
  closeContentModal: 'close:contentModal',
  // 一标三实
  changePoDataChecked: 'change:poData:selected',
  showPoDataPop: 'show:poData:pop',
  closePoDataPop: 'close:poData:pop',
  showPoDataUnit: 'show:poData:unit',
  closePoDataUnit: 'close:poData:unit',
  showPoDataHouse: 'show:poData:house',
  closePoDataHouse: 'close:poData:house'
};

export { EventName };
