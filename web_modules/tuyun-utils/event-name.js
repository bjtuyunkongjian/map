export default {
  // 搜索结果
  changeLeMenuSearchInfo: 'change:LeftMenu:searchInfo', // 修改搜索信息
  showSearchResult: 'show:resultView', //显示搜索结果
  // 右下角的功能菜单详情
  toggleFeaturesMenu: 'toggle:featuresMenu:visible', // 切换显示 features menu
  // 联动显示面板
  toggleTabView: 'toggle:tabView', // 联动显示面板是否显示
  closeTabView: 'close:tabView', //点击比对碰撞，右侧联动面板消失
  // 人口详情分类
  toggleDetailPopulation: 'toggle:detailPopulation', // 控制是否渲染 重点人口详情 弹框，是否加载对应数据
  toggleHideDetailPopulation: 'toggle:hideDetailPopulation', // 当右侧联动数据收进去后，不显示弹框，渲染以及加载数据由 toggleDetailPopulation 控制
  // 单位详情分类
  toggleDetailUnit: 'toggle:detailUnit',
  // 一标三识数据对应的弹框
  showPopupPopulation: 'show:popupPopulation', // 人口
  closePopupPopulation: 'close:popupPopulation',
  showPopupUnit: 'show:popupUnit', // 单位
  closePopupUnit: 'close:popupUnit',
  showPopupBuilding: 'show:popupBuilding', // 房屋
  closePopupBuilding: 'close:popupBuilding',
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
  // 警情对应事件
  changeSituationDate: 'change:situationDate', // 切换警情时间
  showPopupSituation: 'show:popupSituation', // 显示警情详情
  closePopupSituation: 'close:popupSituation', // 关闭警情详情
  toggleSituatuinDetail: 'toggle:policeDetail', // 切换警情详情弹框
  toggleHidePoliceDetail: 'toggle:hidePoliceDetail', // 切换是否隐藏警情详情
  changeSelectedSituationTendency: 'change:selectedSituationTendency', // 改变选中的警情趋势
  //全局 loading
  showGlobalLoading: 'show:globalLoading',
  closeGlobalLoading: 'close:globalLoading',
  // 改变地图模板
  changeMapTemplate: 'chang:mapTemplate',
  // 左侧菜单 LM ===> left menu
  changeLMVehicleType: 'change:leftMenu:vehicleType', // 两客一危
  // 两客一危进度条
  changeProgressVehicle: 'change:progressVehicle',
  // 两客一危模式选择
  changeModeVehicle: 'toggle:modeVehicle',
  // 比对碰撞 --->右侧碰撞结果界面
  showCompareTab: 'show:compareTab',
  closeCompareTab: 'clase:compareTab',
  // 数据叠加/交叉研判
  showCrossTab: 'show:crossTab',
  closeCrossTab: 'close:crossTab',
  // 布控显示对应事件
  showPopupBayonet: 'show:popupBayonet', //卡口
  closePopupBayonet: 'close:popupBayonet',
  showControlPop: 'show:controlPop', //显示布控的重点人员
  showHotel: 'show:popupHotel', //宾馆弹窗
  closeHotel: 'close:popupHotel',

  showIcafe: 'show:popupIcafe', //网吧弹窗
  closeIcafe: 'close:popupIcafe',
  // 辖区数据
  showJurisdictionData: 'show:juridisctionData',
  closeJurisdictionData: 'close:juridisctionData',
  // 更改所有的 UI
  toggleAllUi: 'toggle:allUi',
  //显示摄像头信息
  showCamera: 'show:camera',
  closeCamera: 'close:camera',
  //显示警员和警车
  showPoliceForce: 'show:policeForce',
  closePoliceForce: 'close:policeForce'
};
