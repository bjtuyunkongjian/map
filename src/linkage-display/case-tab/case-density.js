/**
 * @author sl 2017-03-07
 * @description 案件密度图
 * 1. 全部
 * 2. 刑事
 * 3. 案前
 */

import React, { Component } from 'react';
import { TuyunDensity } from 'tuyun-kit';
import { GlobalEvent, GloEventName } from 'tuyun-utils';

import { FetchCaseDensity } from './webapi';

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
          title={{ text: '案件密度' }}
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
      startDate
    } = dateInfo;
    this._start = `${startYear}-${startMonth + 1}-${startDate}`;
    this._end = `${endYear}-${endMonth + 1}-${endDate}`;
    this._fetchCaseDensity();
  };

  _fetchCaseDensity = async () => {
    const { res, err } = await FetchCaseDensity({
      beginTime: this._start,
      endTime: this._end
    });
    if (!res || err) return;
    this._colorMap = {}; // 清空 this._colorMap
    for (let key of Object.keys(res)) {
      if (!densityColor[res[key]]) continue;
      this._colorMap[key] = densityColor[res[key]];
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

  _showPoliceStation = () => {
    if (_MAP_.getLayer(policeStationId)) {
      _MAP_.setLayoutProperty(policeStationId, 'visibility', 'visible'); // 设置为可显示
      _MAP_.setPaintProperty(policeStationId, 'fill-color', [
        'coalesce',
        ['get', ['get', 'ID'], ['literal', this._colorMap]],
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
