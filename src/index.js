/**
 * @author sl 2019-01-02
 */

import React, { Component } from 'react';
import ReactDom from 'react-dom';

import '../style/index.less';
import Map from './map';

class MapApp extends Component {
  render () {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Map />
      </div>
    )
  }
}

ReactDom.render(
  <MapApp />,
  document.getElementById('root')
);