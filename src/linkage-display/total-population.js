import React, { Component } from 'react';
import { TuyunBar } from 'tuyun-kit';

export default class TotalPopulation extends Component {
  state = {};
  render() {
    return (
      <div className="total-population">
        <TuyunBar
          width="100%"
          height={200}
          title={{
            text: '人口分布',
            fontSize: 16
          }}
          xAxis={[
            { label: '常口', value: 'changkou' },
            { label: '流口', value: 'liukou' },
            { label: '重点人口', value: 'zhongdianrenkou' }
          ]}
          data={{
            changkou: 30,
            liukou: 20,
            zhongdianrenkou: 15
          }}
          xAxisGradient={{
            changkou: ['#bbaddc', '#facff0'], // 0 表示 topColor， 1 表示 bottomColor
            liukou: ['#aed3fc', '#e6d1fc'],
            zhongdianrenkou: ['#fbdcd4', '#fed9fe']
          }}
        />
      </div>
    );
  }
}
