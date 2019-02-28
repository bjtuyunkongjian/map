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
            { value: 435, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' }
          ]}
        />
      </div>
    );
  }
}
