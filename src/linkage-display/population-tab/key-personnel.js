import React, { Component } from 'react';
import { TuyunPie } from 'tuyun-kit';
import { Event as GlobalEvent, EventName as GloEventName } from 'tuyun-utils';

import { ChartName, PopulationLayerId } from './chart-info';

export default class KeyPersonnel extends Component {
  static defaultProps = {
    selectedChart: '',
    selectedIndex: -1,
    chartData: {}
  };

  componentWillReceiveProps = nextProps => {
    const { selectedChart: nextSelectedChart } = nextProps;
    if (ChartName.keyPop !== nextSelectedChart) {
      this._hideDetail();
    }
  };

  render() {
    const { selectedChart, selectedIndex, chartData } = this.props;
    const _selectIndex =
      selectedChart === ChartName.keyPop ? selectedIndex : -1;
    return (
      <div className="charts-box">
        <TuyunPie
          height={200}
          title={{ text: '重点人员' }}
          legend={{ text: '人口总数：65' }}
          data={[
            {
              value: chartData.wangan || 0,
              label: '网安',
              name: 'wangan',
              code: '304000000000'
            },
            {
              value: chartData.jingzhen || 0,
              label: '经侦',
              name: 'jingzhen',
              code: '405000000000'
            },
            {
              value: chartData.xingjing || 0,
              label: '刑警',
              name: 'xingjing',
              code: '203000000000'
            },
            {
              value: chartData.huzhen || 0,
              label: '户政',
              name: 'huzheng',
              code: '102000000000'
            },
            {
              value: chartData.jindu || 0,
              label: '禁毒',
              name: 'jindu',
              code: '501000000000'
            },
            {
              value: chartData.qingbao || 0,
              label: '情报',
              name: 'qingbao',
              code: '001000000000'
            },
            {
              value: chartData.guobao || 0,
              label: '国保',
              name: 'guobao',
              code: '601000000000'
            },
            {
              value: chartData.fanxiejiao || 0,
              label: '反邪教',
              name: 'fanxiejiao',
              code: '701000000000'
            },
            {
              value: chartData.fankong || 0,
              label: '反恐',
              name: 'fankong',
              code: '801000000000'
            },
            {
              value: chartData.jiaojing || 0,
              label: '交警',
              name: 'jiaojing',
              code: '901000000000'
            },
            {
              value: chartData.zeyu || 0,
              label: '泽雨',
              name: 'zeyu',
              code: '120800000000'
            }
          ]}
          selectedIndex={_selectIndex}
          onClick={this._clickPie}
        />
      </div>
    );
  }

  _clickPie = async pieInfo => {
    const { onSelect, selectedChart, selectedIndex } = this.props;
    const { curIndex, curSector } = pieInfo;
    let _selectInd;
    if (selectedChart === ChartName.keyPop) {
      _selectInd = curIndex === selectedIndex ? -1 : curIndex;
    } else {
      _selectInd = curIndex;
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
      code,
      layerId: PopulationLayerId
    }); // 打开弹窗
  };

  _hideDetail = () => {
    GlobalEvent.emit(GloEventName.toggleKeyPopDetail, {
      visible: false,
      layerId: PopulationLayerId
    }); // 关闭
  };
}
