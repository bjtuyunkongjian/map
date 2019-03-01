import React, { Component } from 'react';
import { TuyunPie } from 'tuyun-kit';

export default class TestPie extends Component {
  state = {};
  render() {
    return (
      <div className="age-distribution">
        <TuyunPie
          width="100%"
          height={200}
          title={{ text: '人口分布' }}
          legend={{ text: '人口总数：65' }}
          tooltip="访问来源"
          data={[
            { value: 400, name: '网安' },
            { value: 310, name: '经侦' },
            { value: 234, name: '刑警' },
            { value: 135, name: '护证' },
            { value: 154, name: '禁毒' },
            { value: 184, name: '情报' },
            { value: 130, name: '国保' },
            { value: 121, name: '反邪教' },
            { value: 139, name: '反恐' },
            { value: 128, name: '交警' },
            { value: 190, name: '泽雨' }
          ]}
        />
      </div>
    );
  }
}
