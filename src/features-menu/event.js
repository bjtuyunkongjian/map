import { Emitter } from 'tuyun-utils';

const Event = new Emitter();

export default Event;

const EventName = {
  changeCurMenu: 'change:curMenu'
};

export { EventName };
