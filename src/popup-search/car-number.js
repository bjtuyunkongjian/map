import React, { Component } from 'react';

export default class CarNumber extends Component {
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
      { label: '型号', value: detailInfo.clxh },
      { label: '识别代号', value: detailInfo.clsbdh },
      { label: '发证机构', value: detailInfo.fzjg },
      { label: '车身颜色', value: detailInfo.csys },
      { label: '车辆品牌', value: detailInfo.clpp1 },
      { label: '所有人', value: detailInfo.syr },
      { label: '注册身份证', value: detailInfo.sfzmhm },
      { label: '联系电话', value: detailInfo.sjhm }
    ];
    return _baseInfo;
  };
}
