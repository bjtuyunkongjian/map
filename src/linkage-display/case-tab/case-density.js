/**
 * @author sl 2017-03-07
 * @name 案件密度图
 * 1. 全部
 * 2. 刑事
 * 3. 案前
 */

import React, { Component } from 'react';
import { TuyunDensity } from 'tuyun-kit';

export default class CaseDensity extends Component {
  state = {
    selectedIndex: -1
  };

  render() {
    const { selectedIndex } = this.state;
    return (
      <div className="charts-box">
        <TuyunDensity
          height={200}
          title={{ text: '案件密度图' }}
          legend={{ text: '人口总数：65' }}
          data={[
            { value: 2, label: '全部' },
            { value: 4, label: '刑事' },
            { value: 6, label: '案前' }
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
