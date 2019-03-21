import React, { Component } from 'react';
import { Event as GlobalEvent, EventName as GloEventName } from 'tuyun-utils';

import { FetchUnitDetail } from './webapi';
import {
  HousingCategory,
  HousingUseForm,
  HousingNature,
  HousingUsage,
  BaseInfo,
  AffiliationInfo,
  CustodianInfo,
  HomeownerInfo
} from './constant';

export default class PupupUnit extends Component {
  state = {
    boxTop: 0,
    boxLeft: 0,
    visible: false,
    lngLat: [],
    unitCode: '',
    baseInfo: BaseInfo,
    affiliationInfo: AffiliationInfo,
    custodianInfo: CustodianInfo,
    homeownerInfo: HomeownerInfo
  };

  componentDidMount = () => this._init();

  componentWillUnmount = () => this._reset();

  render() {
    const {
      unitCode,
      boxTop,
      boxLeft,
      baseInfo,
      affiliationInfo,
      custodianInfo,
      homeownerInfo
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

        <div className="info-label">房主信息</div>
        <ul className="detail-box">
          {homeownerInfo.map((item, index) => (
            <li className="info-detail" key={`detail_${index}`}>
              <div className="detail-label">{item.label}：</div>
              <div className="detail-value">{item.value}</div>
            </li>
          ))}
        </ul>

        <div className="info-label">托管人信息</div>
        <ul className="detail-box">
          {custodianInfo.map((item, index) => (
            <li className="info-detail" key={`detail_${index}`}>
              <div className="detail-label">{item.label}：</div>
              <div className="detail-value">{item.value}</div>
            </li>
          ))}
        </ul>

        <div className="info-label">隶属信息</div>
        <ul className="detail-box">
          {affiliationInfo.map((item, index) => (
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
      jzwbm: unitCode
    });
    if (!res || err) return console.log('获取房屋信息失败');
    res.fwxz = HousingNature[res.fwxz]; // 房屋性质
    res.syxs = HousingUseForm[res.syxs]; // 房屋使用形式
    res.fwlb = HousingCategory[res.fwlb]; // 房屋类别
    res.fwyt = HousingUsage[res.fwyt]; // 房屋用途

    BaseInfo.map(item => {
      item.value = res[item.key] || '暂无';
    });
    AffiliationInfo.map(item => {
      item.value = res[item.key] || '暂无';
    });
    CustodianInfo.map(item => {
      item.value = res[item.key] || '暂无';
    });
    HomeownerInfo.map(item => {
      item.value = res[item.key] || '暂无';
    });
    this.setState({
      buildingName: jzwdzmc || '暂无',
      buildingInfo: '' || '暂无',
      buildinglocation: jzwdzmc || '暂无',
      totalRkNum,
      roomInfoList
    });
  };

  _addListener = () => {
    const { lngLat, visible } = this.state;
    if (!visible || !lngLat) return;
    const { x, y } = _MAP_.project(lngLat); // {lat, lng} => {x, y}
    this.setState({ boxLeft: x, boxTop: y });
  };
}
