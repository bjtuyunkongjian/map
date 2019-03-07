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
          title={{ text: '人口分布' }}
          legend={{ text: '人口总数：65' }}
          xAxis={[
            { label: '总人口', value: 'zongrenkou' },
            { label: '常住', value: 'changkou' },
            { label: '流动', value: 'liukou' },
            { label: '重点', value: 'zhongdianrenkou' },
            { label: '境外', value: 'jingwairenkou' }
          ]}
          data={{
            zongrenkou: 65,
            changkou: 30,
            liukou: 20,
            zhongdianrenkou: 15,
            jingwairenkou: 10
          }}
          xAxisGradient={{
            zongrenkou: ['#a8edea', '#fed6e3'],
            changkou: ['#bbaddc', '#facff0'], // 0 表示 topColor， 1 表示 bottomColor
            liukou: ['#aed3fc', '#e6d1fc'],
            zhongdianrenkou: ['#fbdcd4', '#fed9fe'],
            jingwairenkou: ['#dde0fa', '#f4c4ec']
          }}
        />
      </div>
    );
  }
}
