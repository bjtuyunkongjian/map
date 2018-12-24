import React, { Component } from 'react';
import { IoMdMenu } from 'react-icons/io';

export default class FeaturesMenuBtn extends Component {
  state = {};
  render() {
    return (
      <div className="features-menu-btn">
        <IoMdMenu size={15} />
      </div>
    );
  }
}
