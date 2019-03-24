import React, { Component } from 'react';
import { FaPeriscope } from 'react-icons/fa';
// import { MdLocationCity } from 'react-icons/md';
import { MdPeopleOutline } from 'react-icons/md';
import { TiHomeOutline } from 'react-icons/ti';
import { FaTimes } from 'react-icons/fa';
import { Event as GlobalEvent, EventName as GloEventName } from 'tuyun-utils';

import MemberInfo from './member-info';
import { FetchHouseDetail } from './webapi';

export default class PopupNameplate extends Component {
  state = {
    visible: false,
    boxLeft: '50%',
    boxTop: '50%',
    lngLat: {},
    selectedRoom: {},
    popCode: '',
    buildingName: '',
    buildingInfo: '', // 楼栋信息
    buildinglocation: '',
    totalRkNum: {}, // 常驻、流动、重点人口总数
    roomInfoList: [],
    selectedPerson: {}
  };

  componentDidMount = () => this._init();

  componentWillUnmount = () => this._reset();

  render() {
    const {
      visible,
      boxLeft,
      boxTop,
      selectedRoom = {},
      buildingName,
      // buildingInfo,
      buildinglocation,
      totalRkNum,
      roomInfoList,
      selectedPerson
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
          {/* <li>
            <MdLocationCity className="icon-left" />
            楼栋信息：{buildingInfo}
          </li> */}
          <li>
            <TiHomeOutline className="icon-left" />
            建筑地址：{buildinglocation}
          </li>
          <li>
            <MdPeopleOutline className="icon-left" />
            <div>
              <div>常住：{totalRkNum.allczrkNum}</div>
              <div>流动：{totalRkNum.allldrkNum}</div>
              <div>重点：{totalRkNum.allzdryNum}</div>
            </div>
          </li>
        </ul>

        <ul className="popup-explanation">
          <li>
            <div className="resident-pop" />
            <span>常住</span>
          </li>
          <li>
            <div className="floating-pop" />
            <span>流动</span>
          </li>
          <li>
            <div className="key-pop" />
            <span>重点</span>
          </li>
        </ul>

        <ul className="popup-list">
          {roomInfoList.map((item, index) => {
            const _selected = selectedRoom === item;

            return (
              <li
                className={`list-item ${_selected ? 'selected-item' : ''}`}
                key={`house_item_${index}`}
                onClick={() => this._selectHouseRoom(item)}
              >
                <div className="room-code">{item.mlph}</div>
                <div className="type-box">
                  <div className="pop-type resident-pop">{item.czrkNum}</div>
                  <div className="pop-type floating-pop">{item.ldrkNum}</div>
                  <div className="pop-type key-pop">{item.zdryNum}</div>
                </div>
              </li>
            );
          })}
        </ul>

        {selectedRoom.personInfoList ? this._createFamilyMember() : null}

        <MemberInfo memberCode={selectedPerson.rkbm} name={selectedPerson.xm} />
      </div>
    );
  }

  _init = () => {
    const { showPopupPopNameplate, closePopupPopNameplate } = GloEventName;
    GlobalEvent.on(showPopupPopNameplate, this._showPopup);
    GlobalEvent.on(closePopupPopNameplate, this._closePopup);
  };

  _reset = () => {
    const { showPopupPopNameplate, closePopupPopNameplate } = GloEventName;
    GlobalEvent.removeListener(showPopupPopNameplate, this._showPopup);
    GlobalEvent.removeListener(closePopupPopNameplate, this._closePopup);
  };

  _showPopup = async param => {
    const { visible, boxLeft, boxTop, lngLat, code } = param;
    await this.setState({
      visible: visible,
      boxLeft: boxLeft,
      boxTop: boxTop,
      lngLat: lngLat,
      popCode: code
    });
    this._fetchPersionDetail();
    _MAP_.on('move', this._addListener);
  };

  _closePopup = () => {
    this.setState({ visible: false });
    _MAP_.off('move', this._addListener);
  };

  _fetchPersionDetail = async () => {
    const { popCode } = this.state;
    const { res, err } = await FetchHouseDetail({
      jzwbm: popCode
    });
    if (!res || err) return console.log('获取房屋信息失败');
    const { jzwdzmc, roomInfoList, totalRkNum } = res;
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

  _selectHouseRoom = option => {
    const { selectedRoom } = this.state;
    if (selectedRoom === option) {
      this.setState({ selectedRoom: {}, selectedPerson: {} });
    } else {
      this.setState({ selectedRoom: option, selectedPerson: {} });
    }
  };

  _createFamilyMember = () => {
    const { selectedRoom = {}, selectedPerson = {} } = this.state;
    const { personInfoList = [] } = selectedRoom;
    return (
      <ul className="family-member">
        {personInfoList.map((item, index) => {
          const { zdrybz, xm, syrkgllbdm } = item;
          const _selected = selectedPerson === item;
          let _personType;
          if (zdrybz === 'Y') {
            _personType = 'important';
          } else if (syrkgllbdm === '2') {
            _personType = 'resident'; // 常口
          } else if (syrkgllbdm === '3') {
            _personType = 'floating'; // 流口
          } else {
            _personType = 'resident'; // 常口
          }
          return (
            <li
              key={`member_${index}`}
              className={`member-item ${_selected ? 'selected-member' : ''}`}
              onClick={() => {
                this._selectPerson(item);
              }}
            >
              <div className="pop-name">{xm}</div>
              <div className="pop-type resident-pop">
                {_personType === 'resident' ? 1 : 0}
              </div>
              <div className="pop-type floating-pop">
                {_personType === 'floating' ? 1 : 0}
              </div>
              <div className="pop-type key-pop">
                {_personType === 'important' ? 1 : 0}
              </div>
            </li>
          );
        })}
      </ul>
    );
  };

  _selectPerson = item => {
    const { selectedPerson } = this.state;
    if (selectedPerson === item) {
      this.setState({ selectedPerson: {} });
    } else {
      this.setState({ selectedPerson: item });
    }
  };
}
