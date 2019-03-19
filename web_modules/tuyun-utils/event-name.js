export default {
  // 搜索结果
  changeLeMenuSearchInfo: 'change:LeftMenu:searchInfo', // 修改搜索信息
  // 右下角的功能菜单详情
  toggleFeMenu: 'toggle:featuresMenu:visible', // 切换显示 features menu
  // 联动显示面板
  toggleLinkage: 'toggle:linkage', // 是否显示联动显示面板是否显示
  toggleLinkageTab: 'toggle:linkage:tab', // 切换联动显示面板选中选项
  // 左侧菜单
  toggleLeftMenuPoData: 'toggle:leftMenu:poData', // 切换左侧菜单
  // 重点人口详情分类
  toggleKeyPopDetail: 'toggle:keyPopDetail', // 控制是否渲染 重点人口详情 弹框，是否加载对应数据
  hideKeyPopDetail: 'hide:keyPopDetail' // 当右侧联动数据收进去后，不显示弹框，渲染以及加载数据由 toggleKeyPopDetail 控制
};
