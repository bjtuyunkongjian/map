import React, { Component } from 'react';
import { IoMdMenu } from 'react-icons/io';
import { Event } from 'tuyun-utils';

export default class FeaturesMenuBtn extends Component {
  state = {
    visible: false
  };

  componentDidMount() {
    Event.on('change:FeaturesMenu:visible', visible => {
      this.setState({ visible });
    });
  }

  shouldComponentUpdate = () => false;

  render() {
    return (
      <div className="features-menu-btn" onClick={this._toggleFeaturesMenu}>
        <IoMdMenu size={15} />
      </div>
    );
  }

  _toggleFeaturesMenu = () => {
    const { visible } = this.state;
    Event.emit('change:FeaturesMenu:visible', !visible);
  };
}
