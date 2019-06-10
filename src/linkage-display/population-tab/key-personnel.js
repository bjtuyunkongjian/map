import React, { Component } from 'react';
import { TuyunPie } from 'tuyun-kit';
import { GlobalEvent, GloEventName, RemoveLayer, LayerIds } from 'tuyun-utils';

import { ChartName } from './chart-info';

import { DefaultTab, TabValue } from '../constant';
import Event, { EventName } from '../event';

export default class KeyPersonnel extends Component {
  state = {
    selectedChart: '',
    selectedValue: null,
    chartData: [],
    curBar: DefaultTab
  };

  _curSector = {};

  componentWillMount = () => this._dealWithEvent();
  componentDidMount = () => this._init();

  render() {
    const { chartData, curBar, selectedValue } = this.state;
    if (curBar !== TabValue.population) return null; // 不显示
    let _total = 0;
    chartData.map(item => {
      _total += item.value || 0;
    });
    return (
      <div className="charts-box">
        <TuyunPie
          height={200}
          title={{ text: '重点人员' }}
          legend={{ text: `人员总数：${_total}` }}
          data={chartData}
          selectedKey={'code'}
          selectedValue={selectedValue}
          onClick={this._clickPie}
        />
      </div>
    );
  }

  _init = () => {};

  _dealWithEvent = () => {
    Event.on(EventName.changeNav, this._onChangeNav); // 切换 tab
    Event.on(EventName.changePopSelected, this._onChangePopSelected); // 切换图表
    Event.on(EventName.updatePopChart, this._onUpdatePopChart); // 更新图表数据
  };

  _onChangeNav = nextBar => {
    const { curBar } = this.state;
    if (nextBar === curBar) return; // 重复点击保护
    this._closeDetail(); // 关闭详情子类
    this.setState({
      curBar: nextBar,
      selectedChart: '',
      selectedValue: null
    });
  };

  _onChangePopSelected = param => {
    const { selectedChart, selectedValue } = param;
    if (selectedChart === ChartName.keyPop && selectedValue) {
      this.setState({
        selectedChart,
        selectedValue
      });
      this._showDetail(this._curSector.name, this._curSector.code); // 显示详情子类
    } else {
      this.setState({
        selectedChart,
        selectedValue
      }); // 没选中你当前图表，设置索引为 -1
      this._closeDetail(); // 关闭详情子类
    }
  };

  _onUpdatePopChart = ({ poppieData }) => {
    poppieData.map(item => {
      item.label = item.name;
      item.value = item.count;
      item.code = item.type;
    });
    this.setState({ chartData: poppieData }); // 更新图表数据
  };

  _clickPie = async pieInfo => {
    const { selectedChart, selectedValue } = this.state;
    const { curSector } = pieInfo;
    const { code } = curSector; // 当前点击的扇区的 dataIndex
    this._curSector = curSector;
    let _selectedValue;
    if (selectedChart === ChartName.keyPop) {
      _selectedValue = code === selectedValue ? null : code;
    } else {
      _selectedValue = curSector.code;
    }
    const { population: populationLayerIds } = LayerIds;
    RemoveLayer(_MAP_, populationLayerIds.point); // 切换图表，先删除当前图层
    RemoveLayer(_MAP_, populationLayerIds.heatmap); // 切换图表，先删除当前图层
    RemoveLayer(_MAP_, populationLayerIds.namePlate); // 切换图表，先删除当前图层
    GlobalEvent.emit(GloEventName.closePopupPopNameplate); // 切换图表，先关闭铭牌弹窗
    GlobalEvent.emit(GloEventName.closePopupPopulation); // 切换图表，先关闭详情弹窗
    // 发射切换图表事件
    Event.emit(EventName.changePopSelected, {
      selectedChart: ChartName.keyPop,
      selectedValue: _selectedValue
    });
  };

  _showDetail = (name, code) => {
    GlobalEvent.emit(GloEventName.toggleDetailPopulation, {
      visible: true,
      name,
      code,
      hasSecType: false
    }); // 打开弹窗
  };

  _closeDetail = () => {
    GlobalEvent.emit(GloEventName.toggleDetailPopulation, {
      visible: false
    }); // 关闭
  };
}
