import React, { Component } from 'react';
import { GlobalEvent, GloEventName, FormatDate } from 'tuyun-utils';
import { TuyunLine } from 'tuyun-kit';

import {
  StartYear,
  StartMonth,
  StartDate,
  EndYear,
  EndMonth,
  EndDate
} from './chart-info';
import { GetTendency } from './webapi';
import { SplitDate } from './splice-posatuation';

import { DefaultTab, TabValue } from '../constant';
import Event, { EventName } from '../event';

export default class SituationLine extends Component {
  state = {
    curBar: DefaultTab,
    startYear: StartYear,
    startMonth: StartMonth,
    startDate: StartDate,
    endYear: EndYear,
    endMonth: EndMonth,
    endDate: EndDate,
    series: [],
    xAxis: [],
    selectedValue: ''
  };

  componentWillMount = () => this._dealWithEvent();

  componentDidMount = () => this._init();

  render() {
    const { curBar, series, xAxis, selectedValue } = this.state;
    if (curBar !== TabValue.posituation) return null;
    return (
      <div className="charts-box">
        <TuyunLine
          title={{ text: '警情趋势' }}
          height={160}
          series={series}
          xAxis={xAxis}
          selectedKey="code"
          selectedValue={selectedValue}
          onClick={this._onClickLine}
        />
      </div>
    );
  }

  _dealWithEvent = () => {
    Event.on(EventName.changeNav, this._onChangeNav);
    Event.on(EventName.changePosituationDistribution, this._onCancelSelect); // 更改警情分布，取消选中
    Event.on(EventName.changePosituationMulti, this._onCancelSelect); // 更改警情多发区域，取消选中
    Event.on(EventName.changePosituationDensity, this._onCancelSelect); // 更改警情平均密度，取消选中
    GlobalEvent.on(
      GloEventName.changeSituationDate,
      this._onChangeSituationDate
    );
  };

  _init = () => {
    const { curBar } = this.state;
    if (curBar === TabValue.posituation) {
      this._fetchChartData();
      this._addListener(); // 添加事件监听
    }
  };

  _onCancelSelect = () => {
    const { selectedValue } = this.state;
    if (!selectedValue) return;
    this.setState({ selectedValue: '' });
    GlobalEvent.emit(GloEventName.changeSelectedSituationTendency, '');
  };

  _onChangeSituationDate = async param => {
    const { curBar } = this.state;
    await this.setState(param);
    const { firstTime } = param;
    !firstTime && TabValue.posituation === curBar && this._fetchChartData();
  };

  _onChangeNav = async nextBar => {
    const { curBar } = this.state;
    if (nextBar === curBar) return; // 重复点击保护
    await this.setState({
      curBar: nextBar,
      series: [],
      xAxis: [],
      selectedValue: ''
    });
    GlobalEvent.emit(GloEventName.changeSelectedSituationTendency, ''); // 切换 tab，不显示动态热力图
    if (TabValue.posituation === nextBar) {
      this._fetchChartData();
      this._addListener(); // 增加监听
    } else {
      this._removeListener(); // 移除监听
    }
  };

  _onClickLine = ({ curSeries }) => {
    const { selectedValue } = this.state;
    const _selectedVal = curSeries.code === selectedValue ? '' : curSeries.code;
    this.setState({ selectedValue: _selectedVal });
    GlobalEvent.emit(
      GloEventName.changeSelectedSituationTendency,
      _selectedVal
    );
    Event.emit(EventName.changePosituationDensity, {
      selectedValue: _selectedVal
    });
  };

  _fetchChartData = async () => {
    // minX=&maxX=&minY=&maxY=&beginTime=&endTime=&level=
    const _bounds = _MAP_.getBounds();
    const {
      startYear,
      startMonth,
      startDate,
      endYear,
      endMonth,
      endDate
    } = this.state;
    const { dateArr } = SplitDate({
      start: { year: startYear, month: startMonth, date: startDate },
      end: { year: endYear, month: endMonth, date: endDate }
    });
    const _dates = [];

    for (let i = 0; i < dateArr.length; i++) {
      const _start = dateArr[i];
      const _fmtStart = FormatDate(
        new Date(_start.year, _start.month, _start.date),
        fmtType
      );
      _dates.push(_fmtStart);
    }
    const _fmtEnd = FormatDate(new Date(endYear, endMonth, endDate), fmtType);
    if (_fmtEnd !== _dates[_dates.length - 1]) _dates.push(_fmtEnd);

    const _zoom = _MAP_.getZoom();
    const _param = `minX=${_bounds._sw.lng}&maxX=${_bounds._ne.lng}&minY=${
      _bounds._sw.lat
    }&maxY=${_bounds._ne.lat}&level=${_zoom}&date=${_dates.join('&date=')}`;
    const { res, err } = await GetTendency(_param); // 获取警情趋势的数据
    if (!res || err) return;
    const _xAxis = [];
    const _series = [];
    for (let item of _dates) {
      const _index = _dates.indexOf(item);
      _xAxis.push(`${_dates[_index]} 至 ${_dates[_index + 1]}`);
      const _dateSituation = res[item];
      if (!_dateSituation) break;
      if (_index === 0) {
        for (let situationItem of _dateSituation) {
          _series.push({
            name: situationItem.name,
            code: situationItem.code,
            data: [situationItem.count]
          });
        }
      } else {
        for (let situationItem of _dateSituation) {
          const _seriesInd = _series.findIndex(
            seriesItem => seriesItem.code === situationItem.code
          );
          _series[_seriesInd].data.push(situationItem.count);
        }
      }
    }
    _series.sort((x, y) => y.code - x.code); // 按 code 进行排序
    this.setState({ series: _series, xAxis: _xAxis });
  };

  _addListener = () => {
    _MAP_.on('moveend', this._fetchChartData);
  };

  _removeListener = () => {
    _MAP_.off('moveend', this._fetchChartData);
  };
}

const fmtType = 'xxxx-xx-xx';
