import React, { Component } from 'react';
import {
  GlobalEvent,
  GloEventName,
  FormatDate,
  RemoveLayer
} from 'tuyun-utils';
import { TuyunLine } from 'tuyun-kit';

import {
  CaseLayerId,
  StartYear,
  StartMonth,
  StartDate,
  EndYear,
  EndMonth,
  EndDate
} from './chart-info';
import { FetchCaseTendency } from './webapi';
import { SplitDate } from './split-date';

import { DefaultTab, TabValue } from '../constant';
import Event, { EventName } from '../event';

export default class CaseLine extends Component {
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
    if (curBar !== TabValue.case) return null;
    return (
      <div className="charts-box">
        <TuyunLine
          title={{ text: '案件趋势' }}
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
    Event.on(EventName.changeCaseDistribution, this._onCancelSelect); // 更改案件分布，取消选中
    Event.on(EventName.changeCaseMulti, this._onCancelSelect); // 更改案件多发区域，取消选中
    Event.on(EventName.changeCaseDensity, this._onCancelSelect); // 更改案件密度，取消选中
    GlobalEvent.on(GloEventName.changeCaseDate, this._onChangeCaseDate);
  };

  _init = () => {
    const { curBar } = this.state;
    if (curBar === TabValue.case) {
      this._fetchChartData();
      this._addListener(); // 添加事件监听
    }
  };

  _onCancelSelect = () => {
    const { selectedValue } = this.state;
    if (!selectedValue) return;
    this.setState({ selectedValue: '' });
    GlobalEvent.emit(GloEventName.changeSelectedCaseTendency, '');
  };

  _onChangeCaseDate = async param => {
    const { curBar } = this.state;
    await this.setState(param);
    const { firstTime } = param;
    !firstTime && TabValue.case === curBar && this._fetchChartData();
  };

  _onChangeNav = async nextBar => {
    const { curBar } = this.state;
    if (nextBar === curBar) return; // 重复点击保护
    RemoveLayer(_MAP_, CaseLayerId); // 切换图表，先删除当前图层
    await this.setState({
      curBar: nextBar,
      series: [],
      xAxis: [],
      selectedValue: ''
    });
    GlobalEvent.emit(GloEventName.changeSelectedCaseTendency, ''); // 切换 tab，不显示动态热力图
    if (TabValue.case === nextBar) {
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
    GlobalEvent.emit(GloEventName.changeSelectedCaseTendency, _selectedVal);
    Event.emit(EventName.changeCaseTendency, { selectedValue: _selectedVal });
  };

  _fetchChartData = async () => {
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
    for (let i = 0; i < dateArr.length - 1; i++) {
      const _start = dateArr[i];
      const _end = dateArr[i + 1];
      const _fmtStart = FormatDate(
        new Date(_start.year, _start.month, _start.date),
        fmtType
      );
      const _fmtEnd = FormatDate(
        new Date(_end.year, _end.month, _end.date),
        fmtType
      );
      if (_fmtStart === _fmtEnd) break;
      _dates.push({ start: _fmtStart, end: _fmtEnd });
    }
    const _zoom = _MAP_.getZoom();
    const { res, err } = await FetchCaseTendency({
      points: _bounds,
      dates: _dates,
      level: _zoom,
      beginTime: FormatDate(
        new Date(startYear, startMonth, startDate),
        fmtType
      ),
      endTime: FormatDate(new Date(endYear, endMonth, endDate), fmtType)
    });
    if (!res || err) return;
    const _xAxis = [];
    const _series = [];
    for (let item of _dates) {
      const _index = _dates.indexOf(item);
      _xAxis.push(`${item.start} 至 ${item.end}`);
      const _dateCase = res[item.start];
      if (_index === 0) {
        for (let caseItem of _dateCase) {
          _series.push({
            name: caseItem.name,
            code: caseItem.ajlx_bm,
            data: [caseItem.count]
          });
        }
      } else {
        for (let caseItem of _dateCase) {
          const _seriesInd = _series.findIndex(
            seriesItem => seriesItem.code === caseItem.ajlx_bm
          );
          _series[_seriesInd].data.push(caseItem.count);
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
