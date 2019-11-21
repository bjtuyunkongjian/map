/**
 * 网吧弹窗
 */

import React, { Component } from 'react';
import { GlobalEvent, GloEventName } from 'tuyun-utils';
import { FaTimes } from 'react-icons/fa';

import { GetIcafeDetail } from './webapi';

export default class PopupIcafe extends Component {
  state = {
    boxTop: 0,
    boxLeft: 0,
    visible: false,
    lngLat: [],
    code: '',
    baseInfo: []
  };

  componentWillMount = () => this._dealWithEvent();

  componentDidMount = () => this._init();

  componentWillUnmount = () => this._reset();

  render() {
    const { code, boxTop, boxLeft, baseInfo, visible } = this.state;
    if (!code || !visible) return null;

    return (
      <div
        className="detail-popup"
        style={{ top: boxTop + 10, left: boxLeft + 10 }}
      >
        <div className="detail-title">
          网吧信息
          <FaTimes className="close" onClick={this._closePopup} />
        </div>

        {/* <div className="info-label">基本信息</div> */}
        <ul className="detail-box">
          {baseInfo.map((item, index) => (
            <li className="info-detail" key={`detail_${index}`}>
              <div className="detail-label">{item.label}：</div>
              <div className="detail-value">{item.value}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  _dealWithEvent = () => {
    const { closeIcafe, showIcafe } = GloEventName;
    GlobalEvent.on(showIcafe, this._showPopup);
    GlobalEvent.on(closeIcafe, this._closePopup);
  };

  _init = () => {};

  _reset = () => {
    const { showIcafe, closeIcafe } = GloEventName;
    GlobalEvent.removeListener(showIcafe, this._showPopup);
    GlobalEvent.removeListener(closeIcafe, this._closePopup);
  };

  _showPopup = async param => {
    const { visible, boxLeft, boxTop, lngLat, code } = param;
    await this.setState({
      visible,
      boxLeft: boxLeft,
      boxTop: boxTop,
      lngLat: lngLat,
      code: code,
      baseInfo: [],
      affiliationInfo: [],
      custodianInfo: [],
      homeownerInfo: []
    });
    this._fetchDetail();
    _MAP_.on('move', this._addListener);
  };

  _closePopup = () => {
    this.setState({ visible: false });
    _MAP_.off('move', this._addListener);
  };

  _fetchDetail = async () => {
    const { code } = this.state;
    const _param = `yycsdm=${code}`;
    const { res, err } = await GetIcafeDetail(_param);
    if (!res || err) return;

    const { YYCSMC, DZ, SSWJBMMC } = res;
    this.setState({
      baseInfo: [
        { label: '名称', value: YYCSMC },
        { label: '地址', value: DZ },
        { label: '所属公安局', value: SSWJBMMC }
      ]
    });
  };

  _addListener = () => {
    const { lngLat, visible } = this.state;
    if (!visible || !lngLat) return;
    const { x, y } = _MAP_.project(lngLat); // {lat, lng} => {x, y}
    this.setState({ boxLeft: x, boxTop: y });
  };
}
