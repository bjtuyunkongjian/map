import React, { Component } from 'react';
import { GlobalEvent, GloEventName } from 'tuyun-utils';
import { FaTimes } from 'react-icons/fa';

import { GetCaseDetail } from './webapi';
import { BaseInfo } from './constant';

export default class PupupCase extends Component {
  state = {
    boxTop: 0,
    boxLeft: 0,
    visible: false,
    lngLat: [],
    caseCode: '',
    baseInfo: []
  };

  componentWillMount = () => this._dealWithEvent();

  componentDidMount = () => this._init();

  componentWillUnmount = () => this._reset();

  render() {
    const { caseCode, boxTop, boxLeft, baseInfo, visible } = this.state;
    if (!caseCode || !visible) return null;

    return (
      <div
        className="detail-popup"
        style={{ top: boxTop + 10, left: boxLeft + 10 }}
      >
        <div className="detail-title">
          案件信息
          <FaTimes className="close" onClick={this._closePopup} />
        </div>

        <div className="info-label">基本信息</div>
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
    const { closePopupCase, showPopupCase } = GloEventName;
    GlobalEvent.on(showPopupCase, this._showPopup);
    GlobalEvent.on(closePopupCase, this._closePopup);
  };

  _init = () => {};

  _reset = () => {
    const { showPopupCase, closePopupCase } = GloEventName;
    GlobalEvent.removeListener(showPopupCase, this._showPopup);
    GlobalEvent.removeListener(closePopupCase, this._closePopup);
  };

  _showPopup = async param => {
    const { visible, boxLeft, boxTop, lngLat, code } = param;
    await this.setState({
      visible,
      boxLeft: boxLeft,
      boxTop: boxTop,
      lngLat: lngLat,
      caseCode: code,
      baseInfo: [],
      affiliationInfo: [],
      custodianInfo: [],
      homeownerInfo: []
    });
    this._fetchBuildingDetail();
    _MAP_.on('move', this._addListener);
  };

  _closePopup = () => {
    this.setState({ visible: false });
    _MAP_.off('move', this._addListener);
  };
  // ajbh=
  _fetchBuildingDetail = async () => {
    const { caseCode } = this.state;
    const _param = `ajbh=${caseCode}`;
    const { res, err } = await GetCaseDetail(_param);
    if (!res || err) return;
    BaseInfo.map(item => {
      item.value = res[item.key] || '暂无';
    });
    this.setState({
      baseInfo: BaseInfo
    });
  };

  _addListener = () => {
    const { lngLat, visible } = this.state;
    if (!visible || !lngLat) return;
    const { x, y } = _MAP_.project(lngLat); // {lat, lng} => {x, y}
    this.setState({ boxLeft: x, boxTop: y });
  };
}
