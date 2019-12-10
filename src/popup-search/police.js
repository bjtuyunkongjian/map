import React, { Component } from 'react';

export default class PoliceNum extends Component {
  static defaultProps = {
    detailInfo: {}
  };

  render() {
    const { detailInfo } = this.props;
    return (
      <ul className="detail-box">
        <li className="info-detail">
          <div className="detail-label">呼号</div>
          <div className="detail-value">{detailInfo.name}</div>
        </li>
        <li className="info-detail">
          <div className="detail-label">设备名称</div>
          <div className="detail-value">{detailInfo.deviceTypeBigName}</div>
        </li>
        <li className="info-detail">
          <div className="detail-label">警种类型</div>
          <div className="detail-value">{detailInfo.policeTypeBigName}</div>
        </li>
      </ul>
    );
  }
}
