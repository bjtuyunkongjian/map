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
    _MAP_.on('click', 'cameraLayer', e => {
      console.log('添加视频');
      console.log(e.features[0].properties);
    });
  };

  _showCamera = () => {
    const { curMenu } = this.state;
    const _nextMenu =
      curMenu === MenuItem.cameraOption ? -1 : MenuItem.cameraOption; // 下一个状态
    _nextMenu !== -1 && Event.emit('change:curMenu', _nextMenu); // 发射事件
    if (_nextMenu === curMenu) return;
    this.setState({ curMenu: _nextMenu });
    var visibility = _MAP_.getLayoutProperty(
      'POI_LEVEL_16_CAMERA',
      'visibility'
    );
    if (visibility === 'visible') {
      _MAP_.setLayoutProperty('POI_LEVEL_16_CAMERA', 'visibility', 'none');
    } else {
      _MAP_.setLayoutProperty('POI_LEVEL_16_CAMERA', 'visibility', 'visible');
    }
  };
}
