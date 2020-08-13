import React, { Component } from 'react';
import {
  point as TurfPoint,
  featureCollection as FeatureCollection,
} from 'turf';
import { MdPeopleOutline } from 'react-icons/md';
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
  };

  componentDidMount = () => {
    this._loadLayer();
  };

  render() {
    const { visible } = this.state;
    if (!visible) return null;
    const { x, y } = _MAP_.project([116.99248913367315, 36.66327902595104]);
    return (
      <div
        style={{ top: (y | 0) + 10, left: (x | 0) + 10 }}
        className="podata-popup"
      >
        <div className="popup-title">
          <MdPeopleOutline className="icon-left" />
          <div className="title-text">人员信息</div>
          <FaTimes className="close" onClick={this._closePopup} />
        </div>

        <ul className="popup-detail">
          <li>
            <div>姓 名: 王 维</div>
          </li>
          <li>性 别：男</li>
          <li>年 龄: 34</li>
          <li>身 份 证 号: 345642194010214251</li>
          <li>联 系 电 话: 13456213547</li>
          <li>标 签: 吸毒，无业</li>
        </ul>
      </div>
    );
  }

  _loadLayer = () => {
    _MAP_.on('load', () => {
      const duration = 2 * 1000;
      _MAP_.flyTo({
        zoom: 17,
        duration: duration,
        center: [116.99248913367315, 36.66327902595104],
      });
      setTimeout(() => {
        this.setState({ visible: true });
        this._addNameLayer();
      }, 4000);
    });

    // _MAP_.on('moveend' , () => {
    //   const { x, y } = _MAP_.project([117.084498, 36.68505]);
    // })
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
