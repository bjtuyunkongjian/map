/**
 * @author sl 2019-03-07
 * @name 案件总量柱状图
 * A类案件 caseA
 * B类案件 caseB
 * C类案件 caseC
 * D类案件 caseD
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
          title={{ text: '案件总量' }}
          legend={{ text: '人口总数：63' }}
          data={[
            {
              label: 'A类',
              value: 30,
              startColor: '#bbaddc',
              endColor: '#facff0'
            },
            {
              label: 'B类',
              value: 20,
              startColor: '#aed3fc',
              endColor: '#e6d1fc'
            },
            {
              label: 'C类',
              value: 15,
              startColor: '#fbdcd4',
              endColor: '#fed9fe'
            },
            {
              label: 'D类',
              value: 8,
              startColor: '#bbaddc',
              endColor: '#facff0'
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
