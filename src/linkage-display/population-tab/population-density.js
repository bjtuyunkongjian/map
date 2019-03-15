/**
 * @author sl 2017-03-07
 * @name 人口密度图
 * 1. 总人口
 * 2. 流口
 * 3. 重点人口
 */

import React, { Component } from 'react';
import { TuyunDensity } from 'tuyun-kit';
import { ChartName } from './chart-info';

export default class PopulationDensity extends Component {
  state = {
    selectedIndex: -1
  };

  render() {
    const { chartInfo } = this.props;
    const _selectIndex =
      chartInfo.name === ChartName.popDensity ? chartInfo.index : -1;
    return (
      <div className="charts-box">
        <TuyunDensity
          height={200}
          title={{ text: '人口密度图' }}
          legend={{ text: '人口总数：65' }}
          data={[
            { value: 2, label: '总人口' },
            { value: 4, label: '流口' },
            { value: 6, label: '重点人口' }
          ]}
          selectedIndex={_selectIndex}
          onClick={this._clickDensity}
        />
      </div>
    );
  }

  _clickDensity = densityInfo => {
    const { onSelect, chartInfo } = this.props;
    const { curIndex, curCell } = densityInfo;
    console.log(densityInfo);
    let _selectInd;
    if (chartInfo.name === ChartName.popDensity) {
      _selectInd = curIndex === chartInfo.index ? -1 : curIndex;
    } else {
      _selectInd = curIndex;
    }
    _selectInd > -1 && this._fetchChartData(); // 获取数据
    onSelect({ index: _selectInd, name: ChartName.popDensity }); // 像父元素传参
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
