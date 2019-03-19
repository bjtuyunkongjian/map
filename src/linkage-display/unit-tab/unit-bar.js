/**
 * @author sl 2019-03-06
 * @name 单位柱状图
 * 1. 全部单位
 * 2. 普通单位
 * 3. 特种单位
 * 4. 保护单位
 * 5. 九小场所
 */

import React, { Component } from 'react';
import { TuyunBar } from 'tuyun-kit';

import { ChartName } from './chart-info';

export default class UnitBar extends Component {
  state = {
    selectedIndex: -1
  };

  static defaultProps = {
    selectedChart: '',
    selectedIndex: -1,
    chartData: {}
  };

  render() {
    const { selectedChart, selectedIndex, chartData } = this.props;
    const _selectIndex =
      selectedChart === ChartName.unitBar ? selectedIndex : -1;
    console.log('chartData', chartData);
    return (
      <div className="charts-box">
        <TuyunBar
          height={200}
          title={{ text: '单位' }}
          legend={{ text: '人口总数：85' }}
          data={[
            {
              label: '全部',
              value: chartData.totalDw || 0,
              startColor: '#bbaddc',
              endColor: '#facff0'
            },
            {
              label: '普通',
              value: chartData.ptdw || 0,
              startColor: '#aed3fc',
              endColor: '#e6d1fc'
            },
            {
              label: '特种',
              value: chartData.tzdw || 0,
              startColor: '#fbdcd4',
              endColor: '#fed9fe'
            },
            {
              label: '保护',
              value: chartData.bhdw || 0,
              startColor: '#bbaddc',
              endColor: '#facff0'
            },
            {
              label: '九小场所',
              value: chartData.jxcs || 0,
              startColor: '#aed3fc',
              endColor: '#e6d1fc'
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
    if (selectedChart === ChartName.unitBar) {
      _selectInd = curIndex === selectedIndex ? -1 : curIndex;
    } else {
      _selectInd = curIndex;
    }
    _selectInd > -1 && this._fetchChartData(curCell.code); // 获取数据
    onSelect({ index: _selectInd, name: ChartName.unitBar }); // 像父元素传参
  };

  _fetchChartData = async firstType => {
    return;
    const _bounds = _MAP_.getBounds();
    const { res, err } = await FetchHeatMapData({
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
