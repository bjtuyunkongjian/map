/**
 * @author sl 2017-03-07
 * @name 房屋饼状图
 * 1. 房屋总量
 * 2. 出租房屋
 * 3. 自住房屋
 * 4. 空置房屋
 */
import React, { Component } from 'react';
import { TuyunBar } from 'tuyun-kit';

import { BuildingLayerId } from './chart-info';

import { DefaultTab, TabValue } from '../constant';

export default class BuildingPie extends Component {
  state = {
    selectedIndex: -1
  };

  _curCell = {};

  render() {
    const { selectedIndex } = this.state;
    return (
      <div className="charts-box">
        <TuyunBar
          height={200}
          title={{ text: '房屋' }}
          legend={{ text: '人口总数：65' }}
          data={[
            { value: 310, label: '出租' },
            { value: 234, label: '自住' },
            { value: 135, label: '空置' }
          ]}
          selectedIndex={selectedIndex}
          onClick={this._clickBar}
        />
      </div>
    );
  }

  _clickBar = barInfo => {
    const { selectedIndex } = this.state;
    const { curIndex, curCell } = barInfo; // 解构
    this._curCell = curCell;
    this.setState({
      selectedIndex: curIndex === selectedIndex ? -1 : curIndex
    });
  };
}
