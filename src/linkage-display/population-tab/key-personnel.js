import React, { Component } from 'react';
import { TuyunPie } from 'tuyun-kit';
import { Event as GlobalEvent, EventName as GloEventName } from 'tuyun-utils';

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
            { value: 435, label: '网安', name: 'wangan' },
            { value: 310, label: '经侦', name: 'jingzhen' },
            { value: 234, label: '刑警', name: 'xingjing' },
            { value: 135, label: '户政', name: 'huzheng' },
            { value: 435, label: '禁毒', name: 'jindu' },
            { value: 310, label: '情报', name: 'qingbao' },
            { value: 234, label: '国保', name: 'guobao' },
            { value: 135, label: '反邪教', name: 'fanxiejiao' },
            { value: 435, label: '反恐', name: 'fankong' },
            { value: 310, label: '交警', name: 'jiaojing' },
            { value: 234, label: '泽雨', name: 'zeyu' }
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
    _selectInd > -1 && this._showDetail(curSector.name); // 获取数据
    onSelect({ index: _selectInd, name: ChartName.keyPop }); // 像父元素传参
  };

  _showDetail = name => {
    GlobalEvent.emit(GloEventName.toggleKeyPopDetail, {
      visible: true,
      name: name
    });
  };
}
