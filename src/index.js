/**
 * @author sl 2019-01-02
 */

import React, { Component } from 'react';
import ReactDom from 'react-dom';
// import $ from 'jquery';

import '../style/index.less';
import Map from './map';
import TopNav from './top-nav';

class MapApp extends Component {
  render() {
    return (
      <div className="map-app">
        <Map />
        <TopNav />
      </div>
    );
  }
}

ReactDom.render(<MapApp />, document.getElementById('root'));
