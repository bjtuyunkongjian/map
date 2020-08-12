import React, { Component } from 'react';

import { FaPeriscope } from 'react-icons/fa';
// import { MdLocationCity } from 'react-icons/md';
import { MdPeopleOutline } from 'react-icons/md';
import { TiHomeOutline } from 'react-icons/ti';
import { FaTimes } from 'react-icons/fa';
import { GlobalEvent, GloEventName } from 'tuyun-utils';
import {
  PopCategory,
  BaseInfo,
  HouseholdRegInfo,
  TotalRkNum,
  RoomInfoList,
} from './contant';
export default class ShowMessage extends Component {
  state = {
    visible: true,
    boxTop: 50,
    boxLeft: 60,
    baseInfo: BaseInfo,
    householdRegInfo: HouseholdRegInfo,
    popCategory: PopCategory,
    buildingName: '',
    buildinglocation: '',
    totalRkNum: TotalRkNum, // 常驻、流动、重点人口总数
    roomInfoList: RoomInfoList,
    selectedPerson: {},
    selectedRoom: {},
  };

  render() {
    const {
      boxTop,
      boxLeft,
      baseInfo,
      ouseholdRegInfo,
      popCategory,
      visible,
      buildinglocation,
      buildingName,
      totalRkNum,
      roomInfoList,
      selectedPerson,
      selectedRoom,
    } = this.state;
    return (
      <div
        style={{ top: boxTop + 10, left: boxLeft + 10 }}
        className="podata-popup"
      >
        <div className="popup-title">
          <FaPeriscope className="icon-left" />
          <div className="title-text">大地锐城</div>
          <FaTimes className="close" onClick={this._closePopup} />
        </div>

        <ul className="popup-detail">
          <li>
            <TiHomeOutline className="icon-left" />
            建筑地址：济南市历城区山大北路47号
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
                onClick={() => this._createFamilyMember()}
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
      </div>
    );
  }

  _createFamilyMember = () => {
    console.log('bbbbbbbb');
    const { baseInfo, selectedRoom } = this.state;
    const { personInfoList = [] } = selectedRoom;
    return (
      <ul className="family-member">
        {personInfoList.map((item, index) => {
          const { syrkgllbdm } = item;
          let _personType;
          if (syrkgllbdm === '11') {
            _personType = 'resident'; // 常口
          }
          return (
            <div
              className="detail-popup"
              style={{ top: boxTop + 10, left: boxLeft + 10 }}
            >
              <div className="detail-title">
                人员信息
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
        })}
      </ul>
    );
  };
}
