import React, { Component } from 'react';

export default class PopupDemo extends Component {
  state = {
    visible: false,
    top: 0,
    left: 0,
  };

  componentDidMount = () => this._init();

  render() {
    const { visible } = this.state;
    if (!visible) return null;
    return (
      <div className="detail-popup" style={{ top: top + 10, left: left + 10 }}>
        <div className="detail-title">弹框名称</div>
        <div onClick={this._closePopup}></div>
        <ul className="detail-box">
          弹框内容
          <li className="detail-label">
            <div>弹框显示的类目</div>
            <div>弹框显示类目的值</div>
          </li>
        </ul>
      </div>
    );
  }

  _init = () => {
    tyMap.onClick(this._clickPopup);

    tyMap.onMove(this._movePoint);
  };

  _clickPopup = (e) => {
    const { lngLat } = e;
    const { x, y } = tyMap.project(lngLat);
    this.setState({ left: x, top: y, visible: true });
  };

  _closePopup = () => {
    this.setState({ visible: false });
  };

  _movePoint = (e) => {
    const { visible } = this.state;
    if (!visible) return;
    const { x, y } = e.features;
    const { x: left, y: top } = tyMap.project({ lng: x, lat: y });
    this.setState({ left, top });
  };
}
