import React, { Component } from 'react';
import { TuyunPie } from 'tuyun-kit';
import { Event as GlobalEvent, EventName as GloEventName } from 'tuyun-utils';

import { ChartName, PopulationLayerId } from './chart-info';

import { DefaultTab, TabValue } from '../constant';

export default class KeyPersonnel extends Component {
  static defaultProps = {
    selectedChart: '',
    selectedIndex: -1,
    chartData: {},
    curBar: DefaultTab
  };

  _selectIndex = -1;
  _pieData = [];

  componentWillReceiveProps = nextProps => {
    const {
      selectedChart: nextSelectedChart,
      chartData,
      selectedChart,
      selectedIndex
    } = nextProps;
    if (ChartName.keyPop !== nextSelectedChart) {
      this._hideDetail();
    }
    // 强行要写的一个很奇葩的逻辑，扇形上百分比为 0 的扇区，不需要显示该扇区，包括其二级分类
    const _selectedChart = selectedChart === ChartName.keyPop;
    this._selectIndex = -1;
    this._pieData = pieData.filter(item => {
      if (chartData[item.key] && chartData[item.key] > 0) {
        item.value = chartData[item.key] || 0;
        return item;
      } else {
        return false;
      }
    });
    this._pieData.map((item, index) => {
      if (_selectedChart && selectedIndex === item.dataIndex) {
        this._selectIndex = index; // 刷新 chartData 数据后，如果之前选中的选项现在还存在，设置 _selectIndex
        this._showDetail(item.name, item.code);
      }
    });
    if (this._selectIndex < 0) {
      this._hideDetail(); // 如果之前选项不存在了，隐藏子选项
    }
  };

  render() {
    const { chartData, curBar } = this.props;
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
          data={this._pieData}
          selectedIndex={this._selectIndex}
          onClick={this._clickPie}
        />
      </div>
    );
  }

  _clickPie = async pieInfo => {
    const { onSelect, selectedChart, selectedIndex } = this.props;
    const { curSector } = pieInfo;
    const { dataIndex } = curSector;
    let _selectInd;
    if (selectedChart === ChartName.keyPop) {
      _selectInd = dataIndex === selectedIndex ? -1 : dataIndex;
    } else {
      _selectInd = dataIndex;
    }
    _selectInd > -1
      ? this._showDetail(curSector.name, curSector.code)
      : this._hideDetail(); // 获取数据
    onSelect({ index: _selectInd, name: ChartName.keyPop }); // 像父元素传参
  };

  _showDetail = (name, code) => {
    GlobalEvent.emit(GloEventName.toggleKeyPopDetail, {
      visible: true,
      name,
      code
    }); // 打开弹窗
  };

  _hideDetail = () => {
    GlobalEvent.emit(GloEventName.toggleKeyPopDetail, {
      visible: false
    }); // 关闭
  };
}

const pieData = [
  {
    dataIndex: 0,
    value: 0,
    key: 'wangan',
    label: '网安',
    name: 'wangan',
    code: '304000000000'
  },
  {
    dataIndex: 1,
    value: 0,
    key: 'jingzhen',
    label: '经侦',
    name: 'jingzhen',
    code: '405000000000'
  },
  {
    dataIndex: 2,
    value: 0,
    key: 'xingjing',
    label: '刑警',
    name: 'xingjing',
    code: '203000000000'
  },
  {
    dataIndex: 3,
    value: 0,
    key: 'huzhen',
    label: '户政',
    name: 'huzheng',
    code: '102000000000'
  },
  {
    dataIndex: 4,
    value: 0,
    key: 'jindu',
    label: '禁毒',
    name: 'jindu',
    code: '501000000000'
  },
  {
    dataIndex: 5,
    value: 0,
    key: 'qingbao',
    label: '情报',
    name: 'qingbao',
    code: '001000000000'
  },
  {
    dataIndex: 6,
    value: 0,
    key: 'guobao',
    label: '国保',
    name: 'guobao',
    code: '601000000000'
  },
  {
    dataIndex: 7,
    value: 0,
    key: 'fanxiejiao',
    label: '反邪教',
    name: 'fanxiejiao',
    code: '701000000000'
  },
  {
    dataIndex: 8,
    value: 0,
    key: 'fankong',
    label: '反恐',
    name: 'fankong',
    code: '801000000000'
  },
  {
    dataIndex: 9,
    value: 0,
    key: 'jiaojing',
    label: '交警',
    name: 'jiaojing',
    code: '901000000000'
  },
  {
    dataIndex: 10,
    value: 0,
    key: 'zeyu',
    label: '泽雨',
    name: 'zeyu',
    code: '120800000000'
  }
];
