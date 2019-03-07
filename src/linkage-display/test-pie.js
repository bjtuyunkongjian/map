import React, { Component } from 'react';
import { TuyunPie } from 'tuyun-kit';

export default class TestPie extends Component {
  state = {
    selectedIndex: -1
  };

  render() {
    const { selectedIndex } = this.state;
    return (
      <div className="age-distribution">
        <TuyunPie
          width="100%"
          height={200}
          title={{ text: '重点人员' }}
          // legend={{ text: '人口总数：65' }}
          tooltip="访问来源"
          data={[
            { value: 435, name: '网安' },
            { value: 310, name: '经侦' },
            { value: 234, name: '刑警' },
            { value: 135, name: '护证' },
            { value: 435, name: '禁毒' },
            { value: 310, name: '情报' },
            { value: 234, name: '国保' },
            { value: 135, name: '反邪教' },
            { value: 435, name: '反恐' },
            { value: 310, name: '交警' },
            { value: 234, name: '泽雨' }
            // { value: 135, name: '视频广告' },
            // { value: 435, name: '直接访问' },
            // { value: 310, name: '邮件营销' },
            // { value: 234, name: '联盟广告' },
            // { value: 135, name: '视频广告' }
            // { value: 435, label: '直接访问' },
            // { value: 310, label: '邮件营销' },
            // { value: 234, label: '联盟广告' },
            // { value: 135, label: '视频广告' },
            // { value: 435, label: '直接访问' },
            // { value: 310, label: '邮件营销' },
            // { value: 234, label: '联盟广告' },
            // { value: 135, label: '视频广告' },
            // { value: 435, label: '直接访问' },
            // { value: 310, label: '邮件营销' },
            // { value: 234, label: '联盟广告' },
            // { value: 135, label: '视频广告' },
            // { value: 435, label: '直接访问' },
            // { value: 310, label: '邮件营销' },
            // { value: 234, label: '联盟广告' },
            // { value: 135, label: '视频广告' }
          ]}
          selectedIndex={selectedIndex}
          onClick={param => {
            this.setState({ selectedIndex: param.curIndex });
          }}
        />
      </div>
    );
  }
}
