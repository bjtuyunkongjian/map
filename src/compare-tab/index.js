import React, { Component } from 'react';
import { GlobalEvent, GloEventName, RemoveLayer, LayerIds } from 'tuyun-utils';

import SelectArea from './select-area';
import SelectDate from './select-date';
import CompareCharts from './compare-charts';
import Event, { EventName } from './event';

export default class CompareTab extends Component {
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
        className={visible ? `compare-tab ${animate}` : 'hidden'}
        style={showUi ? {} : { right: '-100%' }}
      >
        <div className="compare-box">
          <SelectArea />
          <SelectDate />
          <CompareCharts />
        </div>
        <button className="control" onClick={this._toggleCompare}>
          <div className={`aspect-right ${_slide}`} />
        </button>
      </div>
    );
  }

  _dealWithEvent = () => {
    const { showCompareTab, closeCompareTab, toggleAllUi } = GloEventName;
    GlobalEvent.on(showCompareTab, this._onCompareView);
    GlobalEvent.on(closeCompareTab, this._onCloseCompare);
    GlobalEvent.on(toggleAllUi, ({ visible }) => {
      this.setState({ showUi: visible });
    });
  };

  _onCompareView = async ({ visible }) => {
    GlobalEvent.emit(GloEventName.closeTabView); // 出现比对碰撞，人口/单位/房屋/案件/警情弹框消失
    GlobalEvent.emit(GloEventName.closeJurisdictionData); // 关闭辖区数据
    GlobalEvent.emit(GloEventName.changeLMVehicleType); // 关闭两客一危
    GlobalEvent.emit(GloEventName.closeCrossTab); // 关闭交叉研判
    const { visible: curVisible } = this.state;
    if (visible === curVisible) return; //重复点击保护
    if (visible) {
      await this.setState({ visible: visible, animate: 'slide-in' });
      Event.emit(EventName.toggleVisible, { visible });
    } else {
      this._onCloseCompare();
    }
  };

  _onCloseCompare = async () => {
    const { visible: curVisible } = this.state;
    if (!curVisible) return; //重复点击保护
    await this.setState({ visible: false, animate: '' });
    Event.emit(EventName.toggleVisible, { visible: false });
    Event.emit(EventName.changeSelectedBar, '');
    RemoveLayer(_MAP_, LayerIds.compareBar.point);
  };

  _toggleCompare = () => {
    const { animate } = this.state;
    this.setState({
      animate: animate === 'slide-in' ? 'slide-out' : 'slide-in'
    });
  };
}
