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
import { DensityColor, IsEmpty, CreateUid } from 'tuyun-utils';

import { DefaultTab, TabValue } from '../constant';
import Event, { EventName } from '../event';
import { GetPopDenisty } from './webapi';
export default class PopulationDensity extends Component {
  state = {
    selectedIndex: -1,
    chartData: {},
    curBar: DefaultTab,
    selectedValue: ''
  };
  _totalPopColor = {}; // 全部颜色
  _importantColor = {}; // 重点颜色
  _flowColor = {}; // 流动颜色
  componentWillMount = () => this._dealWithEvent();
  componentDidMount = () => this._init();

  render() {
    const { chartData, selectedIndex, curBar } = this.state;
    const { lkpopDensity, totalPopDensity, zdpopDensity } = chartData;
    const _max = +Math.max(
      lkpopDensity,
      totalPopDensity,
      zdpopDensity,
      10
    ).toFixed(2);
    // const _end = Math.max(Math.floor(_max * 1.05), 10);
    if (curBar !== TabValue.population) return null;
    return (
      //:0:全部人口,1:重点人口,2:流动人口
      <div className="charts-box">
        <TuyunDensity
          height={200}
          title={{ text: '人口平均密度' }}
          legend={{ text: `平均密度` }}
          data={[
            {
              value: totalPopDensity || 0,
              label: '总人口',
              type: typeMap.qb,
              end: _max || 10
            },
            {
              value: lkpopDensity || 0,
              label: '流动人口',
              type: typeMap.ld,
              end: _max || 10
            },
            {
              value: zdpopDensity || 0,
              label: '重点人口',
              type: typeMap.zd,
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
    Event.on(EventName.changeNav, nextBar => {
      const { curBar } = this.state;
      if (nextBar === curBar) return; // 重复点击保护
      this.setState({ curBar: nextBar });
      this._hidePopDensity();
    });
    Event.on(EventName.updatePopChart, ({ popdensityData }) => {
      this.setState({ chartData: popdensityData });
    });
  };

  _clickDensity = async densityInfo => {
    const { selectedIndex, selectedValue } = this.state;
    const { curIndex, curCell } = densityInfo;
    const _selectInd = selectedIndex === curIndex ? -1 : curIndex;
    const _selesVal = selectedValue === curCell.type ? '' : curCell.type;
    await this.setState({
      selectedIndex: _selectInd,
      selectedValue: _selesVal
    });
    if (_selesVal === typeMap.qb && IsEmpty(this._totalPopColor)) {
      this._fetchDensity(); //加载数据
    } else if (_selesVal === typeMap.ld && IsEmpty(this._flowColor)) {
      this._fetchDensity();
    } else if (_selesVal === typeMap.zd && IsEmpty(this._importantColor)) {
      this._fetchDensity();
    } else {
      _selectInd > -1
        ? this._showPopDensity(curCell.code)
        : this._hidePopDensity();
    }
  };

  _fetchDensity = async () => {
    const { selectedValue } = this.state;
    if (!selectedValue) return;
    const _uuid = (this._uuid = CreateUid());
    const _param = `type=${selectedValue}`;
    const { res, err } = await GetPopDenisty(_param);
    if (!res || err) return;
    if (selectedValue === typeMap.qb) {
      for (let key of Object.keys(res)) {
        if (!res[key]) continue;
        this._totalPopColor[key] = DensityColor[res[key]];
      }
    } else if (selectedValue === typeMap.ld) {
      for (let key of Object.keys(res)) {
        if (!res[key]) continue;
        this._flowColor[key] = DensityColor[res[key]];
      }
    } else if (selectedValue === typeMap.zd) {
      for (let key of Object.keys(res)) {
        if (!res[key]) continue;
        this._importantColor[key] = DensityColor[res[key]];
      }
    }
    if (_uuid !== this._uuid) return; // _uuid改变，请求结果不显示
    this._showPopDensity();
  };

  _showPopDensity = () => {
    const { selectedValue } = this.state;
    let _colorMap = {};
    if (selectedValue === typeMap.qb) {
      _colorMap = this._totalPopColor;
    } else if (selectedValue === typeMap.ld) {
      _colorMap = this._flowColor;
    } else if (selectedValue === typeMap.zd) {
      _colorMap = this._importantColor;
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

  _hidePopDensity = () => {
    _MAP_.getLayer(policeStationId) &&
      _MAP_.setLayoutProperty(policeStationId, 'visibility', 'none'); // 设置为不显示
  };
}

const policeStationId = 'POLICE_STATION_JUR'; // 派出所辖区图层名称
//:0:全部人口,1:重点人口,2:流动人口
const typeMap = {
  qb: '0',
  zd: '1',
  ld: '2'
};
