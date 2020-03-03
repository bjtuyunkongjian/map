import React, { Component } from 'react';
import { FaPeriscope } from 'react-icons/fa';
import { MdPeopleOutline } from 'react-icons/md';
import { TiHomeOutline } from 'react-icons/ti';
import { FaTimes } from 'react-icons/fa';
import { GlobalEvent, GloEventName } from 'tuyun-utils';

import { FetchHouseDetail } from './webapi';

export default class PopupUniNameplate extends Component {
  state = {
    visible: false,
    boxLeft: '50%',
    boxTop: '50%',
    lngLat: {},
    selectedUnit: {},
    popCode: '',
    unitName: '',
    unitLocation: '',
    totalCompany: {}, // 常驻、流动、重点人口总数
    companyInfoList: []
  };

  _popupEl;

  componentDidMount = () => this._init();

  componentWillUnmount = () => this._reset();

  render() {
    const {
      visible,
      boxLeft,
      boxTop,
      selectedUnit = {},
      unitName,
      unitLocation,
      totalCompany,
      companyInfoList
    } = this.state;
    if (!visible) return null;
    return (
      <div
        ref={el => (this._popupEl = el)}
        style={{ top: boxTop + 10, left: boxLeft + 10 }}
        className="podata-popup"
      >
        <div className="popup-title">
          <FaPeriscope className="icon-left" />
          <div className="title-text">{unitName}</div>
          <FaTimes className="close" onClick={this._closePopup} />
        </div>

        <ul className="popup-detail">
          <li>
            <TiHomeOutline className="icon-left" />
            单位地址：{unitLocation}
          </li>
          <li>
            <MdPeopleOutline className="icon-left" />
            <div>
              <div>总数：{totalCompany.totalNum}</div>
              <div>特种：{totalCompany.tzComNum}</div>
              <div>保护：{totalCompany.bhComNum}</div>
            </div>
          </li>
        </ul>

        <ul className="popup-list">
          {companyInfoList.map((item, index) => {
            const _selected = selectedUnit === item;

            return (
              <li
                className={`list-item ${_selected ? 'selected-item' : ''}`}
                key={`house_item_${index}`}
                onClick={() => this._selectHouseRoom(item)}
              >
                <div className="room-code">{item.dwmc}</div>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  _init = () => {
    const { showPopupUnitNameplate, closePopupUnitNameplate } = GloEventName;
    GlobalEvent.on(showPopupUnitNameplate, this._showPopup);
    GlobalEvent.on(closePopupUnitNameplate, this._closePopup);
  };

  _reset = () => {
    const { showPopupUnitNameplate, closePopupUnitNameplate } = GloEventName;
    GlobalEvent.removeListener(showPopupUnitNameplate, this._showPopup);
    GlobalEvent.removeListener(closePopupUnitNameplate, this._closePopup);
  };

  _showPopup = async param => {
    const { visible, boxLeft, boxTop, lngLat, code } = param;
    await this.setState({
      visible: visible,
      boxLeft: boxLeft,
      boxTop: boxTop,
      lngLat: lngLat,
      popCode: code,
      selectedUnit: {},
      unitName: '',
      unitLocation: '',
      totalCompany: {}, // 常驻、流动、重点人口总数
      companyInfoList: []
    });
    this._fetchPersionDetail();
    _MAP_.on('move', this._addListener);
  };

  _closePopup = () => {
    this.setState({
      visible: false,
      lngLat: {},
      selectedUnit: {},
      popCode: '',
      unitName: '',
      unitLocation: '',
      totalCompany: {}, // 常驻、流动、重点人口总数
      companyInfoList: []
    });
    GlobalEvent.emit(GloEventName.closePopupUnit);
    _MAP_.off('move', this._addListener);
  };

  _fetchPersionDetail = async () => {
    const { popCode } = this.state;
    const _param = `jzwbm=${popCode}&type=02`;
    const { res, err } = await FetchHouseDetail(_param);
    if (!res || err) return;
    const { jzwdzmc, companyInfoList, totalCompany } = res;
    this.setState({
      unitName: jzwdzmc || '暂无',
      unitLocation: jzwdzmc || '暂无',
      totalCompany: totalCompany || {},
      companyInfoList: companyInfoList || []
    });
  };

  _addListener = () => {
    const { lngLat, visible } = this.state;
    if (!visible || !lngLat) return;
    const { x, y } = _MAP_.project(lngLat); // {lat, lng} => {x, y}
    this.setState({ boxLeft: x, boxTop: y });
  };

  _selectHouseRoom = option => {
    const { selectedUnit, boxLeft, boxTop } = this.state;
    const { closePopupUnit, showPopupUnit } = GloEventName;
    if (selectedUnit === option) {
      GlobalEvent.emit(closePopupUnit);
      this.setState({ selectedUnit: {} });
    } else {
      if (!this._popupEl) return;
      const { width: _popupW } = this._popupEl.getBoundingClientRect();
      const _boxLeft = boxLeft + Math.floor(_popupW * 1.01);
      const _boxTop = boxTop;
      const _lngLat = _MAP_.unproject({ x: _boxLeft, y: _boxTop });
      GlobalEvent.emit(showPopupUnit, {
        visible: true,
        boxLeft: _boxLeft,
        boxTop: _boxTop,
        lngLat: _lngLat,
        code: option.zagldwbm
      });
      this.setState({ selectedUnit: option });
    }
  };
}
