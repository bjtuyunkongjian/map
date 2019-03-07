/**
 * @author sl 2019-03-06
 * @name 保护单位饼状图
 * 1. 新闻
 * 2. 学校
 * 3. 交通枢纽
 * 4. 加油站
 * 5. 国防科研
 * 6. 党政机关
 * 7. 电信
 * 8. 物流
 * 9. 银行
 * 10. 能源
 * 11. 物资储备
 */

import React, { Component } from 'react';
import { TuyunPie } from 'tuyun-kit';

export default class ProtectionUnit extends Component {
  state = {
    selectedIndex: -1
  };

  render() {
    const { selectedIndex } = this.state;

    return (
      <div className="charts-box">
        <TuyunPie
          height={200}
          title={{ text: '保护单位' }}
          legend={{ text: '人口总数：65' }}
          data={[
            { value: 435, label: '新闻' },
            { value: 310, label: '学校' },
            { value: 234, label: '交通枢纽' },
            { value: 135, label: '加油站' },
            { value: 435, label: '国防科研' },
            { value: 310, label: '党政机关' },
            { value: 234, label: '电信' },
            { value: 135, label: '物流' },
            { value: 435, label: '银行' },
            { value: 310, label: '能源' },
            { value: 234, label: '物资储备' }
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
