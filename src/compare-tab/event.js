import { Emitter } from 'tuyun-utils';

const Event = new Emitter();

export default Event;

// 事件名称
const EventName = {
  toggleVisible: 'toggle:visible',
  changeAreaRange: 'change:areaRange',
  changeDateRange: 'change:dateRange',
  changeData: 'change:data',
  createFinalGeo: 'create:finalGeo',
  drawPrevGeo: 'draw:prevGeo', // 绘制原先的图层
  changeSelectedBar: 'change:selectedBar'
};

export { EventName };
