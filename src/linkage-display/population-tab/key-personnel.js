import React, { Component } from 'react';
import { TuyunPie } from 'tuyun-kit';

export default class KeyPersonnel extends Component {
  state = {
    selectedIndex: -1
  };

  render() {
    const { selectedIndex } = this.state;
    return (
      <div className="charts-box">
        <TuyunPie
          height={200}
          title={{ text: '重点人员' }}
          legend={{ text: '人口总数：65' }}
          data={[
            { value: 435, label: '网安' },
            { value: 310, label: '经侦' },
            { value: 234, label: '刑警' },
            { value: 135, label: '护证' },
            { value: 435, label: '禁毒' },
            { value: 310, label: '情报' },
            { value: 234, label: '国保' },
            { value: 135, label: '反邪教' },
            { value: 435, label: '反恐' },
            { value: 310, label: '交警' },
            { value: 234, label: '泽雨' }
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
