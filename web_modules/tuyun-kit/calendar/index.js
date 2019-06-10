/**
 * @author 郝义红
 * @description 日期选择器，日历
 */
import React, { Component } from 'react';

import CreateDateArr from './create-date-array';

export default class Calendar extends Component {
  state = {
    visible: false,
    pickedYear: '',
    pickedMonth: '',
    pickedDate: '',
    curYear: today.getFullYear(),
    curMonth: today.getMonth()
  };

  static defaultProps = {
    visible: false,
    pickedYear: '',
    pickedMonth: '',
    pickedDate: '',
    maxDate: '',
    minDate: '',
    onCancel: () => {},
    onSubmit: () => {},
    onSelect: () => {}
  };

  componentDidMount = () => {
    const { visible, pickedYear, pickedMonth, pickedDate } = this.props;
    this.setState({
      visible,
      pickedYear,
      pickedMonth,
      pickedDate,
      curYear: pickedYear,
      curMonth: pickedMonth
    });
  };

  componentWillReceiveProps(nextProps) {
    const { visible, pickedYear, pickedMonth, pickedDate } = nextProps;
    this.setState({
      visible,
      pickedYear,
      pickedMonth,
      pickedDate,
      curYear: pickedYear,
      curMonth: pickedMonth
    });
  }

  render() {
    const {
      curYear,
      curMonth,
      pickedYear,
      pickedMonth,
      pickedDate,
      visible
    } = this.state;
    const { maxDate, minDate } = this.props;
    if (!visible) return null;
    const _curMilliSec = new Date(curYear, curMonth).getTime();
    let _delClsName = 'Del_Btn';
    let _addClsName = 'Add_Btn';
    if (maxDate) {
      const _maxDateArr = maxDate.split('-');
      const _maxMilliSec = new Date(
        _maxDateArr[0],
        _maxDateArr[1] - 1
      ).getTime();
      _addClsName += _curMilliSec < _maxMilliSec ? '' : ' Calendar_Disabled';
    }
    if (minDate) {
      const _minDateArr = minDate.split('-');
      const _minMilliSec = new Date(
        _minDateArr[0],
        _minDateArr[1] - 1
      ).getTime();
      _delClsName += _curMilliSec > _minMilliSec ? '' : ' Calendar_Disabled';
    }
    const _dateArr = CreateDateArr(curYear, curMonth);
    return (
      <div className="Calendar" onClick={e => e.stopPropagation()}>
        {/* 头部，选择器中的年月选择部分  */}
        <ul className="Calendar_Header">
          <li className="Calendar_Btn" onWheel={this._onWheelYear}>
            <div className={_delClsName} onClick={this._delYear}>
              -
            </div>
            {curYear} 年
            <div className={_addClsName} onClick={this._addYear}>
              +
            </div>
          </li>
          <li className="Calendar_Btn" onWheel={this._onWheelMonth}>
            <div className={_delClsName} onClick={this._delMonth}>
              -
            </div>
            {curMonth + 1} 月
            <div className={_addClsName} onClick={this._addMonth}>
              +
            </div>
          </li>
        </ul>

        {/* 周一到周日 */}
        <ul className="Calendar_Date_Header">
          <li>一</li>
          <li>二</li>
          <li>三</li>
          <li>四</li>
          <li>五</li>
          <li>六</li>
          <li>日</li>
        </ul>

        {/* 日期显示 */}
        {_dateArr.map((rowItem, rowIndex) => (
          <ul key={`row_${rowIndex}`} className="Calendar_Date_Row">
            {rowItem.map((cell, cellIndex) => {
              const { date, isCurMonth } = cell;
              const _cellYear = date.getFullYear();
              const _cellMonth = date.getMonth();
              const _cellDate = date.getDate();
              const _picked =
                pickedYear === _cellYear &&
                pickedMonth === _cellMonth &&
                pickedDate === _cellDate;
              let _className =
                'Calendar_Date_Cell' +
                (_picked ? ' Date_Picked' : '') +
                (!isCurMonth ? ' Date_NotCurMonth' : '');
              if (
                (maxDate && date.getTime() > new Date(maxDate).getTime()) ||
                (minDate && date.getTime() < new Date(minDate).getTime())
              ) {
                _className += ' Date_Disabled';
              }
              return (
                <li
                  key={`ceil_${cellIndex}`}
                  className={_className}
                  onClick={e => this._selectCell(cell, e)}
                  onWheel={this._onWheelDate}
                >
                  {cell.date.getDate()}
                </li>
              );
            })}
          </ul>
        ))}

        {/* 尾部，确认选择，取消选择  */}
        {/* <ul className="Calendar_Footer">
          <li className="Calendar_Cancel" onClick={this._cancel}>
            取消
          </li>
          <li className="Calendar_Submit" onClick={this._submit}>
            确定
          </li>
        </ul> */}
      </div>
    );
  }

