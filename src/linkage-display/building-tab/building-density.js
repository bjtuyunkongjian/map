/**
 * @author sl 2017-03-07
 * @name 报警密度图
 * 1. 房屋密度
 * 2. 出租屋密度
 * 3. 自住屋密度
 * 4. 空置屋密度
 */

import React, { Component } from 'react';
import { TuyunDensity } from 'tuyun-kit';

export default class AlarmDensity extends Component {
  state = {
    selectedIndex: -1
  };

  render() {
    const { selectedIndex } = this.state;
    return (
      <div className="charts-box">
        <TuyunDensity
          height={260}
          title={{ text: '报警密度图' }}
          legend={{ text: '人口总数：65' }}
          data={[
            { value: 2, label: '房屋密度' },
            { value: 4, label: '出租屋密度' },
            { value: 6, label: '自住屋密度' },
            { value: 8, label: '空置屋密度' }
          ]}
          selectedIndex={selectedIndex}
          onClick={param =>
            this.setState({
              selectedIndex:
                param.curIndex === selectedIndex ? -1 : param.curIndex
            })
          }
        />
      </div>
    );
  }
}
