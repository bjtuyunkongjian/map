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
import { IsEmpty, CreateUid } from 'tuyun-utils';

import { FetchBuildingDensity } from './webapi';

import { DefaultTab, TabValue } from '../constant';
import Event, { EventName } from '../event';

export default class BuildingDensity extends Component {
  state = {
    selectedIndex: -1,
    chartData: {},
    curBar: DefaultTab,
    selectedValue: ''
  };

  _selfOccupiedColor = {}; // 自住颜色
  _rentOutColor = {}; // 出租颜色
  _vavancyColor = {}; // 空置颜色
  _uuid = -1;

  componentWillMount = () => this._dealWithEvent();
  componentDidMount = () => this._init();

  render() {
    const { chartData, selectedIndex, curBar } = this.state;
    const { czfwDensity, kzfwDensity, totalFwDensity, zzfwDensity } = chartData;
    const _max = +Math.max(totalFwDensity, 10).toFixed(2);
    if (curBar !== TabValue.building) return null;
    return (
      <div className="charts-box">
        <TuyunDensity
          height={200}
          title={{ text: '房屋密度' }}
          legend={{ text: `密度` }}
          data={[
            {
              value: czfwDensity || 0,
              label: '出租',
              code: '2',
              end: _max || 10
            },
            {
              value: zzfwDensity || 0,
              label: '自住',
              code: '1',
              end: _max || 10
            },
            {
              value: kzfwDensity || 0,
              label: '空置',
              code: '3',
              end: _max || 10
            }
          ]}
          selectedIndex={selectedIndex}
          onClick={this._clickDensity}
        />
      </div>
    );
  }

  _init = () => {};

  _dealWithEvent = () => {
    Event.on(EventName.changeNav, this._onChangeNav);
    Event.on(EventName.updateBuiChart, this._onUpdateBuiChart);
  };

  _onChangeNav = nextBar => {
    const { curBar } = this.state;
    if (nextBar === curBar) return; // 重复点击保护
    this.setState({ curBar: nextBar });
  };

  _onUpdateBuiChart = ({ buildingDensity }) => {
    this.setState({ chartData: buildingDensity });
  };

  _clickDensity = async densityInfo => {
    const { selectedIndex, selectedValue } = this.state;
    const { curIndex, curCell } = densityInfo;
    const _selectInd = selectedIndex === curIndex ? -1 : curIndex;
    const _selectVal = selectedValue === curCell.code ? '' : curCell.code;
    await this.setState({
      selectedIndex: _selectInd,
      selectedValue: _selectVal
    });
    if (_selectVal === '1' && IsEmpty(this._selfOccupiedColor)) {
      this._fetchDensity(); // 加载自助的数据
    } else if (_selectVal === '2' && IsEmpty(this._rentOutColor)) {
      this._fetchDensity(); // 加载出租的数据
    } else if (_selectVal === '3' && IsEmpty(this._vavancyColor)) {
      this._fetchDensity(); // 加载空置的数据
    } else {
      _selectInd > -1
        ? this._showPoliceStation(curCell.code)
        : this._hidePoliceStation();
    }
  };

  _fetchDensity = async () => {
    const { selectedValue } = this.state;
    if (!selectedValue) return;
    const _uuid = (this._uuid = CreateUid()); // 生成唯一标志，如果结尾改变，则该请求结果不显示
    const { res, err } = await FetchBuildingDensity({ type: selectedValue });
    if (!res || err) return;
    if (selectedValue === '1') {
      for (let key of Object.keys(res)) {
        if (!res[key]) continue;
        this._selfOccupiedColor[key] = densityColor[res[key]];
      }
    } else if (selectedValue === '2') {
      for (let key of Object.keys(res)) {
        if (!res[key]) continue;
        this._rentOutColor[key] = densityColor[res[key]];
      }
    } else if (selectedValue === '3') {
      for (let key of Object.keys(res)) {
        if (!res[key]) continue;
        this._vavancyColor[key] = densityColor[res[key]];
      }
    }
    if (_uuid !== this._uuid) return; // _uuid改变，请求结果不显示
    this._showPoliceStation();
  };

  // 设置派出所辖区的颜色 POLICE_STATION_JUR
  _showPoliceStation = () => {
    const { selectedValue } = this.state;
    let _colorMap = {};
    if (selectedValue === '1') {
      _colorMap = this._selfOccupiedColor;
    } else if (selectedValue === '2') {
      _colorMap = this._rentOutColor;
    } else if (selectedValue === '3') {
      _colorMap = this._vavancyColor;
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
// for (let key of Object.keys(TotalDensity)) {
//   totalDensityColor[key] = densityColor[TotalDensity[key]];
// }
// for (let key of Object.keys(FloatDensity)) {
//   floatDensityColor[key] = densityColor[FloatDensity[key]];
// }
// for (let key of Object.keys(KeyDensity)) {
//   keyDensityColor[key] = densityColor[KeyDensity[key]];
// }
