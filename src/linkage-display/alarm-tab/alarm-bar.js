/**
 * @author sl 2017-03-07
 * @name 报警数量柱状图
 * 1. 刑事案件 criminalLevel
 * 2. 治安案件 orderLevel
 * 3. 群体案件 groupLevel
 * 4. 自然灾害案件 disasterLevel
 */

import React, { Component } from 'react';
import { TuyunBar } from 'tuyun-kit';

export default class AlarmBar extends Component {
  state = {
    selectedIndex: -1
  };

  render() {
    const { selectedIndex } = this.state;
    return (
      <div className="charts-box">
        <TuyunBar
          height={200}
          title={{ text: '报警数量' }}
          legend={{ text: '人口总数：85' }}
          data={[
            {
              label: '刑事',
              value: 30,
              startColor: '#bbaddc',
              endColor: '#facff0'
            },
            {
              label: '治安',
              value: 20,
              startColor: '#aed3fc',
              endColor: '#e6d1fc'
            },
            {
              label: '群体',
              value: 15,
              startColor: '#fbdcd4',
              endColor: '#fed9fe'
            },
            {
              label: '自然灾害',
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
