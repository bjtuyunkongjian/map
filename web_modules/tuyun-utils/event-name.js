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
  // 人口详情分类
  toggleDetailPopulation: 'toggle:detailPopulation', // 控制是否渲染 重点人口详情 弹框，是否加载对应数据
  toggleHideDetailPopulation: 'toggle:hideDetailPopulation', // 当右侧联动数据收进去后，不显示弹框，渲染以及加载数据由 toggleDetailPopulation 控制
  // 单位详情分类
  toggleDetailUnit: 'toggle:detailUnit',
  toggleHideDetailUnit: 'toggle:hideDetailUnit',
  // 一标三识数据对应的弹框
  showPopupPopulation: 'show:popupPopulation', // 人口
  closePopupPopulation: 'close:popupPopulation',
  showPopupUnit: 'show:unit', // 单位
  closePopupUnit: 'close:unit',
  showPopupBuilding: 'show:popupBuilding', // 房屋
  closePopupBuilding: 'close:popupBuilding',
  showPopupNameplate: 'show:popupNameplate', // 铭牌
  closePopupNameplate: 'close:popupNameplate',
  showPopupPopNameplate: 'show:popupPopNameplate', // 人口铭牌
  closePopupPopNameplate: 'close:popupPopNameplate',
  showPopupUnitNameplate: 'show:popupUnitNameplate', // 单位铭牌
  closePopupUnitNameplate: 'close:popupUnitNameplate',
  showPopupBuiNameplate: 'show:popupBuiNameplate', // 房屋铭牌
  closePopupBuiNameplate: 'close:popupbuiNameplate',
  // 案件对应事件
  changeCaseDate: 'change:caseDate',
  showPopupCase: 'show:popupCase', // 展示案件详情
  closePopupCase: 'close:popupCase', // 关闭案件详情
  toggleCaseDetail: 'toggle:caseDetail', // 切换案件详情弹框
  toggleHideCaseDetail: 'toggle:hideCaseDetail', // 切换是否隐藏案件详情
  changeSelectedCaseTendency: 'change:selectedCaseTendency', // 改变选中的案件趋势
  //全局 loading
  showGlobalLoading: 'show:globalLoading',
  closeGlobalLoading: 'close:globalLoading',
  // 改变地图模板
  changeMapTemplate: 'chang:map:template'
};
