import React, { Component } from 'react';
import { TuyunBar } from 'tuyun-kit';
import { ChartName } from './chart-info';
import { FetchChartData } from './webapi';

export default class TotalPopulation extends Component {
  static defaultProps = {
    selectedChart: '',
    selectedIndex: -1
  };

  render() {
    const { selectedChart, selectedIndex } = this.props;
    const _selectIndex =
      selectedChart === ChartName.totalPop ? selectedIndex : -1;
    return (
      <div className="charts-box">
        <TuyunBar
          height={200}
          title={{ text: '人口分布' }}
          legend={{ text: '人口总数：85' }}
          data={[
            {
              label: '总人口',
              value: 30,
              startColor: '#bbaddc',
              endColor: '#facff0'
            },
            {
              label: '常驻',
              value: 20,
              startColor: '#aed3fc',
              endColor: '#e6d1fc',
              reqParam: 11
            },
            {
              label: '流动',
              value: 15,
              startColor: '#fbdcd4',
              endColor: '#fed9fe',
              reqParam: 12
            },
            {
              label: '重点',
              value: 8,
              startColor: '#bbaddc',
              endColor: '#facff0',
              reqParam: 'Y'
            },
            {
              label: '境外',
              value: 12,
              startColor: '#aed3fc',
              endColor: '#e6d1fc',
              reqParam: 20
            }
          ]}
          selectedIndex={_selectIndex}
          onClick={this._clickBar}
        />
      </div>
    );
  }

  _clickBar = barInfo => {
    const { onSelect, selectedChart, selectedIndex } = this.props;
    const { curIndex, curCell } = barInfo;
    let _selectInd;
    if (selectedChart === ChartName.totalPop) {
      _selectInd = curIndex === selectedIndex ? -1 : curIndex;
    } else {
      _selectInd = curIndex;
    }
    _selectInd > -1 && this._fetchChartData(curCell.reqParam); // 获取数据
    onSelect({ index: _selectInd, name: ChartName.totalPop }); // 像父元素传参
  };

  _fetchChartData = async firstType => {
    return;
    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchChartData({
      firtype: firstType,
      points: {
        _sw: { lng: 116.07152456255062, lat: 36.62226357473202 },
        _ne: { lng: 117.16317543749153, lat: 36.88848218729613 }
      }
    });
    console.log('res', res);
    // todo 显示到地图上
  };
}
