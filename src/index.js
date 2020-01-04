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
import LeftMenu from './left-menu';
import TabView from './tab-view'; // 右侧联动显示
import CompareTab from './compare-tab'; //对比碰撞右侧菜单显示
import JurisdictionTab from './jurisdiction-tab'; // 右侧辖区数据显示
import CrossTab from './cross-tab'; // 交叉研判
import DetailPopulation from './detail-population'; // 重点人口详情
import PupupPopulation from './popup-population'; // 人口弹框
import PopupPopNameplate from './popup-pop-nameplate'; // 人口铭牌弹框
import PupupPosituation from './popup-posituation'; //警情弹框
import PopupUnit from './popup-unit'; // 单位弹框
import PopupUniNameplate from './popup-uni-nameplate'; // 单位铭牌弹窗
import PopupBuilding from './popup-building'; // 建筑物弹框
import PopupBuiNameplate from './popup-bui-nameplate'; // 建筑物铭牌弹窗
import ProgressCase from './progress-case'; // 案件进度条
import GlobalLoading from './global-loading'; // 全局搜索
import DetailCase from './detail-case'; // 案件详情
import DetailPosituation from './detail-posituation'; //警情详情
import SerachResult from './popup-search'; //搜索结果弹框
import PopupCase from './popup-case'; // 案件详情弹框
import PopupCamera from './popup-camera'; //摄像头详情
import DetailUnit from './detail-unit'; // 重点单位
import ModeVehicle from './mode-vehicle'; // 两客一危车辆，模式选择
import ProgressVehicle from './progress-vehicle'; // 两客一危车辆，24小时回放进度条
import ProgressPosituation from './progress-posituation'; // 警情，24小时回放进度条
import PopupBayonet from './popup-bayonet'; // 卡口弹窗
import PopupIcafe from './popup-icafe'; //网吧弹窗
import PopupHotel from './popup-hotel'; //宾馆弹窗
import PopupControl from './popup-control'; //布控重点人员弹框
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
        {/* 地图 */}
        <MapDemo />
        <TopSearch />
        <LeftMenu />
        <TabView />
        <BottomNav />
        <FeaturesMenu />
        <CompareTab />
        <JurisdictionTab />
        <CrossTab />
        {/* 弹窗 */}
        <PupupPopulation />
        <PopupPopNameplate />
        <PopupCase />
        <PopupUnit />
        <PopupUniNameplate />
        <PopupBuilding />
        <PopupBuiNameplate />
        <PopupBayonet />
        <PopupIcafe />
        <PopupHotel />
        <PupupPosituation />
        <PopupCamera />
        <SerachResult />
        <PopupControl />
        {/* detail 详情 */}
        <DetailPopulation />
        <DetailUnit />
        <DetailCase />
        <DetailPosituation />
        {/* 进度条 */}
        <ProgressCase />
        <ProgressVehicle />
        <ProgressPosituation />
        {/* 两客一危模式切换 */}
        <ModeVehicle />
        {/* 加载 */}
        <GlobalLoading />
      </div>
    );
  }
}

ReactDom.render(<MapApp />, document.getElementById('root'));
