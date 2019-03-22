/**
 * @author sl 2017-03-07
 * @name 人口密度图
 * 1. 总人口
 * 2. 流口
 * 3. 重点人口
 * 点击右侧的密度条时，地图底图切换为相应的密度图。因为此时只是切换底图，所以地图上叠加显示的数据不变，不论是热力图还是点位图（后与王洁沟通，她认为热力图和密度图视觉上可以一起显示）。
 */

import React, { Component } from 'react';
import { TuyunDensity } from 'tuyun-kit';

import { ChartName } from './chart-info';
import { FetchDensityMap } from './webapi';

import { DefaultTab, TabValue } from '../constant';

export default class PopulationDensity extends Component {
  state = {
    selectedIndex: -1
  };

  static defaultProps = {
    chartData: {},
    curBar: DefaultTab
  };

  componentWillReceiveProps = nextPorps => {};

  render() {
    const { selectedIndex } = this.state;
    const { chartData, curBar } = this.props;
    const { lkpopDensity, totalPopDensity, zdpopDensity } = chartData;
    const _max = Math.max(lkpopDensity, totalPopDensity, zdpopDensity, 10);
    const _end = Math.max(Math.floor(_max * 1.05), 10);
    if (curBar !== TabValue.population) return null;

    return (
      <div className="charts-box">
        <TuyunDensity
          height={200}
          title={{ text: '人口密度图' }}
          legend={{
            text: `密度`
          }}
          data={[
            {
              value: totalPopDensity || 0,
              label: '总人口',
              code: '1',
              end: _end
            },
            {
              value: lkpopDensity || 0,
              label: '流动人口',
              code: '2',
              end: _end
            },
            {
              value: zdpopDensity || 0,
              label: '重点人口',
              code: '3',
              end: _end
            }
          ]}
          selectedIndex={selectedIndex}
          onClick={this._clickDensity}
        />
      </div>
    );
  }

  _clickDensity = densityInfo => {
    const { selectedIndex } = this.state;
    const { curIndex, curCell } = densityInfo;
    const _selectInd = selectedIndex === curIndex ? -1 : curIndex;

    _selectInd > -1
      ? this._fetchDensityMap(curCell.code)
      : this._hidePoliceStation(); //
  };

  _fetchDensityMap = async secType => {
    const { res, err } = await FetchDensityMap({ firtype: 1, secType });
    console.log(res);
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
    _MAP_.getLayer(policeStationId) &&
      _MAP_.setLayoutProperty(policeStationId, 'visibility', 'none'); // 设置为不显示
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
