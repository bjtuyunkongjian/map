import React, { Component } from 'react';
import { TuyunPie } from 'tuyun-kit';
import { ChartName } from './chart-info';

export default class KeyPersonnel extends Component {
  static defaultProps = {
    selectedChart: '',
    selectedIndex: -1
  };

  render() {
    const { selectedChart, selectedIndex } = this.props;
    const _selectIndex =
      selectedChart === ChartName.keyPop ? selectedIndex : -1;
    return (
      <div className="charts-box">
        <TuyunPie
          height={200}
          title={{ text: '重点人员' }}
          legend={{ text: '人口总数：65' }}
          data={[
            { value: 435, label: '网安' },
            { value: 310, label: '经侦' },
            { value: 234, label: '刑警' },
            { value: 135, label: '户政' },
            { value: 435, label: '禁毒' },
            { value: 310, label: '情报' },
            { value: 234, label: '国保' },
            { value: 135, label: '反邪教' },
            { value: 435, label: '反恐' },
            { value: 310, label: '交警' },
            { value: 234, label: '泽雨' }
          ]}
          selectedIndex={_selectIndex}
          onClick={this._clickPie}
        />
      </div>
    );
  }

  _clickPie = pieInfo => {
    const { onSelect, selectedChart, selectedIndex } = this.props;
    const { curIndex, curSector } = pieInfo;
    let _selectInd;
    if (selectedChart === ChartName.keyPop) {
      _selectInd = curIndex === selectedIndex ? -1 : curIndex;
    } else {
      _selectInd = curIndex;
    }
    _selectInd > -1 && this._showDetail(curSector); // 获取数据
    onSelect({ index: _selectInd, name: ChartName.keyPop }); // 像父元素传参
  };

  _showDetail = () => {};
}
