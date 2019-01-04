import React, { Component } from 'react';
import Event from '../menu-list/event';
export default class HouseMessage extends Component {
  state = {
    visible: false,
    boxLeft: 0,
    boxTop: 0
  };

  componentDidMount() {
    this._init();
  }
  render() {
    const { visible, boxLeft, boxTop } = this.state;
    if (!visible) return null;
    return (
      <div style={{ top: boxTop, left: boxLeft }} className="dialog-title">
        房屋信息
      </div>
    );
  }

  _init = () => {
    Event.on('showMessage', param => {
      console.log(param);
      const { left = 0, top = 0 } = param;
      this.setState({
        boxLeft: left,
        boxTop: top,
        visible: true
      });
    });
  };
}
