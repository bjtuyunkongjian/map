import { Emitter } from 'tuyun-utils';

const Event = new Emitter();

// stopPropagation
// document.addEventListener('mouseup', e => {
//   e.preventDefault();
//   // console.log('aaaa');
//   Event.emit('change:curMenu', -1);
// });

export default Event;
