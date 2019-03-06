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
          title={{ text: '人口分布' }}
          legend={{ text: '人口总数：65' }}
          tooltip="访问来源"
          data={[
            { value: 435, label: '直接访问' },
            { value: 310, label: '邮件营销' },
            { value: 234, label: '联盟广告' },
            { value: 135, label: '视频广告' },
            { value: 435, label: '直接访问' },
            { value: 310, label: '邮件营销' },
            { value: 234, label: '联盟广告' },
            { value: 135, label: '视频广告' },
            { value: 435, label: '直接访问' },
            { value: 310, label: '邮件营销' },
            { value: 234, label: '联盟广告' },
            { value: 135, label: '视频广告' },
            { value: 435, label: '直接访问' },
            { value: 310, label: '邮件营销' },
            { value: 234, label: '联盟广告' },
            { value: 135, label: '视频广告' }
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
