/**
 * 底部导航
 */
import React, { Component } from 'react';
import FeaturesMenuBtn from './features-menu-btn';
import ZoomInBtn from './zoom-in-btn';
import ZoomOutBtn from './zoom-out-btn';
import CompassBtn from './compass-btn';
import ResetPitchBtn from './reset-pitch-btn';

export default class BottomNav extends Component {
  state = {};
  render() {
    return (
      <div className="bottom-nav">
        <FeaturesMenuBtn />
        <ZoomInBtn />
        <ZoomOutBtn />
        <CompassBtn />
        <ResetPitchBtn />
      </div>
    );
  }
}
