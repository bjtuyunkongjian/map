/**
 * 底部导航
 */
import React, { Component } from 'react';
import ZoomInBtn from './zoom-in-btn';
import ZoomOutBtn from './zoom-out-btn';

export default class BottomNav extends Component {
  state = {};
  render() {
    return (
      <div className="bottom-nav">
        <ZoomInBtn />
        <ZoomOutBtn />
      </div>
    );
  }
}
