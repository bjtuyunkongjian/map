import React, { Component } from 'react';

export default class Dialog extends Component {
  static defaultProps = {
    visible: false,
    title: ''
  };
  render() {
    const { visible, title } = this.props;
    if (!visible) return null;
    return (
      <div className="police-force-dialog">
        <div className="title">{title}</div>
      </div>
    );
  }
}
