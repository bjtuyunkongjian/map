/**
 * @author sl 2017-03-07
 * @description 人口密度图
 * 1. 总人口
 * 2. 流口
 * 3. 重点人口
 * 点击右侧的平均密度条时，地图底图切换为相应的平均密度。因为此时只是切换底图，所以地图上叠加显示的数据不变，不论是热力图还是点位图（后与王洁沟通，她认为热力图和平均密度视觉上可以一起显示）。
 */

import React, { Component } from 'react';
import { TuyunDensity } from 'tuyun-kit';
import { IsEmpty, CreateUid, DensityColor } from 'tuyun-utils';

import { GetDensity } from './webapi';

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
    const {
      czfwDensity = 0,
      kzfwDensity = 0,
      totalFwDensity = 0,
      zzfwDensity = 0
    } = chartData;
    const _max = +Math.max(totalFwDensity, 10).toFixed(2) || 10;
    if (curBar !== TabValue.building) return null;
    return (
      <div className="charts-box">
        <TuyunDensity
          height={200}
          title={{ text: '房屋平均密度' }}
          legend={{ text: `平均密度` }}
          data={[
            // 0:出租,1:闲置,2:自住
            { value: czfwDensity, label: '出租', type: typeMap.cz, end: _max },
            { value: zzfwDensity, label: '自住', type: typeMap.zz, end: _max },
            { value: kzfwDensity, label: '闲置', type: typeMap.xz, end: _max }
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
    const _selectVal = selectedValue === curCell.type ? '' : curCell.type;
    await this.setState({
      selectedIndex: _selectInd,
      selectedValue: _selectVal
    });
    if (_selectVal === typeMap.zz && IsEmpty(this._selfOccupiedColor)) {
      this._fetchDensity(); // 加载自住的数据
    } else if (_selectVal === typeMap.cz && IsEmpty(this._rentOutColor)) {
      this._fetchDensity(); // 加载出租的数据
    } else if (_selectVal === typeMap.xz && IsEmpty(this._vavancyColor)) {
      this._fetchDensity(); // 加载空置的数据
    } else {
      _selectInd > -1
        ? this._showPoliceStation(curCell.type)
        : this._hidePoliceStation();
    }
  };

  _fetchDensity = async () => {
    const { selectedValue } = this.state;
    if (!selectedValue) return;
    const _uuid = (this._uuid = CreateUid()); // 生成唯一标志，如果结尾改变，则该请求结果不显示
    const _param = `type=${selectedValue}`;
    const { res, err } = await GetDensity(_param);
    if (!res || err) return;
    if (selectedValue === typeMap.zz) {
      for (let key of Object.keys(res)) {
        if (!res[key]) continue;
        this._selfOccupiedColor[key] = DensityColor[res[key]];
      }
    } else if (selectedValue === typeMap.cz) {
      for (let key of Object.keys(res)) {
        if (!res[key]) continue;
        this._rentOutColor[key] = DensityColor[res[key]];
      }
    } else if (selectedValue === typeMap.xz) {
      for (let key of Object.keys(res)) {
        if (!res[key]) continue;
        this._vavancyColor[key] = DensityColor[res[key]];
      }
    }
    if (_uuid !== this._uuid) return; // _uuid改变，请求结果不显示
    this._showPoliceStation();
  };

  // 设置派出所辖区的颜色 POLICE_STATION_JUR
  _showPoliceStation = () => {
    const { selectedValue } = this.state;
    let _colorMap = {};
    if (selectedValue === typeMap.zz) {
      _colorMap = this._selfOccupiedColor;
    } else if (selectedValue === typeMap.cz) {
      _colorMap = this._rentOutColor;
    } else if (selectedValue === typeMap.xz) {
      _colorMap = this._vavancyColor;
    }
    if (_MAP_.getLayer(policeStationId)) {
      _MAP_.setLayoutProperty(policeStationId, 'visibility', 'visible'); // 设置为可显示
      _MAP_.setPaintProperty(policeStationId, 'fill-color', [
        'coalesce',
        ['get', ['get', 'code'], ['literal', _colorMap]],
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
// 0:出租,1:闲置,2:自住
const typeMap = {
  cz: '0',
  xz: '1',
  zz: '2'
};
