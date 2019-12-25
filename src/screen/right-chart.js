import React, { Component } from 'react';

export default class RightChart extends Component {
  state = {};
  render() {
    return (
      <div className="right-chart">
        <div className="chart-container">
          <div className="chart-item">{/* 人口柱状图 */}</div>
        </div>
        <div className="chart-container">
          <div className="chart-item">{/* 人口密度图 */}</div>
        </div>
        <div className="chart-container">
          <div className="chart-item">{/* 单位柱状图 */}</div>
        </div>
        <div className="chart-container">
          <div className="chart-item">{/* 单位饼状图 */}</div>
        </div>
        <div className="chart-container">
          <div className="chart-item">{/* 案件折线图 */}</div>
        </div>
        <div className="chart-container">
          <div className="chart-item">{/* 警情折线图 */}</div>
        </div>
      </div>
    );
  }
}
