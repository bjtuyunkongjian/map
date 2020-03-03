/**
 * @author sl 2019-03-07
 * @description 案件面板
 */
import React, { Component } from 'react';
import { GlobalEvent, GloEventName, FormatDate } from 'tuyun-utils';

import DateSelect from './date-select';
import MultipleArea from './multiple-area';
import CaseBar from './case-bar';
import CaseLine from './case-line';
import CaseDensity from './case-density';
import {
  StartYear,
  StartMonth,
  StartDate,
  EndYear,
  EndMonth,
  EndDate
} from './chart-info';
import { GetChartData } from './webapi';

import Event, { EventName } from '../event';
import { DefaultTab, TabValue } from '../constant';

export default class CaseTab extends Component {
  state = {
    curBar: DefaultTab,
    startYear: StartYear,
    startMonth: StartMonth,
    startDate: StartDate,
    endYear: EndYear,
    endMonth: EndMonth,
    endDate: EndDate
  };

  componentWillMount = () => this._dealWithEvent();
  componentDidMount = () => this._init();

  render() {
    const { curBar } = this.state;
    return (
      <div className={`tab-charts ${curBar !== TabValue.case ? 'hidden' : ''}`}>
        <DateSelect />
        <CaseBar />
        <MultipleArea />
        <CaseLine />
        <CaseDensity />
      </div>
    );
  }

  _init = () => {
    const { curBar } = this.state;
    if (curBar === TabValue.case) {
      this._fetchChartData();
      this._addListener(); // 添加事件监听
    }
  };

  _dealWithEvent = () => {
    Event.on(EventName.changeNav, this._onChangeNav);
    GlobalEvent.on(GloEventName.changeCaseDate, this._onChangeCaseDate);
  };

  _onChangeNav = async nextBar => {
    const { curBar } = this.state;
    if (nextBar === curBar) return; // 重复点击保护
    await this.setState({ curBar: nextBar });
    if (TabValue.case === nextBar) {
      this._fetchChartData();
      this._addListener(); // 增加监听
    } else {
      this._removeListener(); // 移除监听
    }
  };

  _onChangeCaseDate = async param => {
    const { curBar } = this.state;
    await this.setState(param);
    const { firstTime } = param;
    !firstTime && TabValue.case === curBar && this._fetchChartData();
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
    // minX=&maxX=&minY=&maxY=&startTime=&endTime=&level=
    const _zoom = _MAP_.getZoom();
    const _param = `minX=${_bounds._sw.lng}&maxX=${_bounds._ne.lng}&minY=${
      _bounds._sw.lat
    }&maxY=${_bounds._ne.lat}&startTime=${FormatDate(
      new Date(startYear, startMonth, startDate),
      fmtType
    )}&endTime=${FormatDate(
      new Date(endYear, endMonth, endDate),
      fmtType
    )}&level=${_zoom}`;
    const { res, err } = await GetChartData(_param);
    if (!res || err) return;
    const { caseDistribution, caseDensityData } = res;
    Event.emit(EventName.updateCaseChart, {
      caseDistribution: caseDistribution || [],
      caseDensityData: caseDensityData || {}
    });
  };

  _addListener = () => {
    _MAP_.on('moveend', this._fetchChartData);
  };

  _removeListener = () => {
    _MAP_.off('moveend', this._fetchChartData);
  };
}

const fmtType = 'xxxx-xx-xx';
