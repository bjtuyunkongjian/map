import React, { Component } from 'react';

export default class TopNav extends Component {
  state = {
    year: '',
    month: '',
    date: '',
    hour: '',
    minute: '',
    second: ''
  };

  componentDidMount = () => {
    this._createTime();
    this._updateTime();
  };

  render() {
    const { year, month, date, hour, minute, second } = this.state;
    return (
      <div className="top-nav">
        <div className="time-container">{`${year}年${month}月${date}日 ${hour}:${minute}:${second}`}</div>
        <div className="title-container">
          <span className="title-text">警力一张图可视化平台</span>
        </div>
        <div>北京图云空间信息股份有限公司</div>
      </div>
    );
  }

  _createTime = () => {
    const date = new Date();
    this.setState({
      year: date.getFullYear(),
      month: format(date.getMonth() + 1),
      date: format(date.getDate()),
      hour: format(date.getHours()),
      minute: format(date.getMinutes()),
      second: format(date.getSeconds())
    });
  };

  _updateTime() {
    setInterval(() => this._createTime(), 1000);
  }
}

function format(num) {
  const numStr = num.toString();
  return numStr.length > 1 ? numStr : '0' + numStr;
}
