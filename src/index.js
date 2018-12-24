/**
 * @author sl 2019-01-02
 */

import React, { Component } from 'react';
import ReactDom from 'react-dom';

import '../style/index.less';
import MapDemo from './map';
import TopSearch from './top-search';
// import TopNav from './top-nav'; // 顶部导航，刚开始版本，由于业务需求顶部导航做了改动，后期改回来放开
import BottomNav from './bottom-nav';
// import Restore from './restore';
import LeftMenu from './left-menu';
import LinkageDisplay from './linkage-display'; // 联动显示

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
        {/* <TopNav /> */}
        {/* <Restore /> */}
        <LeftMenu />
        <LinkageDisplay />
        <BottomNav />
      </div>
    );
  }
}

ReactDom.render(<MapApp />, document.getElementById('root'));
