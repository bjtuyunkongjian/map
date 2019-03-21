import React, { Component } from 'react';
import { Event as GlobalEvent, EventName as GloEventName } from 'tuyun-utils';

import { FetchUnitDetail } from './webapi';
import {
  BaseInfo,
  DefendingPerInfo,
  BusinessInfo,
  LegalRepInfo,
  UnitCategory,
  BusinessStatus
} from './constant';

export default class PupupUnit extends Component {
  state = {
    boxTop: 0,
    boxLeft: 0,
    visible: false,
    lngLat: [],
    unitCode: '',
    baseInfo: BaseInfo,
    defendingPerInfo: DefendingPerInfo,
    businessInfo: BusinessInfo,
    legalRepInfo: LegalRepInfo
  };

  componentDidMount = () => this._init();

  componentWillUnmount = () => this._reset();

  render() {
    const {
      unitCode,
      boxTop,
      boxLeft,
      baseInfo,
      defendingPerInfo,
      businessInfo,
      legalRepInfo
    } = this.state;
    if (!unitCode) return null;

    return (
      <div
        className="detail-popup"
        style={{ top: boxTop + 10, left: boxLeft + 10 }}
      >
        <div className="detail-title">单位信息</div>

        <div className="info-label">基本信息</div>
        <ul className="detail-box">
          {baseInfo.map((item, index) => (
            <li className="info-detail" key={`detail_${index}`}>
              <div className="detail-label">{item.label}：</div>
              <div className="detail-value">{item.value}</div>
            </li>
          ))}
        </ul>

        <div className="info-label">经营信息</div>
        <ul className="detail-box">
          {businessInfo.map((item, index) => (
            <li className="info-detail" key={`detail_${index}`}>
              <div className="detail-label">{item.label}：</div>
              <div className="detail-value">{item.value}</div>
            </li>
          ))}
        </ul>

        <div className="info-label">法定代表人信息</div>
        <ul className="detail-box">
          {legalRepInfo.map((item, index) => (
            <li className="info-detail" key={`detail_${index}`}>
              <div className="detail-label">{item.label}：</div>
              <div className="detail-value">{item.value}</div>
            </li>
          ))}
        </ul>

        <div className="info-label">保卫负责人信息</div>
        <ul className="detail-box">
          {defendingPerInfo.map((item, index) => (
            <li className="info-detail" key={`detail_${index}`}>
              <div className="detail-label">{item.label}：</div>
              <div className="detail-value">{item.value}</div>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  _init = () => {
    const { showPopupUnit, closePopupUnit } = GloEventName;
    GlobalEvent.on(showPopupUnit, this._showPopup);
    GlobalEvent.on(closePopupUnit, this._closePopup);
  };

  _reset = () => {
    const { showPopupUnit, closePopupUnit } = GloEventName;
    GlobalEvent.removeListener(showPopupUnit, this._showPopup);
    GlobalEvent.removeListener(closePopupUnit, this._closePopup);
  };

  _showPopup = async param => {
    const { visible, boxLeft, boxTop, lngLat, code } = param;
    await this.setState({
      visible: visible,
      boxLeft: boxLeft,
      boxTop: boxTop,
      lngLat: lngLat,
      unitCode: code
    });
    this._fetchUnitDetail();
    _MAP_.on('move', this._addListener);
  };

  _closePopup = () => {
    this.setState({ visible: false });
    _MAP_.off('move', this._addListener);
  };

  _fetchUnitDetail = async () => {
    const { unitCode } = this.state;
    const { res, err } = await FetchUnitDetail({
      dwdzbm: unitCode
    });
    if (!res || err) return console.log('popup-building');
    res.sfjxcs = res.sfjxcs ? (res.sfjxcs === 'Y' ? '是' : '否') : '未知'; // 房屋性质
    res.jymj = res.jymj ? res.jymj + '平方米' : '未知'; // 房屋使用形式
    res.zczj = res.zczj ? res.zczj + '万元' : '未知'; // 房屋类别
    res.dwfl = UnitCategory[res.dwfl];
    res.sfyyyzz = res.sfyyyzz ? (res.sfyyyzz === 'Y' ? '是' : '否') : '未知';
    res.jyzt = BusinessStatus[res.jyzt];

    BaseInfo.map(item => {
      item.value = res[item.key] || '暂无';
    });
    DefendingPerInfo.map(item => {
      item.value = res[item.key] || '暂无';
    });
    BusinessInfo.map(item => {
      item.value = res[item.key] || '暂无';
    });
    LegalRepInfo.map(item => {
      item.value = res[item.key] || '暂无';
    });

    this.setState({
      baseInfo: BaseInfo,
      defendingPerInfo: DefendingPerInfo,
      businessInfo: BusinessInfo,
      legalRepInfo: LegalRepInfo
    });
  };

  _addListener = () => {
    const { lngLat, visible } = this.state;
    if (!visible || !lngLat) return;
    const { x, y } = _MAP_.project(lngLat); // {lat, lng} => {x, y}
    this.setState({ boxLeft: x, boxTop: y });
  };
}
