/**
 * @author sl 2017-03-07
 * @name 房屋饼状图
 * 1. 房屋总量
 * 2. 出租房屋
 * 3. 自住房屋
 * 4. 空置房屋
 */
import React, { Component } from 'react';
import { TuyunPie } from 'tuyun-kit';

export default class BuildingPie extends Component {
  state = {
    selectedIndex: -1
  };

  render() {
    const { selectedIndex } = this.state;
    return (
      <div className="charts-box">
        <TuyunPie
          height={200}
          title={{ text: '房屋' }}
          legend={{ text: '人口总数：65' }}
          data={[
            { value: 435, label: '房屋总量' },
            { value: 310, label: '出租' },
            { value: 234, label: '自住' },
            { value: 135, label: '空置' }
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
