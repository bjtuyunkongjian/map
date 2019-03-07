/**
 * @author sl 2017-03-07
 * @name 报警密度图
 * 1. 刑事案件 criminalLevel
 * 2. 治安案件 orderLevel
 * 3. 群体案件 groupLevel
 * 4. 自然灾害案件 disasterLevel
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
            { value: 2, label: '刑事案件' },
            { value: 4, label: '治安案件' },
            { value: 6, label: '群体案件' },
            { value: 8, label: '自然灾害案件' }
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
