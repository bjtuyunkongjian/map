import React, { Component } from 'react';
import { TuyunPie } from 'tuyun-kit';
import { Event as GlobalEvent, EventName as GloEventName } from 'tuyun-utils';

import { ChartName, PieData } from './chart-info';
import { RemoveLayer, PopulationLayerId } from './layer-control';

import { DefaultTab, TabValue } from '../constant';
import Event, { EventName } from '../event';

export default class KeyPersonnel extends Component {
  state = {
    selectedChart: '',
    selectedDataIndex: -1, // 指的是选中扇形对应的 dataIndex
    selectedIndex: -1, // 指的是选中扇形对应的 index
    chartData: {},
    curBar: DefaultTab
  };

  _curSector = {};

  componentDidMount = () => this._init();
  render() {
    const { chartData, curBar, selectedIndex, pieData } = this.state;
    if (curBar !== TabValue.population) return null; // 不显示
    let _total = 0;
    Object.keys(chartData).map(item => {
      _total += chartData[item] || 0;
    });
    return (
      <div className="charts-box">
        <TuyunPie
          height={200}
          title={{ text: '重点人员' }}
          legend={{ text: `人员总数：${_total}` }}
          data={pieData}
          selectedIndex={selectedIndex}
          onClick={this._clickPie}
        />
      </div>
    );
  }

  _init = () => {
    this._dealWithEvent();
  };

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
      selectedDataIndex: -1,
      selectedIndex: -1
    });
  };

  _onChangePopSelected = param => {
    const { chartData } = this.state;
    const { selectedChart, selectedIndex: selectedDataIndex } = param;
    if (selectedChart === ChartName.keyPop && selectedDataIndex > -1) {
      const { selectedIndex } = this._convertPieData({
        selectedDataIndex,
        chartData: chartData || {}
      });
      this.setState({
        selectedChart,
        selectedIndex,
        selectedDataIndex
      });
      this._showDetail(this._curSector.name, this._curSector.code); // 显示详情子类
    } else {
      this.setState({
        selectedChart,
        selectedIndex: -1,
        selectedDataIndex: -1
      }); // 没选中你当前图表，设置索引为 -1
      this._closeDetail(); // 关闭详情子类
    }
  };

  _onUpdatePopChart = ({ poppieData }) => {
    const { selectedChart, selectedDataIndex } = this.state;
    const _selectedChart = selectedChart === ChartName.keyPop;
    const { pieData, selectedIndex } = this._convertPieData({
      selectedDataIndex,
      chartData: poppieData || {}
    });
    // 选中当前图表
    if (_selectedChart && selectedIndex > -1) {
      GlobalEvent.emit(GloEventName.hideKeyPopDetail, { hidden: false });
    } else {
      GlobalEvent.emit(GloEventName.hideKeyPopDetail, { hidden: true });
    }
    this.setState({ chartData: poppieData, pieData, selectedIndex }); // 更新图表数据
  };

  _convertPieData = ({ selectedDataIndex, chartData }) => {
    // 生成显示的饼图
    const _pieData = PieData.filter(item => {
      if (chartData[item.key] && chartData[item.key] > 0) {
        item.value = chartData[item.key] || 0;
        return item;
      } else {
        return false;
      }
    });
    // 计算对应的索引
    let _selectInd = -1;

    for (let index = 0; index < _pieData.length; index++) {
      const item = _pieData[index];
      if (selectedDataIndex === item.dataIndex) {
        _selectInd = index;
      }
    }
    return {
      pieData: _pieData,
      selectedIndex: _selectInd
    };
  };

  _clickPie = async pieInfo => {
    const { selectedChart, selectedDataIndex } = this.state;
    const { curSector } = pieInfo;
    const { dataIndex } = curSector; // 当前点击的扇区的 dataIndex
    this._curSector = curSector;
    let _dataIndex;
    if (selectedChart === ChartName.keyPop) {
      _dataIndex = dataIndex === selectedDataIndex ? -1 : dataIndex;
    } else {
      _dataIndex = dataIndex;
    }
    RemoveLayer(_MAP_, PopulationLayerId); // 删除当前图层
    GlobalEvent.emit(GloEventName.closePopupPopNameplate); // 切换图表，先关闭铭牌弹窗
    GlobalEvent.emit(GloEventName.closePopupPopulation); // 切换图表，先关闭详情弹窗
    // 发射切换图表事件
    Event.emit(EventName.changePopSelected, {
      selectedChart: ChartName.keyPop,
      selectedIndex: _dataIndex
    });
  };

  _showDetail = (name, code) => {
    GlobalEvent.emit(GloEventName.toggleKeyPopDetail, {
      visible: true,
      name,
      code
    }); // 打开弹窗
  };

  _closeDetail = () => {
    GlobalEvent.emit(GloEventName.toggleKeyPopDetail, {
      visible: false
    }); // 关闭
  };
}
