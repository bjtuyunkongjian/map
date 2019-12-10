import { Emitter } from 'tuyun-utils';

const Event = new Emitter();

export default Event;
//搜索部分中所有的事件名称
const EventName = {
  changeSearchNav: 'change:curBar', //不同类型的搜索tab切换
  changeDropDown: 'change:dropDown', //切换箭头
  changeCityName: 'change:cityName', //切换城市
  changeInputVal: 'change:inputVal', //修改输入内容
  changeSearchType: 'change:searchType', // 修改搜索类型
  clickSearchBtn: 'click:serchBtn', // 点击搜索按钮
  createFinalGeo: 'create:finalGeo', // 绘制结束
  showResultList: 'show:resultList', // 显示搜索结果列表
  closeResultList: 'close:resultList' // 关闭搜索结果列表
};

export { EventName };
