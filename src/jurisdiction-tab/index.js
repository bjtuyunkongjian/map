import React, { Component } from 'react';
import { GlobalEvent, GloEventName, RemoveLayer, LayerIds } from 'tuyun-utils';

import SelectArea from './select-area';
import SelectDate from './select-date';
import JurisdictionCharts from './jurisdiction-charts';
import Event, { EventName } from './event';
import { GetCurArea } from './webapi';
import { DefaultArea } from './constant';
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
        className={visible ? `jurisdiction-tab ${animate}` : 'hidden'}
        style={showUi ? {} : { right: '-100%' }}
      >
        <div className="jurisdiction-box">
          <SelectArea />
          <SelectDate />
          <JurisdictionCharts />
        </div>
        <button className="control" onClick={this._toggleJurisdiction}>
          <div className={`aspect-right ${_slide}`} />
        </button>
      </div>
    );
  }

  _dealWithEvent = () => {
    const {
      showJurisdictionData,
      closeJurisdictionData,
      toggleAllUi
    } = GloEventName;
    GlobalEvent.on(showJurisdictionData, this._onJurisdictionView);
    GlobalEvent.on(closeJurisdictionData, this._onCloseJurisdiction);
    GlobalEvent.on(toggleAllUi, ({ visible }) => {
      this.setState({ showUi: visible });
    });
  };

  _onJurisdictionView = async ({ visible }) => {
    GlobalEvent.emit(GloEventName.closeTabView); // 出现辖区数据，人口/单位/房屋/案件/警情弹框消失
    GlobalEvent.emit(GloEventName.closeCompareTab); // 关闭比对碰撞
    GlobalEvent.emit(GloEventName.changeLMVehicleType); // 关闭两客一危
    GlobalEvent.emit(GloEventName.closeCrossTab); // 关闭交叉研判
    const { visible: curVisible } = this.state;
    if (visible === curVisible) return; //重复点击保护
    if (visible) {
      const { res, err } = GetCurArea();
      if (!res || err) return;
      const { point, code, name } = res;
      DefaultArea.label = name;
      DefaultArea.value = code;
      DefaultArea.center = point;
      // TODO 辖区对应的树层级
      DefaultArea.level = '';
      await this.setState({ visible: visible, animate: 'slide-in' });
      Event.emit(EventName.toggleVisible, { visible });
    } else {
      this._onCloseJurisdiction();
    }
  };

  _onCloseJurisdiction = async () => {
    const { visible: curVisible } = this.state;
    if (!curVisible) return; //重复点击保护
    await this.setState({ visible: false, animate: '' });
    Event.emit(EventName.toggleVisible, { visible: false });
    Event.emit(EventName.changeSelectedBar, '');
    RemoveLayer(_MAP_, LayerIds.jurisdiction.point);
  };

  _toggleJurisdiction = () => {
    const { animate } = this.state;
    this.setState({
      animate: animate === 'slide-in' ? 'slide-out' : 'slide-in'
    });
  };
}
