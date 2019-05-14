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
    selectedCode: ''
  };

  render() {
    const { selectedCode } = this.state;
    return (
      <div className="charts-box">
        <TuyunLine
          height={260}
          title={{ text: '案件趋势' }}
          subTitle={{ text: '副标题' }}
          selectedKey="code"
          selectedValue={selectedCode}
          onClick={({ curSeries }) => {
            const { code } = curSeries;
            this.setState({ selectedCode: code });
          }}
        />
      </div>
    );
  }
}
