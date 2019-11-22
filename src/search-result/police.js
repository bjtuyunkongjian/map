import React, { Component } from 'react';

export default class PoliceNum extends Component {
  static defaultProps = {
    detailInfo: {}
  };

  render() {
    const _baseInfo = this._createInfo();
    return (
      <ul className="detail-box">
        {_baseInfo.map((item, index) => (
          <li className="info-detail" key={`detail_${index}`}>
            <div className="detail-label">{item.label}</div>
            <div className="detail-value">{item.value}</div>
          </li>
        ))}
      </ul>
    );
  }

  _createInfo = () => {
    const { detailInfo } = this.props;
    const _baseInfo = [
      { label: '设备号', value: detailInfo.objectId }
      // { label: '性别', value: detailInfo.xb },
      // { label: '民族', value: detailInfo.mz },
      // { label: '身份证号', value: detailInfo.sfzhm },
      // { label: '人口类别', value: detailInfo.rklb },
      // { label: '户籍地', value: detailInfo.hjd },
      // { label: '出生日期', value: detailInfo.csrq }
    ];
    return _baseInfo;
  };
}
