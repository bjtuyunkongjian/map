import React, { Component } from 'react';

export default class RightChart extends Component {
  state = {};
  render() {
    return (
      <div className="right-chart">
        <div className="chart-container">
          <div className="chart-item">
            <div className="chart-inner">{/* 人口柱状图 */}</div>
          </div>
        </div>
        <div className="chart-container">
          <div className="chart-item">
            <div className="chart-inner">{/* 人口密度图 */}</div>
          </div>
        </div>
        <div className="chart-container">
          <div className="chart-item">
            <div className="chart-inner">{/* 单位柱状图 */}</div>
          </div>
        </div>
        <div className="chart-container">
          <div className="chart-item">
            <div className="chart-inner">{/* 单位饼状图 */}</div>
          </div>
        </div>
        <div className="chart-container">
          <div className="chart-item">
            <div className="chart-inner">{/* 案件折线图 */}</div>
          </div>
        </div>
        <div className="chart-container">
          <div className="chart-item">
            <div className="chart-inner">{/* 警情折线图 */}</div>
          </div>
        </div>
      </div>
    );
  }
}
