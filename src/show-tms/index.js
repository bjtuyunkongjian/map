import React, { Component } from 'react';

export default class index extends Component {
  state = { visible: true };

  render() {
    const { visible } = this.state;
    return (
      <div className="show-tms" onClick={this._toggleVisible}>
        {!visible ? '显示 tms 图层' : '隐藏 tms 图层'}
      </div>
    );
  }

  _toggleVisible = () => {
    const { visible } = this.state;
    if (visible) {
      // "visible", "none"
      _MAP_.setLayoutProperty('guodao_bg', 'visibility', 'none');
      _MAP_.setLayoutProperty('guodao', 'visibility', 'none');
    } else {
      _MAP_.setLayoutProperty('guodao_bg', 'visibility', 'visible');
      _MAP_.setLayoutProperty('guodao', 'visibility', 'visible');
    }
    this.setState({ visible: !visible });
  };
}
