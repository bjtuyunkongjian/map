import React, { Component } from 'react';
import ControlBayonet from './control-bayonet';
import ControlIcafe from './control-icafe';
import ControlHotel from './control-hotel';
import { GlobalEvent, GloEventName } from 'tuyun-utils';
import { GetBayonetPop, GetHotelPop, GetIcafePop } from './webapi';
export default class ControlDetail extends Component {
  state = {
    visible: false,
    baseInfo: [],
    boxLeft: 0,
    boxTop: 0,
    type: '',
    code: '',
    lngLat: [0, 0]
  };

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { visible, boxLeft, boxTop, type, code } = this.state;
    if (!visible) return null;
    let _listEl;
    if (type === 'bayonet') {
      _listEl = <ControlBayonet code={code} />;
    } else if (type === 'icafe') {
      _listEl = <ControlIcafe detailInfo={detailInfo} />;
    } else if (type === 'hotel') {
      _listEl = <ControlHotel detailInfo={detailInfo} />;
    }
    return (
      <div
        className="list-popup"
        style={{ top: boxTop + 10, left: boxLeft + 10 }}
      >
        <div className="list-title">
          布控列表
          <FaTimes className="close" onClick={this._closePopup} />
        </div>
        <div className="list-content">
          <ul></ul>
        </div>
      </div>
    );
  }
  _dealWithEvent = () => {
    GlobalEvent.on(GloEventName.showControlPop, async data => {
      const { visible, code, type, boxLeft, boxTop, lngLat } = data;
      // 请求布控重点人员详情
      if (!visible) {
        this._closePopup();
      } else {
        this.setState({ type, code, visible, boxLeft, boxTop, lngLat });
        _MAP_.on('move', this._onMove);
      }
    });
  };

  _onMove = () => {
    const { lngLat } = this.state;
    const [lng, lat] = lngLat;
    const { x: boxLeft, y: boxTop } = _MAP_.project({ lng, lat });
    this.setState({ boxLeft, boxTop });
  };

  _closePopup = () => {
    _MAP_.off('move', this._onMove);
    this.setState({ visible: false });
  };
}