  // 向父组件传递选中的日期
  _selectCell = curCell => {
    const { date } = curCell;
    const { maxDate, minDate, onSelect } = this.props;
    const _selectedMilliSec = date.getTime();
    const _maxMilliSec = new Date(maxDate).getTime();
    const _minMilliSec = new Date(minDate).getTime();
    if (_selectedMilliSec > _maxMilliSec || _selectedMilliSec <= _minMilliSec)
      return;
    const { curYear, curMonth } = this.state;
    const _nextMonthMilliSec = new Date(curYear, curMonth + 1, 1);
    const _preMonthMilliSec = new Date(curYear, curMonth, 0);
    const _isCurMonth =
      _selectedMilliSec < _nextMonthMilliSec &&
      _selectedMilliSec > _preMonthMilliSec;
    if (!_isCurMonth) {
      this.setState({
        curYear: date.getFullYear(),
        curMonth: date.getMonth(),
        pickedYear: date.getFullYear(),
        pickedMonth: date.getMonth(),
        pickedDate: date.getDate()
      });
    } else {
      this.setState({
        pickedYear: date.getFullYear(),
        pickedMonth: date.getMonth(),
        pickedDate: date.getDate()
      });
    }
    onSelect({
      pickedYear: date.getFullYear(),
      pickedMonth: date.getMonth(),
      pickedDate: date.getDate()
    }); // 选中触发
  };

  _onWheelYear = e => {
    e.deltaY > 0 ? this._addYear() : this._delYear();
  };

  _onWheelMonth = e => {
    e.deltaY > 0 ? this._addMonth() : this._delMonth();
  };

  _onWheelDate = e => {
    e.deltaY > 0 ? this._addMonth() : this._delMonth();
  };

  _delYear = () => {
    const { curYear, curMonth } = this.state;
    const { minDate } = this.props;
    if (!minDate) return this.setState({ curYear: curYear - 1 }); // 如果没有最小日期，直接返回
    const _minDateArr = minDate.split('-');
    const _curDate = new Date(curYear, curMonth);
    const _nextDate = new Date(curYear - 1, curMonth);
    const _minDate = new Date(_minDateArr[0], _minDateArr[1] - 1);
    if (_curDate.getTime() === _minDate.getTime()) return;
    if (_nextDate.getTime() < _minDate.getTime()) {
      this.setState({
        curYear: _minDate.getFullYear(),
        curMonth: _minDate.getMonth()
      });
    } else {
      this.setState({
        curYear: _nextDate.getFullYear(),
        curMonth: _nextDate.getMonth()
      });
    }
  };

  _addYear = () => {
    const { curYear, curMonth } = this.state;
    const { maxDate } = this.props;
    if (!maxDate) return this.setState({ curYear: curYear + 1 }); // 如果没有最大日期，直接返回
    const _maxDateArr = maxDate.split('-');
    const _curDate = new Date(curYear, curMonth);
    const _nextDate = new Date(curYear + 1, curMonth);
    const _maxDate = new Date(_maxDateArr[0], _maxDateArr[1] - 1);
    if (_curDate.getTime() === _maxDate.getTime()) return;
    if (_nextDate.getTime() > _maxDate.getTime()) {
      this.setState({
        curYear: _maxDate.getFullYear(),
        curMonth: _maxDate.getMonth()
      });
    } else {
      this.setState({
        curYear: _nextDate.getFullYear(),
        curMonth: _nextDate.getMonth()
      });
    }
  };

  _delMonth = () => {
    const { curYear, curMonth } = this.state;
    const { minDate } = this.props;
    const _nextDate = new Date(curYear, curMonth - 1);
    console.log('minDate', minDate);
    if (_nextDate.getTime() < new Date(minDate).getTime()) return;
    this.setState({
      curYear: _nextDate.getFullYear(),
      curMonth: _nextDate.getMonth()
    });
  };

  _addMonth = () => {
    const { curYear, curMonth } = this.state;
    const { maxDate } = this.props;
    const _nextDate = new Date(curYear, curMonth + 1);
    if (_nextDate.getTime() > new Date(maxDate).getTime()) return;
    this.setState({
      curYear: _nextDate.getFullYear(),
      curMonth: _nextDate.getMonth()
    });
  };

  _cancel = () => {
    const { onCancel } = this.props;
    this.setState({ visible: false });
    onCancel();
  };

  _submit = () => {
    const { onSubmit } = this.props;
    const { pickedYear, pickedMonth, pickedDate } = this.state;
    this.setState({ visible: false });
    onSubmit({ year: pickedYear, month: pickedMonth, date: pickedDate });
  };
}

const today = new Date();
