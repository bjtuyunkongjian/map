import React, { Component } from 'react';
import { TuyunBar } from 'tuyun-kit';

export default class AgeDistribution extends Component {
  state = {};

  render() {
    return (
      <div className="age-distribution">
        <TuyunBar
          width="100%"
          height={200}
          title={{
            text: '流口年龄分布',
            fontSize: 16
          }}
          xAxis={[
            { label: '0~18', value: 'range0' },
            { label: '19~40', value: 'range1' },
            { label: '41~60', value: 'range2' },
            { label: '61+', value: 'range3' }
          ]}
          data={{
            range0: 20,
            range1: 60,
            range2: 45,
            range3: 15
          }}
          xAxisGradient={{
            range0: ['#aed1fc', '#e6d1fc'], // 0 表示 topColor， 1 表示 bottomColor
            range1: ['#aed1fc', '#e6d1fc'],
            range2: ['#aed1fc', '#e6d1fc'],
            range3: ['#aed1fc', '#e6d1fc']
          }}
          dutyRatio={0.7}
        />
      </div>
    );
  }
}
