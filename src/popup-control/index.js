import React, { Component } from 'react';
import ControlBayonet from './control-bayonet';
import ControlIcafe from './control-icafe';
import ControlHotel from './control-hotel';
import { GlobalEvent, GloEventName } from 'tuyun-utils';
import { FaTimes } from 'react-icons/fa';
export default class PopupControl extends Component {
  state = {
    visible: false,
    baseInfo: [],
    boxLeft: 0,
    boxTop: 0,
    type: '',
    code: '',
    name: '',
    lngLat: [0, 0]
  };

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { visible, boxLeft, boxTop, type, code, name } = this.state;
    if (!visible || !code) return null;
    let _listEl;
    if (type === 'bayonet') {
      _listEl = <ControlBayonet code={code} name={name} />;
    } else if (type === 'icafe') {
      _listEl = <ControlIcafe code={code} />;
    } else if (type === 'hotel') {
      _listEl = <ControlHotel code={code} />;
    }
    return (
      <div
        className="popup-control"
        style={{ top: boxTop + 10, left: boxLeft + 10 }}
      >
        <div className="list-title">
          布控列表
          <FaTimes className="close" onClick={this._closePopup} />
        </div>
        {/* 列表 */}
        {_listEl}
      </div>
    );
  }

  _dealWithEvent = () => {
    GlobalEvent.on(GloEventName.showControlPop, this._showPopup);
    GlobalEvent.on(GloEventName.closeControlPop, this._closePopup);
  };

  _showPopup = async data => {
    const { visible, code, type, boxLeft, boxTop, lngLat, name } = data;
    if (visible) {
      this.setState({ type, code, visible, boxLeft, boxTop, lngLat, name });
      _MAP_.on('move', this._onMove);
    } else {
      _MAP_.off('move', this._onMove);
    }
  };

  _closePopup = () => {
    this.setState({ visible: false });
    _MAP_.off('move', this._onMove);
  };

  _onMove = () => {
    const { lngLat, visible } = this.state;
    if (!visible || !lngLat) return;
    const { x: boxLeft, y: boxTop } = _MAP_.project(lngLat);
    this.setState({ boxLeft, boxTop });
  };
}
