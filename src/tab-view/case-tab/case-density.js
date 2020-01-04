/**
 * @author sl 2017-03-07
 * @description 案件密度图
 * 1. 全部
 * 2. 刑事
 * 3. 案前
 */

import React, { Component } from 'react';
import { TuyunDensity } from 'tuyun-kit';
import {
  GlobalEvent,
  GloEventName,
  DensityColor,
  FormatDate,
  IsEmpty
} from 'tuyun-utils';

import { GetCaseDensity } from './webapi';

import Event, { EventName } from '../event';
import { DefaultTab, TabValue } from '../constant';

export default class CaseDensity extends Component {
  state = {
    selectedIndex: -1,
    curBar: DefaultTab,
    chartData: {}
  };

  _start = '';
  _end = '';
  _colorMap = {};

  componentWillMount = () => this._dealWithEvent();

  componentDidMount = () => this._init();

  render() {
    const { selectedIndex, curBar, chartData } = this.state;
    if (curBar !== TabValue.case) return null;
    return (
      <div className="charts-box">
        <TuyunDensity
          height={105}
          title={{ text: '案件平均密度' }}
          legend={{ text: '全部案件' }}
          data={[
            {
              value: chartData.totalCaseDensity || 0,
              label: '全部案件',
              startColor: '#E0C3FC',
              endColor: '#8EC5FC'
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
    Event.on(EventName.updateCaseChart, this._onUpdateCaseChart);
    Event.on(EventName.changeCaseDistribution, this._onCancelSelect); // 改变选中案件，取消选中
    Event.on(EventName.changeCaseMulti, this._onCancelSelect); // 更改案件多发区域，取消选中
    Event.on(EventName.changeCaseTendency, this._onCancelSelect); // 更改案件趋势，取消选中
    GlobalEvent.on(GloEventName.changeCaseDate, this._onChangeCaseDate);
  };

  _onChangeNav = nextBar => {
    const { curBar } = this.state;
    if (nextBar === curBar) return;
    this.setState({ curBar: nextBar });
    this._hidePoliceStation();
  };

  _onUpdateCaseChart = ({ caseDensityData }) => {
    this.setState({ chartData: caseDensityData });
  };

  _onCancelSelect = () => {
    this.setState({ selectedIndex: -1 });
    this._hidePoliceStation();
  };

  _onChangeCaseDate = dateInfo => {
    const {
      endYear,
      endMonth,
      endDate,
      startYear,
      startMonth,
      startDate,
      firstTime
    } = dateInfo;
    this._start = FormatDate(
      new Date(startYear, startMonth, startDate),
      fmtType
    );
    this._end = FormatDate(new Date(endYear, endMonth, endDate));
    !firstTime && this._fetchCaseDensity();
  };

  //startTime=&endTime=
  _fetchCaseDensity = async () => {
    const _param = `startTime=${this._start}&endTime=${this._end}`;
    const { res, err } = await GetCaseDensity(_param);
    if (!res || err) return;
    this._colorMap = {}; // 清空 this._colorMap
    for (let key of Object.keys(res)) {
      if (!DensityColor[res[key]]) continue;
      this._colorMap[key] = DensityColor[res[key]];
    }
  };

  _clickDensity = densityInfo => {
    const { selectedIndex } = this.state;
    const { curIndex } = densityInfo;
    const _selectInd = selectedIndex === curIndex ? -1 : curIndex;
    this.setState({ selectedIndex: _selectInd });
    _selectInd > -1 ? this._showPoliceStation() : this._hidePoliceStation();
    Event.emit(EventName.changeCaseDensity, { selectedIndex: _selectInd });
  };

  _showPoliceStation = async () => {
    if (IsEmpty(this._colorMap)) {
      await this._fetchCaseDensity();
    }
    if (_MAP_.getLayer(policeStationId)) {
      _MAP_.setLayoutProperty(policeStationId, 'visibility', 'visible'); // 设置为可显示
      _MAP_.setPaintProperty(policeStationId, 'fill-color', [
        'coalesce',
        ['get', ['get', 'code'], ['literal', this._colorMap]],
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
const fmtType = 'xxxx-xx-xx';
