import React, { Component } from 'react';
import ControlBayonet from './control-bayonet';
import ControlIcafe from './control-icafe';
import ControlHotel from './control-hotel';

export default class ControlDetail extends Component {
  state = {
    visible: false,
    baseInfo: [],
    boxLeft: 0,
    boxTop: 0,
    type: '',
    detailInfo: {}
  };

  render() {
    const { visible, boxLeft, boxTop, type, detailInfo } = this.state;
    if (!visible) return null;
    let _detailEl;
    if (type === searchType.baseIdCard) {
      _detailEl = <ControlBayonet detailInfo={detailInfo} />;
    } else if (type === searchType.baseCarNumber) {
      _detailEl = <ControlIcafe detailInfo={detailInfo} />;
    } else if (type === searchType.basePlaceName) {
      _detailEl = <ControlHotel detailInfo={detailInfo} />;
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
}
