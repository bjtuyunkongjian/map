/**
 * @author 沈良
 * @description 选择时间范围
 */

import React, { Component } from 'react';
import { Calendar, TuyunModal } from 'tuyun-kit';
import { FormatDate } from 'tuyun-utils';
import { IoIosCalendar } from 'react-icons/io';

import {
  StartYear,
  StartMonth,
  StartDate,
  EndYear,
  EndMonth,
  EndDate
} from './constant';
import Event, { EventName } from './event';

export default class DateSelect extends Component {
  state = {
    showModel: false,
    startYear: StartYear,
    startMonth: StartMonth,
    startDate: StartDate,
    endYear: EndYear,
    endMonth: EndMonth,
    endDate: EndDate,
    // 该字段为了选中显示
    showSY: StartYear,
    showSM: StartMonth,
    showSD: StartDate,
    showEY: EndYear,
    showEM: EndMonth,
    showED: EndDate
  };

  render() {
    const {
      startYear,
      startMonth,
      startDate,
      endYear,
      endMonth,
      endDate,
      showSY,
      showSM,
      showSD,
      showEY,
      showEM,
      showED,
      showModel
    } = this.state;
    return (
      <div className="cross-data-outer">
        <div className="cross-date" onClick={this._showModel}>
          时间：
          <div className="selected-date">
            {FormatDate(new Date(showSY, showSM, showSD), fmtType)} 至{' '}
            {FormatDate(new Date(showEY, showEM, showED), fmtType)}
            <div className="icon-case">
              <IoIosCalendar />
            </div>
          </div>
        </div>

        <TuyunModal
          title="日期选择"
          visible={showModel}
          onOk={this._onOk}
          onCancel={this._onCancel}
        >
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, marginRight: 5 }}>
              开始时间：
              <Calendar
                visible
                pickedYear={startYear}
                pickedMonth={startMonth}
                pickedDate={startDate}
                maxDate={FormatDate(new Date(endYear, endMonth, endDate - 1))}
                minDate={'2016-01-01 00:00:00'}
                onSelect={this._onSelectStart}
              />
            </div>
            <div style={{ flex: 1 }}>
              结束时间：
              <Calendar
                visible
                pickedYear={endYear}
                pickedMonth={endMonth}
                pickedDate={endDate}
                maxDate={FormatDate(new Date(today))}
                minDate={FormatDate(
                  new Date(startYear, startMonth, startDate + 1)
                )}
                onSelect={this._onSelectEnd}
              />
            </div>
          </div>
        </TuyunModal>
      </div>
    );
  }

  _showModel = () => {
    this.setState({ showModel: true });
  };

  _onSelectStart = ({ pickedYear, pickedMonth, pickedDate }) => {
    const { startYear, startMonth, startDate } = this.state;
    if (
      startYear === pickedYear &&
      startMonth === pickedMonth &&
      startDate === pickedDate
    )
      return; // 重复点击保护
    this.setState({
      startYear: pickedYear,
      startMonth: pickedMonth,
      startDate: pickedDate
    });
  };

  _onSelectEnd = ({ pickedYear, pickedMonth, pickedDate }) => {
    const { endYear, endMonth, endDate } = this.state;
    if (
      endYear === pickedYear &&
      endMonth === pickedMonth &&
      endDate === pickedDate
    )
      return; // 重复点击保护
    this.setState({
      endYear: pickedYear,
      endMonth: pickedMonth,
      endDate: pickedDate
    });
  };

  _onCancel = () => {
    const { showSY, showSM, showSD, showEY, showEM, showED } = this.state;
    this.setState({
      startYear: showSY,
      startMonth: showSM,
      startDate: showSD,
      endYear: showEY,
      endMonth: showEM,
      endDate: showED,
      showModel: false
    });
  };

  _onOk = () => {
    const {
      startYear,
      startMonth,
      startDate,
      endYear,
      endMonth,
      endDate
    } = this.state;
    this.setState({
      showSY: startYear,
      showSM: startMonth,
      showSD: startDate,
      showEY: endYear,
      showEM: endMonth,
      showED: endDate,
      showModel: false
    });
    Event.emit(EventName.changeDateRange, {
      startYear,
      startMonth,
      startDate,
      endYear,
      endMonth,
      endDate
    });
  };
}

const today = new Date();
const fmtType = 'xxxx-xx-xx';
