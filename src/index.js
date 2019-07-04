/**
 * @author sl 2019-01-02
 */

import React, { Component } from 'react';
import ReactDom from 'react-dom';

import '../style/index.less';
import MapDemo from './map';
import TopSearch from './top-search';
// import TopNav from './top-nav';
// 顶部导航，刚开始版本，由于业务需求顶部导航做了改动，后期改回来放开
import BottomNav from './bottom-nav';
import FeaturesMenu from './features-menu';
// import Restore from './restore';
import LeftMenu from './left-menu';
import LinkageDisplay from './linkage-display'; // 联动显示
// import ElementLibrary from './element-library'; // 图标库
import DetailPop from './detail-population'; // 重点人口详情
import PopupPopulation from './popup-population'; // 人口弹框
import PopupPopNameplate from './popup-pop-nameplate'; // 人口铭牌弹框
import PopupUnit from './popup-unit'; // 单位弹框
import PopupUniNameplate from './popup-uni-nameplate'; // 单位铭牌弹窗
import PopupBuilding from './popup-building'; // 建筑物弹框
import PopupBuiNameplate from './popup-bui-nameplate'; // 建筑物铭牌弹窗
import ProgressCase from './progress-case'; // 案件进度条
import GlobalLoading from './global-loading'; // 全局搜索
import CaseDetail from './case-detail'; // 案件详情
import PopupCase from './popup-case'; // 案件详情弹框
import DetailUnit from './detail-unit'; // 重点单位
import ProgressVehicle from './progress-vehicle'; // 两客一危车辆

class MapApp extends Component {
  render() {
    const _userAgent = navigator.userAgent;
    const _browserSupport =
      _userAgent.indexOf('Firefox') > -1 || _userAgent.indexOf('Chrome') > -1;

    if (!_browserSupport) {
      return <div className="map-app">浏览器不支持</div>;
    }
    return (
      <div className="map-app">
        <MapDemo />
        <TopSearch />
        {/*<TopNav />*/}
        {/* <Restore /> */}
        <LeftMenu />
        <LinkageDisplay />
        <DetailPop />
        {/* <ElementLibrary /> */}
        <BottomNav />
        <FeaturesMenu />
        <PopupPopulation />
        <PopupPopNameplate />
        <PopupUnit />
        <PopupUniNameplate />
        <PopupBuilding />
        <PopupBuiNameplate />
        <ProgressCase />
        <GlobalLoading />
        <CaseDetail />
        <PopupCase />
        <DetailUnit />
        <ProgressVehicle />
      </div>
    );
  }
}

ReactDom.render(<MapApp />, document.getElementById('root'));
