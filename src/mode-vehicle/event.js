import { Emitter } from 'tuyun-utils';

export default new Emitter(); // Event

export const EventName = {
  changeMode: 'change:mode',
  toggleOptions: 'toggle:options'
};
