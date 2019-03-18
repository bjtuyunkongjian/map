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
import { FetchDensityMap } from './webapi';

export default class PopulationDensity extends Component {
  static defaultProps = {
    selectedChart: '',
    selectedIndex: -1,
    chartData: {}
  };

  componentWillReceiveProps = nextPorps => {
    const { selectedChart, selectedIndex } = nextPorps;
    const _selected =
      selectedChart === ChartName.popDensity && selectedIndex > -1;
    if (!_selected) {
      this._hidePoliceStation();
    }
  };

  render() {
    const { selectedChart, selectedIndex, chartData } = this.props;
    console.log('chartData', chartData);
    const { lkpopDensity, totalPopDensity, zdpopDensity } = chartData;
    const _max = Math.max(lkpopDensity, totalPopDensity, zdpopDensity, 10);
    const _end = Math.max(Math.floor(_max * 1.05), 10);
    const _selectIndex =
      selectedChart === ChartName.popDensity ? selectedIndex : -1;
    return (
      <div className="charts-box">
        <TuyunDensity
          height={200}
          title={{ text: '人口密度图' }}
          legend={{ text: '人口总数：65' }}
          data={[
            { value: totalPopDensity, label: '总人口', reqParam: 1, end: _end },
            { value: lkpopDensity, label: '流口', reqParam: 2, end: _end },
            { value: zdpopDensity, label: '重点人口', reqParam: 3, end: _end }
          ]}
          selectedIndex={_selectIndex}
          onClick={this._clickDensity}
        />
      </div>
    );
  }

  _clickDensity = densityInfo => {
    const { onSelect, selectedChart, selectedIndex } = this.props;
    const { curIndex, curCell } = densityInfo;
    let _selectInd;
    if (selectedChart === ChartName.popDensity) {
      _selectInd = curIndex === selectedIndex ? -1 : curIndex;
    } else {
      _selectInd = curIndex;
    }
    _selectInd > -1 && this._fetchDensityMap(curCell.reqParam); //
    // _selectInd > -1 ? this._showPoliceStation() : this._hidePoliceStation(); // 获取数据
    onSelect({ index: _selectInd, name: ChartName.popDensity }); // 像父元素传参
  };

  _fetchDensityMap = async secType => {
    const { res, err } = await FetchDensityMap({ secType });
    // console.log(res);
    if (err || !res) return; // 保护
    // todo 显示到地图上
    // this._showPoliceStation();
  };

  // 设置派出所辖区的颜色 POLICE_STATION_JUR
  _showPoliceStation = () => {
    if (_MAP_.getLayer(policeStationId)) {
      _MAP_.setLayoutProperty(policeStationId, 'visibility', 'visible'); // 设置为可显示
      _MAP_.setPaintProperty(policeStationId, 'fill-color', [
        'coalesce',
        ['get', ['to-string', ['get', 'flow']], ['literal', areaColor]],
        '#ccc'
      ]);
    }
  };

  _hidePoliceStation = () => {
    _MAP_.on('load', () => {
      _MAP_.setLayoutProperty(policeStationId, 'visibility', 'none'); // 设置为可显示
    });
  };
}

const policeStationId = 'POLICE_STATION_JUR'; // 派出所辖区图层名称
const areaColor = {
  0: '#006000',
  1: '#00DB00',
  2: '#02DF82',
  3: '#006030',
  4: '#003E3E',
  5: '#00E3E3',
  6: '#0080FF',
  7: '#000079',
  8: '#000079',
  9: '#4A4AFF'
};
