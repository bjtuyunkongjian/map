/**
 * @author sl 2017-03-07
 * @name 人口密度图
 * 1. 总人口
 * 2. 流口
 * 3. 重点人口
 */

import React, { Component } from 'react';
import { TuyunDensity } from 'tuyun-kit';

export default class PopulationDensity extends Component {
  state = {
    selectedIndex: -1
  };

  render() {
    const { selectedIndex } = this.state;
    return (
      <div className="charts-box">
        <TuyunDensity
          height={200}
          title={{ text: '人口密度图' }}
          legend={{ text: '人口总数：65' }}
          data={[
            { value: 2, label: '总人口' },
            { value: 4, label: '流口' },
            { value: 6, label: '重点人口' }
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
