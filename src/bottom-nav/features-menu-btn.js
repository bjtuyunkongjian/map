import React, { Component } from 'react';
import { IoMdMenu } from 'react-icons/io';
import { Event } from 'tuyun-utils';

export default class FeaturesMenuBtn extends Component {
  render() {
    return (
      <div className="features-menu-btn" onClick={this._toggleFeaturesMenu}>
        <IoMdMenu size={15} />
      </div>
    );
  }

  _toggleFeaturesMenu = () => {
    Event.emit('change:FeaturesMenu:visible');
  };
}
