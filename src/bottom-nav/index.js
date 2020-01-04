/**
 * 底部导航
 */
import React, { Component } from 'react';
import { GlobalEvent, GloEventName } from 'tuyun-utils';

import FeaturesMenuBtn from './features-menu-btn';
import ZoomInBtn from './zoom-in-btn';
import ZoomOutBtn from './zoom-out-btn';
import CompassBtn from './compass-btn';
import ResetPitchBtn from './reset-pitch-btn';

export default class BottomNav extends Component {
  state = { showUi: true };

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { showUi } = this.state;
    return (
      <div className={showUi ? 'bottom-nav' : 'hidden'}>
        <FeaturesMenuBtn />
        <ZoomInBtn />
        <ZoomOutBtn />
        <CompassBtn />
        <ResetPitchBtn />
      </div>
    );
  }

  _dealWithEvent = () => {
    const { toggleAllUi } = GloEventName;
    GlobalEvent.on(toggleAllUi, ({ visible }) => {
      this.setState({ showUi: visible });
    });
  };
}
