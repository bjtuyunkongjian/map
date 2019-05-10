/**
 * @author sl 2019-03-07
 * @description 案件总量柱状图
 * 1. 全部
 * 2. 刑事
 * 3. 案前
 */

import React, { Component } from 'react';
import { TuyunLine } from 'tuyun-kit';

export default class TotalCase extends Component {
  state = {
    selectedIndex: -1
  };

  render() {
    const { selectedIndex } = this.state;
    return (
      <div className="charts-box">
        <TuyunLine title={{ text: '案件趋势' }} subTitle={{ text: '副标题' }} />
      </div>
    );
  }
}
