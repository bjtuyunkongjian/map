import React, { Component } from 'react';
import { GlobalEvent, GloEventName } from 'tuyun-utils';
import { FaTimes } from 'react-icons/fa';

import { FetchBuildingDetail } from './webapi';
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

export default class PupupBuilding extends Component {
  state = {
    boxTop: 0,
    boxLeft: 0,
    visible: false,
    lngLat: [],
    buildingCode: '',
    baseInfo: [],
    affiliationInfo: [],
    custodianInfo: [],
    homeownerInfo: []
  };

  componentDidMount = () => this._init();

  componentWillUnmount = () => this._reset();

  render() {
    const {
      buildingCode,
      boxTop,
      boxLeft,
      baseInfo,
      affiliationInfo,
      custodianInfo,
      homeownerInfo,
      visible
    } = this.state;
    if (!buildingCode || !visible) return null;

    return (
      <div
        className="detail-popup"
        style={{ top: boxTop + 10, left: boxLeft + 10 }}
      >
        <div className="detail-title">
          房屋信息
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
    const { closePopupBuilding, showPopupBuilding } = GloEventName;
    GlobalEvent.on(showPopupBuilding, this._showPopup);
    GlobalEvent.on(closePopupBuilding, this._closePopup);
  };

  _reset = () => {
    const { showPopupBuilding, closePopupBuilding } = GloEventName;
    GlobalEvent.removeListener(showPopupBuilding, this._showPopup);
    GlobalEvent.removeListener(closePopupBuilding, this._closePopup);
  };

  _showPopup = async param => {
    const { visible, boxLeft, boxTop, lngLat, code } = param;
    await this.setState({
      visible,
      boxLeft: boxLeft,
      boxTop: boxTop,
      lngLat: lngLat,
      buildingCode: code,
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

  _fetchBuildingDetail = async () => {
    const { buildingCode } = this.state;
    const { res, err } = await FetchBuildingDetail({
      dzbm: buildingCode
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
      baseInfo: BaseInfo,
      affiliationInfo: AffiliationInfo,
      custodianInfo: CustodianInfo,
      homeownerInfo: HomeownerInfo
    });
  };

  _addListener = () => {
    const { lngLat, visible } = this.state;
    if (!visible || !lngLat) return;
    const { x, y } = _MAP_.project(lngLat); // {lat, lng} => {x, y}
    this.setState({ boxLeft: x, boxTop: y });
  };
}
