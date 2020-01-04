import React, { Component } from 'react';

export default class PlaceName extends Component {
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
      { label: '地址名称', value: detailInfo.name },
      { label: '类型编码', value: detailInfo.kind }
    ];
    return _baseInfo;
  };
}
