import React, { Component } from 'react';
import { FaPeriscope } from 'react-icons/fa';
import { MdPeopleOutline } from 'react-icons/md';
import { TiHomeOutline } from 'react-icons/ti';
import { FaTimes } from 'react-icons/fa';
import { GlobalEvent, GloEventName } from 'tuyun-utils';

import { FetchBuildingDetail } from './webapi';

export default class PopupBuiNameplate extends Component {
  state = {
    visible: false,
    boxLeft: 0,
    boxTop: 0,
    lngLat: {},
    code: '',
    buildingName: '',
    buildingLocation: '',
    totalBuildingNum: {}, //
    buildingInfoList: [],
    selectedPerson: {}
  };

  componentDidMount = () => this._init();
  componentWillUnmount = () => this._reset();

  render() {
    const {
      visible,
      boxLeft,
      boxTop,
      buildingName,
      buildingLocation,
      totalBuildingNum,
      buildingInfoList
    } = this.state;
    if (!visible) return null;
    return (
      <div
        style={{ top: boxTop + 10, left: boxLeft + 10 }}
        className="podata-popup"
      >
        <div className="popup-title">
          <FaPeriscope className="icon-left" />
          <div className="title-text">{buildingName}</div>
          <FaTimes className="close" onClick={this._closePopup} />
        </div>

        <ul className="popup-detail">
          <li>
            <TiHomeOutline className="icon-left" />
            建筑地址：{buildingLocation}
          </li>
          <li>
            <MdPeopleOutline className="icon-left" />
            <div>
              <div>自住：{totalBuildingNum.zzHouseNum || 0}</div>
              <div>出租：{totalBuildingNum.czHouseNum || 0}</div>
              <div>空置：{totalBuildingNum.xzHouseNum || 0}</div>
            </div>
          </li>
        </ul>

        <ul className="popup-explanation">
          <li>
            <div className="self-occupied" />
            <span>自住</span>
          </li>
          <li>
            <div className="rental-house" />
            <span>出租</span>
          </li>
          <li>
            <div className="vacant-house" />
            <span>空置</span>
          </li>
        </ul>

        <ul className="popup-list">
          {buildingInfoList.map((item, index) => {
            return (
              <li className="list-item no-hover" key={`house_item_${index}`}>
                <div className="room-code">{item.mlph}</div>
                <div className="type-box">
                  <div className="pop-type self-occupied">
                    {item.syxs === '1' ? 1 : 0}
                  </div>
                  <div className="pop-type rental-house">
                    {item.syxs === '2' ? 1 : 0}
                  </div>
                  <div className="pop-type vacant-house">
                    {item.syxs === '3' ? 1 : 0}
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  _init = () => {
    const { showPopupBuiNameplate, closePopupBuiNameplate } = GloEventName;
    GlobalEvent.on(showPopupBuiNameplate, this._showPopup);
    GlobalEvent.on(closePopupBuiNameplate, this._closePopup);
  };

  _reset = () => {
    const { showPopupBuiNameplate, closePopupBuiNameplate } = GloEventName;
    GlobalEvent.removeListener(showPopupBuiNameplate, this._showPopup);
    GlobalEvent.removeListener(closePopupBuiNameplate, this._closePopup);
  };

  _showPopup = async param => {
    const { visible, boxLeft, boxTop, lngLat, code } = param;
    await this.setState({
      visible: visible,
      boxLeft: boxLeft,
      boxTop: boxTop,
      lngLat: lngLat,
      code: code
    });
    this._fetchBuildingDetail();
    _MAP_.on('move', this._addListener);
  };

  _closePopup = () => {
    this.setState({ visible: false });
    _MAP_.off('move', this._addListener);
  };

  _fetchBuildingDetail = async () => {
    const { code } = this.state;
    const { res, err } = await FetchBuildingDetail({
      type: '03',
      jzwbm: code
    });
    if (!res || err) return;
    const { jzwdzmc, houseInfoList, houseNumMap } = res;
    this.setState({
      buildingName: jzwdzmc || '暂无',
      buildingLocation: jzwdzmc || '暂无',
      totalBuildingNum: houseNumMap || {},
      buildingInfoList: houseInfoList || []
    });
  };

  _addListener = () => {
    const { lngLat, visible } = this.state;
    if (!visible || !lngLat) return;
    const { x, y } = _MAP_.project(lngLat); // {lat, lng} => {x, y}
    this.setState({ boxLeft: x, boxTop: y });
  };
}
