/**
 * 指南针
 * 控制旋转
 */
import React, { Component } from 'react';

export default class CompassBtn extends Component {
  state = {};

  _isRotate = false;

  componentDidMount() {
    this._setRotate();
  }

  render() {
    const { angel } = this.state;
    return (
      <div className="compass-btn" onClick={this._changeMap}>
        <div
          className="compass-icon"
          style={{ transform: 'rotate(-' + angel + 'deg)' }}
          ref={el => (this._compassBtn = el)}
        />
      </div>
    );
  }

  _setRotate = () => {
    const _angel = _MAP_.getBearing();
    this.setState({ angel: _angel });
    window.addEventListener('hashchange', () => {
      const _angel = _MAP_.getBearing();
      this.setState({ angel: _angel });
    });
    document.addEventListener('mousedown', () => {
      this._isRotate = true;
    });
    document.addEventListener('mousemove', () => {
      if (!this._isRotate) return;
      const _angel = _MAP_.getBearing();
      this.setState({ angel: _angel });
    });
    document.addEventListener('mouseup', () => {
      this._isRotate = false;
    });
  };

  _changeMap = () => {
    _MAP_ && _MAP_.rotateTo(0);
    this.setState({ angel: 0 });
  };
}
