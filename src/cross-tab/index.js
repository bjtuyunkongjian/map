import React, { Component } from 'react';
import { GlobalEvent, GloEventName } from 'tuyun-utils';

import SelectDate from './select-date';
import CrossCharts from './cross-charts';
import Event, { EventName } from './event';

export default class JurisdictionTab extends Component {
  state = {
    visible: false, // slide-in，滑入，显示在屏幕中；slide-out，划出
    animate: '',
    showUi: true
  };

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { visible, animate, showUi } = this.state;
    const _slide = animate === 'slide-in' ? '' : 'changed';
    return (
      <div
        className={visible ? `cross-tab ${animate}` : 'hidden'}
        style={showUi ? {} : { right: '-100%' }}
      >
        <div className="cross-box">
          <SelectDate />
          <CrossCharts />
        </div>
        <button className="control" onClick={this._toggleCross}>
          <div className={`aspect-right ${_slide}`} />
        </button>
      </div>
    );
  }

  _dealWithEvent = () => {
    const { showCrossTab, closeCrossTab, toggleAllUi } = GloEventName;
    GlobalEvent.on(showCrossTab, this._onShowCross);
    GlobalEvent.on(closeCrossTab, this._onCloseCross);
    GlobalEvent.on(toggleAllUi, ({ visible }) => {
      this.setState({ showUi: visible });
    });
  };

  _onShowCross = async ({ visible }) => {
    GlobalEvent.emit(GloEventName.closeTabView); // 人口/单位/房屋/案件/警情弹框消失
    GlobalEvent.emit(GloEventName.closeCompareTab); // 关闭比对碰撞
    GlobalEvent.emit(GloEventName.closeJurisdictionData); // 关闭辖区数据
    GlobalEvent.emit(GloEventName.changeLMVehicleType); // 关闭两客一危
    const { visible: curVisible } = this.state;
    if (visible === curVisible) return; //重复点击保护

    if (visible) {
      await this.setState({ visible: visible, animate: 'slide-in' });
    } else {
      await this.setState({ visible: visible, animate: '' });
    }
    Event.emit(EventName.toggleVisible, { visible });
  };

  _onCloseCross = async () => {
    const { visible: curVisible } = this.state;
    if (!curVisible) return; //重复点击保护
    await this.setState({ visible: false, animate: '' });
    Event.emit(EventName.toggleVisible, { visible: false });
  };

  _toggleCross = () => {
    const { animate } = this.state;
    this.setState({
      animate: animate === 'slide-in' ? 'slide-out' : 'slide-in'
    });
  };
}
