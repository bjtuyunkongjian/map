import React, { Component } from 'react';
import Event from './event';
import { IoIosEye } from 'react-icons/io';
import MenuItem from './menu-item';
import { FetchCamera } from './webapi';
import { IsArray } from 'tuyun-utils';

export default class Camera extends Component {
  state = {
    curMenu: -1
  };

  componentDidMount = () => this._init();

  render() {
    return (
      <div className="menu-item camera">
        <div className="item-label" onClick={this._showCamera}>
          <IoIosEye />
          <span>摄像头</span>
          <span className="arrow arrow-right" />
        </div>
      </div>
    );
  }

  // 点击事件，切换菜单，层级变化
  _init = () => {
    _MAP_.on('click', 'POI_LEVEL_16_CAMERA', e => {
      const num = e.features[0].properties.Number;
      const url =
        'http://10.49.7.228:80/cas/remoteLogin?username=tuyun&password=8f0a06ebd27f187d9f98ffd78cbe56ed8b340f3f1948d1587a7511875c517c1c&service=http%3A%2F%2F10.49.7.228%2Fvas%2Fweb%2FpreviewCtrl.action%3FcameraIndexCodes%' +
        num +
        '%26wndNum%3D1%26previewType%3D1';
      fetch('http://localhost:8000/camera?url=' + url);
    });
  };

  _showCamera = () => {
    const { curMenu } = this.state;
    const _nextMenu =
      curMenu === MenuItem.cameraOption ? -1 : MenuItem.cameraOption; // 下一个状态
    _nextMenu !== -1 && Event.emit('change:curMenu', _nextMenu); // 发射事件
    if (_nextMenu === curMenu) return;
    this.setState({ curMenu: _nextMenu });
    if (!_MAP_ || !_MAP_.getLayer('POI_LEVEL_16_CAMERA')) return;
    const visibility = _nextMenu === MenuItem.cameraOption ? 'visible' : 'none';
    _MAP_.setLayoutProperty('POI_LEVEL_16_CAMERA', 'visibility', visibility);
  };
}
