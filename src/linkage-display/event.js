import { Emitter } from 'tuyun-utils';

export default new Emitter(); // Event

// 事件名称
const EventName = {
  changeNav: 'change:curBar',
  changePopSelected: 'change:popSelected', // 修改人口面板选中的图表
  changeUniSelected: 'change:uniSelected', // 修改单位面板选中的图表
  changeBuiSelected: 'change:buiSelected', // 修改建筑物面板选中的图表
  updatePopChart: 'update:popChart', // 更新人口面板中图表数据
  updateUniChart: 'update:uniChart', // 更新单位面板中图表数据
  updateBuiChart: 'update:buiChart' // 更新建筑物面板图表数据
};

export { EventName };
