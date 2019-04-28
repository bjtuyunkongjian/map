/**
 * @author 郝义红
 * @description 日期选择器
 */

import React, { Component } from 'react';

export default class DateSelect extends Component {
  static defaultProps = {
    visible: true,
    year: '',
    month: '',
    date: ''
  };

  render() {
    const { year, month, date, visible } = this.props;
    if (!visible) return null;
    const _dateArr = CreateDateArr(year, month);
    return (
      <div className="ReactDateSelect__Container">
        <div className="Year_Month">
          <div>
            <div className="Del_Year"> - </div>年
            <div className="Add_Year">+</div>
          </div>

          <div onWheel={this._onWheelYear}>
            <div className="Del_Month"> - </div>月
            <div className="Add_Month">+</div>
          </div>

          <div className="Close"> x </div>
        </div>

        <div className="Date_List">
          {_dateArr.map(rowItem => {
            return (
              <ul>
                {rowItem.map(cell => {
                  const _selected = date === cell.date.getDate();
                  // TODO 判断是不是当月的className
                  const _className = 'Date_cell' + _selected ? ' selected' : '';
                  return (
                    <li
                      className={_className}
                      onClick={() => {
                        this._onClick(cell);
                      }}
                    >
                      {cell.date.getDate()}
                    </li>
                  );
                })}
              </ul>
            );
          })}
        </div>
      </div>
    );
  }

  _onClick = curCell => {
    const { onClick, year, month } = this.props;
    onClick({
      date: { year, month, date: curCell.date.getDate() }
    });
  };

  _onWheelYear = e => {
    const { changeYear, year } = this.props;
    const _deltaY = e.deltaY;
    if (_deltaY > 0) {
      // TODO 增加
      changeYear(year + 1);
    } else if (_deltaY < 0) {
      //  TODO 减少
      changeYear(year - 1);
    }
  };

  _onWheelMonth = e => {
    const { changeMonth, month } = this.props;
    const _delatY = e.deltaY;
    if (_deltaY > 0) {
      changeMonth(month + 1);
    } else if (_deltaY < 0) {
      changeMonth(month - 1);
    }
  };
}

CreateDateArr = () => {
  // 1 * 42
  // 6 * 7
  return [[]];
};
