import React, { Component } from 'react';
import { GloEventName, GlobalEvent, GlobalConst } from 'tuyun-utils';
import { FaTimes } from 'react-icons/fa';

import IdCard from './id-card';
import CarNumber from './car-number';
import PlaceName from './place-name';
import PoliceNum from './police';
import PoliceCar from './police-car';
export default class SerachResult extends Component {
  state = {
    visible: false,
    baseInfo: [],
    boxLeft: 0,
    boxTop: 0,
    type: '',
    detailInfo: {}
  };

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { visible, boxLeft, boxTop, type, detailInfo } = this.state;
    if (!visible) return null;
    let _detailEl;
    if (type === searchType.baseIdCard) {
      _detailEl = <IdCard detailInfo={detailInfo} />;
    } else if (type === searchType.baseCarNumber) {
      _detailEl = <CarNumber detailInfo={detailInfo} />;
    } else if (type === searchType.basePlaceName) {
      _detailEl = <PlaceName detailInfo={detailInfo} />;
    } else if (type === searchType.policeNum) {
      _detailEl = <PoliceNum detailInfo={detailInfo} />;
    } else if (type === searchType.policeCar) {
      _detailEl = <PoliceCar detailInfo={detailInfo} />;
    }
    return (
      <div
        className="detail-popup"
        style={{ top: boxTop + 10, left: boxLeft + 10 }}
      >
        <div className="detail-title">
          搜索结果
          <FaTimes className="close" onClick={this._closePopup} />
        </div>
        {_detailEl}
      </div>
    );
  }

  _dealWithEvent = () => {
    GlobalEvent.on(GloEventName.showSearchResult, async data => {
      const { visible, detailInfo, type } = data;
      // 关闭弹窗
      console.log('type:', type);
      if (!visible) {
        this._closePopup();
      } else if (!detailInfo || !type) {
        const { detailInfo } = this.state;
        const { x, y } = detailInfo;
        const { x: boxLeft, y: boxTop } = _MAP_.project({ lng: x, lat: y });
        this.setState({ visible, boxLeft, boxTop });
        _MAP_.on('move', this._onMove);
      } else if (type === 'base:policeCar') {
        console.log(data);
        const { detailInfo } = this.state;
        const { x, y } = detailInfo;
        const { x: boxLeft, y: boxTop } = _MAP_.project({ lng: x, lat: y });
        this.setState({ visible, boxLeft, boxTop });
        _MAP_.on('move', this._onMove);
      } else {
        // 显示弹窗信息
        const { x, y } = detailInfo;
        const { x: boxLeft, y: boxTop } = _MAP_.project({ lng: x, lat: y });
        await this.setState({
          visible,
          boxLeft,
          boxTop,
          detailInfo,
          type
        });
        _MAP_.on('move', this._onMove);
      }
    });
  };

  _onMove = () => {
    const { detailInfo } = this.state;
    const { x, y } = detailInfo;
    const { x: boxLeft, y: boxTop } = _MAP_.project({ lng: x, lat: y });
    this.setState({ boxLeft, boxTop });
  };

  _closePopup = () => {
    _MAP_.off('move', this._onMove);
    this.setState({ visible: false });
  };
}

const { searchType } = GlobalConst;
