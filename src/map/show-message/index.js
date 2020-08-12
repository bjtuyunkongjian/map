import React, { Component } from 'react';
import { GlobalEvent, GloEventName } from 'tuyun-utils';
import { FaTimes } from 'react-icons/fa';
import {
  BaseInfo,
  DefendingPerInfo,
  BusinessInfo,
  LegalRepInfo,
} from './contant';
export default class ShowMessage extends Component {
  state = {
    visible: true,
    boxTop: 50,
    boxLeft: 60,
    baseInfo: [],
    defendingPerInfo: [],
    businessInfo: [],
    legalRepInfo: [],
  };

  render() {
    const {
      boxTop,
      boxLeft,
      baseInfo,
      defendingPerInfo,
      businessInfo,
      legalRepInfo,
      visible,
    } = this.state;
    return (
      <div
        className="detail-popup"
        style={{ top: boxTop + 10, left: boxLeft + 10 }}
      >
        <div className="detail-title">
          单位信息
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
}
