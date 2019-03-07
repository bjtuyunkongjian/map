/**
 * @author sl 2019-03-07
 * @name 案件总量柱状图
 * 1. 全部
 * 2. 刑事
 * 3. 案前
 */

import React, { Component } from 'react';
import { TuyunBar } from 'tuyun-kit';

export default class TotalCase extends Component {
  state = {
    selectedIndex: -1
  };

  render() {
    const { selectedIndex } = this.state;
    return (
      <div className="charts-box">
        <TuyunBar
          width="100%"
          height={200}
          title={{ text: '案件' }}
          legend={{ text: '人口总数：65' }}
          data={[
            {
              label: '全部',
              value: 30,
              startColor: '#bbaddc',
              endColor: '#facff0'
            },
            {
              label: '刑事',
              value: 20,
              startColor: '#aed3fc',
              endColor: '#e6d1fc'
            },
            {
              label: '案前',
              value: 15,
              startColor: '#fbdcd4',
              endColor: '#fed9fe'
            }
          ]}
          selectedIndex={selectedIndex}
          onClick={param => {
            this.setState({
              selectedIndex:
                param.curIndex === selectedIndex ? -1 : param.curIndex
            });
          }}
        />
      </div>
    );
  }
}
