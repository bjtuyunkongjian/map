/**
 * @author sl 2019-03-07
 * @description 警情面板
 */
import React, { Component } from 'react';
import { GlobalEvent, GloEventName, FormatDate } from 'tuyun-utils';
import {
  StartYear,
  StartMonth,
  StartDate,
  EndYear,
  EndMonth,
  EndDate
} from './chart-info';
import Event, { EventName } from '../event';
import { DefaultTab, TabValue } from '../constant';
import SituationDensity from './posituation-density';
import SituationBar from './posituation-bar';
import SituationLine from './posituation-line';
import DateSelect from './date-select';
import MultipleArea from './multiple-area';
import { GetChartData } from './webapi';

export default class PosituationTab extends Component {
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
      <div
        className={`tab-charts ${
          curBar !== TabValue.posituation ? 'hidden' : ''
        }`}
      >
        <DateSelect />
        <SituationBar />
        <MultipleArea />
        <SituationLine />
        <SituationDensity />
      </div>
    );
  }

  _init = () => {
    const { curBar } = this.state;
    if (curBar === TabValue.posituation) {
      this._fetchChartData();
      this._addListener(); // 添加事件监听
    }
  };

  _dealWithEvent = () => {
    Event.on(EventName.changeNav, this._onChangeNav);
    GlobalEvent.on(
      GloEventName.changeSituationDate,
      this._onChangeSituationDate
    );
  };

  _onChangeNav = async nextBar => {
    const { curBar } = this.state;
    if (nextBar === curBar) return; // 重复点击保护
    await this.setState({ curBar: nextBar });
    if (TabValue.posituation === nextBar) {
      this._fetchChartData();
      this._addListener(); // 增加监听
    } else {
      this._removeListener(); // 移除监听
    }
  };

  _onChangeSituationDate = async param => {
    const { curBar } = this.state;
    await this.setState(param);
    const { firstTime } = param;
    !firstTime && TabValue.posituation === curBar && this._fetchChartData();
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
    // minX=&code=&beginTime=&endTime=&level=&minY=&maxX=&maxY=
    const _zoom = _MAP_.getZoom();
    const _param = `minX=${_bounds._sw.lng}&maxX=${_bounds._ne.lng}&minY=${
      _bounds._sw.lat
    }&maxY=${_bounds._ne.lat}&beginTime=${FormatDate(
      new Date(startYear, startMonth, startDate),
      fmtType
    )}&endTime=${FormatDate(
      new Date(endYear, endMonth, endDate),
      fmtType
    )}&level=${_zoom}`;
    const { res, err } = await GetChartData(_param);
    if (!res || err) return;
    const { distribution, densityData } = res;
    Event.emit(EventName.updatePosituationChart, {
      policeDistribution: distribution || [],
      policeDensity: densityData || {}
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
