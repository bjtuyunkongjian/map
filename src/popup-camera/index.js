import React, { Component } from 'react';
import { GlobalEvent, GloEventName, FetchRequest, IsEmpty } from 'tuyun-utils';
import { FaTimes } from 'react-icons/fa';
import { TuyunMessage } from 'tuyun-kit';
export default class CameraDetail extends Component {
  state = {
    visible: false,
    boxTop: 0,
    boxLeft: 0,
    lngLat: [],
    cameraCode: '',
    cameraName: '',
    cameraUrl: ''
  };

  componentWillMount = () => this._dealWithEvent();

  componentDidMount = () => this._init();

  componentWillUnmount = () => this._reset();

  render() {
    const { boxTop, boxLeft, cameraName, visible } = this.state;
    if (!visible) return null;
    return (
      <div
        className="detail-popup"
        style={{ left: boxLeft + 10, top: boxTop + 10 }}
      >
        <div className="detail-title">
          摄像头信息
          <FaTimes className="close" onClick={this._closeCamera} />
        </div>
        <ul className="detail-box">
          <li className="info-detail">
            <div className="detail-label">监控地点：</div>
            <div className="detail-value">{cameraName}</div>
          </li>
          <li className="button-box">
            <div className="button" onClick={this._openVideo}>
              查看
            </div>
          </li>
        </ul>
      </div>
    );
  }

  _dealWithEvent = () => {
    GlobalEvent.on(GloEventName.showCamera, this._showCamera);
  };

  _init = () => {};

  _reset = () => {
    const { showCamera, closeCamera } = GloEventName;
    GlobalEvent.removeListener(showCamera, this._showCamera);
    GlobalEvent.removeListener(closeCamera, this._closeCamera);
  };

  _showCamera = async param => {
    const { visible, boxLeft, boxTop, lngLat, code, name, cameraurl } = param;
    await this.setState({
      visible,
      boxLeft: boxLeft,
      boxTop: boxTop,
      lngLat: lngLat,
      cameraCode: code,
      cameraName: name,
      cameraUrl: cameraurl
    });
    // this._fetchCameraData();
    _MAP_.on('move', this._addListener);
  };

  _closeCamera = () => {
    this.setState({ visible: false });
    _MAP_.off('move', this._addListener);
  };

  _addListener = () => {
    const { lngLat, visible } = this.state;
    if (!visible || !lngLat) return;
    const { longitude, latitude } = _MAP_.project(lngLat); // {lat, lng} => {x, y}
    this.setState({ boxLeft: longitude, boxTop: latitude });
  };

  _openVideo = () => {
    const { cameraUrl } = this.state;
    if (IsEmpty(cameraUrl)) return TuyunMessage.info('无对应监控视频');
    FetchRequest({
      host: 'http://localhost:8000/',
      url: `camera`,
      method: 'POST',
      body: { url: cameraUrl }
    });
  };
}
