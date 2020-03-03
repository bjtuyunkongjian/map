import React, { Component } from 'react';
import { GlobalEvent, GloEventName } from 'tuyun-utils';
import { FaTimes } from 'react-icons/fa';

import { GetPosituationDetail } from './webapi';
import { BaseInfo } from './contant';

export default class PupupPosituation extends Component {
  state = {
    boxTop: 0,
    boxLeft: 0,
    visible: false,
    lngLat: [],
    policeCode: '',
    baseInfo: []
  };

  componentWillMount = () => this._dealWithEvent();

  componentDidMount = () => this._init();

  componentWillUnmount = () => this._reset();

  render() {
    const { policeCode, boxTop, boxLeft, baseInfo, visible } = this.state;
    if (!policeCode || !visible) return null;

    return (
      <div
        className="detail-popup"
        style={{ top: boxTop + 10, left: boxLeft + 10 }}
      >
        <div className="detail-title">
          警情信息
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
    const { closePopupSituation, showPopupSituation } = GloEventName;
    GlobalEvent.on(showPopupSituation, this._showPopup);
    GlobalEvent.on(closePopupSituation, this._closePopup);
  };

  _init = () => {};

  _reset = () => {
    const { showPopupSituation, closePopupSituation } = GloEventName;
    GlobalEvent.removeListener(showPopupSituation, this._showPopup);
    GlobalEvent.removeListener(closePopupSituation, this._closePopup);
  };

  _showPopup = async param => {
    const { visible, boxLeft, boxTop, lngLat, code } = param;
    await this.setState({
      visible,
      boxLeft: boxLeft,
      boxTop: boxTop,
      lngLat: lngLat,
      policeCode: code,
      baseInfo: []
    });
    this._fetchPoliceDetail();
    _MAP_.on('move', this._addListener);
  };

  _closePopup = () => {
    this.setState({ visible: false });
    _MAP_.off('move', this._addListener);
  };

  // jjdbh=
  _fetchPoliceDetail = async () => {
    const { policeCode } = this.state;
    const _param = `jjdbh=${policeCode}`;
    const { res, err } = await GetPosituationDetail(_param);
    if (!res || err) return console.log('获取警情数据失败');
    const { bjlbmc, cjqk, fkyxm, jqlbdm, fkdwCityCodeZw, district } = res;

    this.setState({
      baseInfo: [
        { label: '警情名称', value: bjlbmc },
        { label: '类别代码', value: jqlbdm },
        { label: '出警情况', value: cjqk },
        { label: '出警人', value: fkyxm },
        { label: '出警地区', value: fkdwCityCodeZw },
        { label: '警情地区', value: district }
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
