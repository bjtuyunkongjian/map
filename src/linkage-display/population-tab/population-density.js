/**
 * @author sl 2017-03-07
 * @description 人口密度图
 * 1. 总人口
 * 2. 流口
 * 3. 重点人口
 * 点击右侧的密度条时，地图底图切换为相应的密度图。因为此时只是切换底图，所以地图上叠加显示的数据不变，不论是热力图还是点位图（后与王洁沟通，她认为热力图和密度图视觉上可以一起显示）。
 */

import React, { Component } from 'react';
import { TuyunDensity } from 'tuyun-kit';

import TotalDensity from './total-density';
import FloatDensity from './float-density';
import KeyDensity from './key-density';

import { DefaultTab, TabValue } from '../constant';
import Event, { EventName } from '../event';

export default class PopulationDensity extends Component {
  state = {
    selectedIndex: -1,
    chartData: {},
    curBar: DefaultTab
  };

  componentDidMount = () => this._init();

  render() {
    const { chartData, selectedIndex, curBar } = this.state;
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

  _init = () => {
    this._dealWithEvent();
  };

  _dealWithEvent = () => {
    Event.on(EventName.changeNav, nextBar => {
      const { curBar } = this.state;
      if (nextBar === curBar) return; // 重复点击保护
      this.setState({ curBar: nextBar });
    });
    Event.on(EventName.updatePopChart, ({ popdensityData }) => {
      this.setState({ chartData: popdensityData });
    });
  };

  _clickDensity = densityInfo => {
    const { selectedIndex } = this.state;
    const { curIndex, curCell } = densityInfo;
    const _selectInd = selectedIndex === curIndex ? -1 : curIndex;
    this.setState({ selectedIndex: _selectInd });
    _selectInd > -1
      ? this._showPoliceStation(curCell.code)
      : this._hidePoliceStation();
  };

  // 设置派出所辖区的颜色 POLICE_STATION_JUR
  _showPoliceStation = code => {
    let _colorMap = {};
    if (code === '1') {
      _colorMap = totalDensityColor;
    } else if (code === '2') {
      _colorMap = totalDensityColor;
    } else if (code === '3') {
      _colorMap = keyDensityColor;
    }
    if (_MAP_.getLayer(policeStationId)) {
      _MAP_.setLayoutProperty(policeStationId, 'visibility', 'visible'); // 设置为可显示
      _MAP_.setPaintProperty(policeStationId, 'fill-color', [
        'coalesce',
        ['get', ['get', 'ID'], ['literal', _colorMap]],
        '#fff'
      ]);
    }
  };

  _hidePoliceStation = () => {
    _MAP_.getLayer(policeStationId) &&
      _MAP_.setLayoutProperty(policeStationId, 'visibility', 'none'); // 设置为不显示
  };
}

const policeStationId = 'POLICE_STATION_JUR'; // 派出所辖区图层名称

const densityColor = {
  1: '#EFFFD7',
  2: '#DEFFAC',
  3: '#BBFFBB',
  4: '#93FF93',
  5: '#96FED1',
  6: '#4EFEB3',
  7: '#4DFFFF',
  8: '#00E3E3',
  9: '#0080FF',
  10: '#0066CC'
};
const totalDensityColor = {};
const floatDensityColor = {};
const keyDensityColor = {};
for (let key of Object.keys(TotalDensity)) {
  totalDensityColor[key] = densityColor[TotalDensity[key]];
}
for (let key of Object.keys(FloatDensity)) {
  floatDensityColor[key] = densityColor[FloatDensity[key]];
}
for (let key of Object.keys(KeyDensity)) {
  keyDensityColor[key] = densityColor[KeyDensity[key]];
}
