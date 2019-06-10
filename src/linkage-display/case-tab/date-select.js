/**
 * @author 沈良
 * @description 选择时间范围
 */

import React, { Component } from 'react';
import { Calendar, DateSelector, TuyunModal } from 'tuyun-kit';
import { FormatDate, GlobalEvent, GloEventName } from 'tuyun-utils';

import { IoIosCalendar } from 'react-icons/io';
import {
  StartYear,
  StartMonth,
  StartDate,
  EndYear,
  EndMonth,
  EndDate
} from './chart-info';

export default class DateSelect extends Component {
  state = {
    showStartPicker: false,
    startYear: StartYear,
    startMonth: StartMonth,
    startDate: StartDate,
    showEndPicker: false,
    endYear: EndYear,
    endMonth: EndMonth,
    endDate: EndDate
  };

  componentDidMount = () => this._init();

  render() {
    const {
      startYear,
      startMonth,
      startDate,
      endYear,
      endMonth,
      endDate,
      showStartPicker,
      showEndPicker
    } = this.state;
    const _startMonth =
      startMonth < 9 ? '0' + (startMonth + 1) : startMonth + 1;
    const _endMonth = endMonth < 9 ? '0' + (endMonth + 1) : endMonth + 1;
    const _startDate = startDate < 10 ? '0' + startDate : startDate;
    const _endDate = endDate < 10 ? '0' + endDate : endDate;
    return (
      <div>
        <div className="case-date" onClick={this._onClickStart}>
          开始：
          <div className="selected-date">
            {`${startYear}-${_startMonth}-${_startDate}`}
            <div className="icon-case">
              <IoIosCalendar />
            </div>
          </div>
          <div className="case-calendar">
            <DateSelector
              visible={showStartPicker}
              pickedYear={startYear}
              pickedMonth={startMonth}
              pickedDate={startDate}
              maxDate={FormatDate(new Date(endYear, endMonth, endDate - 1))}
              minDate={'2016-01-01 00:00:00'}
              onCancel={this._onCancelStart}
              onSubmit={this._onSubmitStart}
            />
          </div>
        </div>

        <div className="case-date end" onClick={this._onClickEnd}>
          结束：
          <div className="selected-date">
            {`${endYear}-${_endMonth}-${_endDate}`}
            <div className="icon-case">
              <IoIosCalendar />
            </div>
          </div>
          <div className="case-calendar">
            <DateSelector
              visible={showEndPicker}
              pickedYear={endYear}
              pickedMonth={endMonth}
              pickedDate={endDate}
              maxDate={FormatDate(new Date(today))}
              minDate={FormatDate(
                new Date(startYear, startMonth, startDate + 1)
              )}
              onCancel={this._onCancelEnd}
              onSubmit={this._onSubmitEnd}
            />
          </div>
        </div>
        <TuyunModal
          title="日期选择"
          visible={false}
          onClick={() => {}}
          onCancel={() => {}}
        >
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1, marginRight: 5 }}>
              开始时间：
              <Calendar
                visible={true}
                pickedYear={2018}
                pickedMonth={2}
                pickedDate={1}
                // maxDate={}
                minDate={'2016-01-01'}
                // onSelect={this._onSelect}
              />
            </div>
            <div style={{ flex: 1 }}>
              结束时间：
              <Calendar
                visible={true}
                pickedYear={2017}
                pickedMonth={2}
                pickedDate={1}
                // maxDate={maxDate}
                minDate={'2016-01-01'}
                // onSelect={this._onSelect}
              />
            </div>
          </div>
        </TuyunModal>
      </div>
    );
  }

  _init = () => {
    const {
      endYear,
      endMonth,
      endDate,
      startYear,
      startMonth,
      startDate
    } = this.state;
    GlobalEvent.emit(GloEventName.changeCaseDate, {
      endYear,
      endMonth,
      endDate,
      startYear,
      startMonth,
      startDate,
      firstTime: true
    });
  };

  _onClickStart = () => {
    const { showStartPicker } = this.state;
    this.setState({ showStartPicker: !showStartPicker, showEndPicker: false });
  };

  _onCancelStart = () => {
    this.setState({ showStartPicker: false });
  };

  _onSubmitStart = ({ year, month, date }) => {
    const {
      endYear,
      endMonth,
      endDate,
      startYear,
      startMonth,
      startDate
    } = this.state;
    if (startYear === year && startMonth === month && startDate === date)
      return;
    this.setState({
      showStartPicker: false,
      startYear: year,
      startMonth: month,
      startDate: date
    });
    GlobalEvent.emit(GloEventName.changeCaseDate, {
      endYear,
      endMonth,
      endDate,
      startYear: year,
      startMonth: month,
      startDate: date
    });
  };

  _onClickEnd = () => {
    const { showEndPicker } = this.state;
    this.setState({ showStartPicker: false, showEndPicker: !showEndPicker });
  };

  _onCancelEnd = () => {
    this.setState({ showEndPicker: false });
  };

  _onSubmitEnd = ({ year, month, date }) => {
    const {
      startYear,
      startMonth,
      startDate,
      endYear,
      endMonth,
      endDate
    } = this.state;
    if (endYear === year && endMonth === month && endDate === date) return;
    this.setState({
      showEndPicker: false,
      endYear: year,
      endMonth: month,
      endDate: date
    });
    GlobalEvent.emit(GloEventName.changeCaseDate, {
      startYear,
      startMonth,
      startDate,
      endYear: year,
      endMonth: month,
      endDate: date
    });
  };
}

const today = new Date();
