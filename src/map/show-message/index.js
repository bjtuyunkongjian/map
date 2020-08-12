import React, { Component } from 'react';
import {
  point as TurfPoint,
  featureCollection as FeatureCollection,
} from 'turf';
import { FaPeriscope } from 'react-icons/fa';
// import { MdLocationCity } from 'react-icons/md';
import { MdPeopleOutline } from 'react-icons/md';
import { TiHomeOutline } from 'react-icons/ti';
import { FaTimes } from 'react-icons/fa';
import { AddNamePlateLayer, LayerIds } from 'tuyun-utils';
import {
  PopCategory,
  BaseInfo,
  HouseholdRegInfo,
  TotalRkNum,
  RoomInfoList,
  PersonInfoList,
} from './contant';
export default class ShowMessage extends Component {
  state = {
    visible: false,
    boxTop: 250,
    boxLeft: 850,
    baseInfo: BaseInfo,
    householdRegInfo: HouseholdRegInfo,
    popCategory: PopCategory,
    buildingName: '',
    buildinglocation: '',
    totalRkNum: TotalRkNum, // 常驻、流动、重点人口总数
    roomInfoList: RoomInfoList,
    selectedPerson: {},
    selectedRoom: {},
    personInfoList: PersonInfoList,
  };

  componentDidMount = () => {
    this._loadLayer();
  };

  render() {
    const {
      boxTop,
      boxLeft,
      totalRkNum,
      roomInfoList,
      selectedRoom,
      visible,
    } = this.state;
    if (!visible) return null;
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

        {this._createFamilyMember()}
      </div>
    );
  }

  _createFamilyMember = () => {
    const { boxTop, boxLeft } = this.state;
    return (
      <ul className="family-member">
        <div className="detail-popup" style={{ top: 0, left: 280 }}>
          <div className="detail-title">
            人员信息
            <FaTimes className="close" onClick={this._closePopup} />
          </div>
          <div className="info-label">基本信息</div>
          <ul className="detail-box">
            <li className="member-iteml">
              <div className="detail-label">姓名：张三</div>
              <div className="detail-label">性别：男：</div>
              <div className="detail-label">出生日期：1987-10-10</div>
              <div className="detail-label">身份证：245677899098766655</div>
              <div className="detail-label">人口类别：常住人口</div>
            </li>
          </ul>

          <div className="info-label">户籍信息</div>
          <ul className="detail-box">
            <li className="info-detail">
              <div className="detail-label">户籍地</div>
              <div className="detail-value">xx省xx市xx派出所</div>
            </li>
          </ul>
        </div>
      </ul>
    );
  };

  _loadLayer = () => {
    _MAP_.on('load', () => {
      const duration = 5 * 1000;
      _MAP_.flyTo({
        zoom: 17,
        duration: duration,
        center: [117.084182, 36.682856],
      });
      setTimeout(() => {
        this.setState({ visible: true });
        this._addNameLayer();
      }, duration + 500);
    });
  };

  _addNameLayer = () => {
    const _features = TurfPoint([117.084498, 36.68505], { code: 1 });
    const _geoJSONData = {
      type: 'geojson',
      data: FeatureCollection([_features]),
    };
    console.log(_geoJSONData);
    AddNamePlateLayer(_MAP_, _geoJSONData, LayerIds.hyNameLayer.namePlate); // 添加铭牌
  };

  _closePopup = () => {
    this.setState({ visible: false });
  };
}
