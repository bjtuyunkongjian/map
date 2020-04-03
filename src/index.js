/**
 * @author sl 2019-01-02
 */

import React, { Component } from 'react';
import ReactDom from 'react-dom';

import '../style/index.less';
import MapDemo from './map';
// import TopNav from './top-nav';
// 顶部导航，刚开始版本，由于业务需求顶部导航做了改动，后期改回来放开
import BottomNav from './bottom-nav';
import FeaturesMenu from './features-menu';
import TabView from './tab-view'; // 右侧联动显示

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
        <TabView />
        <BottomNav />
        <FeaturesMenu />
      </div>
    );
  }
}

ReactDom.render(<MapApp />, document.getElementById('root'));
