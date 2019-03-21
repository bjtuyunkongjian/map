import React, { Component } from 'react';
import { Event as GlobalEvent, EventName as GloEventName } from 'tuyun-utils';

import { FetchPopDetail } from './webapi';
import { BaseInfo, HouseholdRegInfo, PopCategory } from './constant';

export default class PupupPopulation extends Component {
  state = {
    boxTop: 0,
    boxLeft: 0,
    visible: false,
    lngLat: [],
    popCode: '',
    baseInfo: BaseInfo,
    householdRegInfo: HouseholdRegInfo
  };

  componentDidMount = () => this._init();

  componentWillUnmount = () => this._reset();

  render() {
    const {
      popCode,
      boxTop,
      boxLeft,
      visible,
      baseInfo,
      householdRegInfo
    } = this.state;
    if (!popCode || !visible) return null;

    return (
      <div
        className="detail-popup"
        style={{ top: boxTop + 10, left: boxLeft + 10 }}
      >
        <div className="detail-title">人员信息</div>

        <div className="info-label">基本信息</div>
        <ul className="detail-box">
          {baseInfo.map((item, index) => (
            <li className="info-detail" key={`detail_${index}`}>
              <div className="detail-label">{item.label}：</div>
              <div className="detail-value">{item.value}</div>
            </li>
          ))}
        </ul>

        <div className="info-label">户籍信息</div>
        <ul className="detail-box">
          {householdRegInfo.map((item, index) => (
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
    const { closePopupPopulation, showPopupPopulation } = GloEventName;
    GlobalEvent.on(showPopupPopulation, this._showPopup);
    GlobalEvent.on(closePopupPopulation, this._closePopup);
  };

  _reset = () => {
    const { showPopupPopulation, closePopupPopulation } = GloEventName;
    GlobalEvent.removeListener(showPopupPopulation, this._showPopup);
    GlobalEvent.removeListener(closePopupPopulation, this._closePopup);
  };

  _showPopup = async param => {
    const { visible, boxLeft, boxTop, lngLat, code } = param;
    await this.setState({
      visible,
      boxLeft: boxLeft,
      boxTop: boxTop,
      lngLat: lngLat,
      popCode: code
    });
    this._fetchPopDetail();
    _MAP_.on('move', this._addListener);
  };

  _closePopup = () => {
    this.setState({ visible: false });
    _MAP_.off('move', this._addListener);
  };

  _fetchPopDetail = async () => {
    const { popCode } = this.state;
    const { res, err } = await FetchPopDetail({
      rkbm: popCode
    });
    if (!res || err) return console.log('获取房屋信息失败');
    res.rklb = PopCategory[res.rklb]; // 人口类别

    BaseInfo.map(item => {
      item.value = res[item.key] || '暂无';
    });
    HouseholdRegInfo.map(item => {
      item.value = res[item.key] || '暂无';
    });
    this.setState({
      baseInfo: BaseInfo,
      householdRegInfo: HouseholdRegInfo
    });
  };

  _addListener = () => {
    const { lngLat, visible } = this.state;
    if (!visible || !lngLat) return;
    const { x, y } = _MAP_.project(lngLat); // {lat, lng} => {x, y}
    this.setState({ boxLeft: x, boxTop: y });
  };
}
