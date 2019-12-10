import React, { Component } from 'react';
import { TuyunMultiBar } from 'tuyun-kit';
import { FormatDate, GlobalEvent, GloEventName } from 'tuyun-utils';

import Event, { EventName } from './event';
import {
  StartYear,
  StartMonth,
  StartDate,
  EndYear,
  EndMonth,
  EndDate
} from './constant';
import { GetCaseCount } from './webapi';

export default class PopulationChart extends Component {
  state = { visible: false, series: [], selectedValue: '' };

  _start = FormatDate(new Date(StartYear, StartMonth, StartDate), fmtType);
  _end = FormatDate(new Date(EndYear, EndMonth, EndDate), fmtType);

  componentWillMount = () => this._dealWithEvent();

  render() {
    const { visible, series, selectedValue } = this.state;
    if (!visible) return null;
    return (
      <li className="charts-item">
        <TuyunMultiBar
          showLegend={false}
          title={{ text: '案件' }}
          hslColorArr={[[210, 39, 49]]}
          xAxis={[
            { name: '全部', type: 'QBAJ' },
            { name: '刑事', type: 'XSAJ' },
            { name: '行政', type: 'XZAJ' }
          ]}
          series={series || []}
          height={220}
          onClick={this._onClickBar}
          selectedKey="type"
          selectedValue={selectedValue}
        />
      </li>
    );
  }

  _dealWithEvent = () => {
    Event.on(EventName.changeDateRange, this._onChangeDate);
    Event.on(EventName.toggleVisible, this._onToggleVisible);
  };

  _onChangeDate = ({
    startYear,
    startMonth,
    startDate,
    endYear,
    endMonth,
    endDate
  }) => {
    this._start = FormatDate(
      new Date(startYear, startMonth, startDate),
      fmtType
    );
    this._end = FormatDate(new Date(endYear, endMonth, endDate), fmtType);
    const { visible } = this.state;
    visible && this._getCount();
  };

  _onToggleVisible = ({ visible } = {}) => {
    this.setState({ visible: visible });
    if (visible) {
      this._getCount();
      _MAP_.on('moveend', this._getCount); // 选中当前图表，添加监听事件
    } else {
      this.setState({ selectedValue: '' });
      const _param = { code: '', hasSecType: false };
      GlobalEvent.emit(GloEventName.toggleCaseDetail, _param); // 显示详情
      _MAP_.off('moveend', this._getCount);
    }
  };

  _getCount = async () => {
    const _zoom = _MAP_.getZoom();
    const _bounds = _MAP_.getBounds();
    const _param = `minX=${_bounds._sw.lng}&maxX=${_bounds._ne.lng}&minY=${
      _bounds._sw.lat
    }&maxY=${_bounds._ne.lat}&startTime=${this._start}&endTime=${
      this._end
    }&level=${_zoom}`;
    const { res, err } = await GetCaseCount(_param);
    if (!res || err) return;
    const { qbaj = 0, xsaj = 0, xzaj = 0 } = res;
    const _series = [
      {
        name: '当前屏幕',
        code: 'curScreen',
        data: [qbaj, xsaj, xzaj]
      }
    ];
    this.setState({ series: _series });
  };

  _onClickBar = async param => {
    const { type } = param.curSeries.cellInfo;
    const { selectedValue } = this.state;
    const _type = selectedValue === type ? '' : type;
    await this.setState({ selectedValue: _type });
    const _param = { code: _type, hasSecType: false };
    GlobalEvent.emit(GloEventName.toggleCaseDetail, _param); // 显示详情
  };
}

const fmtType = 'xxxx-xx-xx';
