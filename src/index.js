/**
 * @author sl 2019-01-02
 */

import React, { Component } from 'react';
import ReactDom from 'react-dom';

import '../style/index.less';
import MapDemo from './map';
import TopNav from './top-nav';
import Restore from './restore';
// import LeftMenu from './left-menu';

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
        <TopNav />
        <Restore />
        {/* <LeftMenu /> */}
      </div>
    );
  }
}

ReactDom.render(<MapApp />, document.getElementById('root'));
