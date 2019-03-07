/**
 * @author sl 2019-03-06
 * @name 单位柱状图
 * 1. 全部单位
 * 2. 普通单位
 * 3. 特种单位
 * 4. 保护单位
 * 5. 九小场所
 */

import React, { Component } from 'react';
import { TuyunBar } from 'tuyun-kit';

export default class UnitBar extends Component {
  state = {
    selectedIndex: -1
  };

  render() {
    const { selectedIndex } = this.state;
    return (
      <div className="total-population">
        <TuyunBar
          width="100%"
          height={200}
          title={{ text: '单位' }}
          legend={{ text: '人口总数：85' }}
          data={[
            {
              label: '全部单位',
              value: 30,
              startColor: '#bbaddc',
              endColor: '#facff0'
            },
            {
              label: '普通单位',
              value: 20,
              startColor: '#aed3fc',
              endColor: '#e6d1fc'
            },
            {
              label: '特种单位',
              value: 15,
              startColor: '#fbdcd4',
              endColor: '#fed9fe'
            },
            {
              label: '保护单位',
              value: 8,
              startColor: '#bbaddc',
              endColor: '#facff0'
            },
            {
              label: '九小场所',
              value: 12,
              startColor: '#aed3fc',
              endColor: '#e6d1fc'
            }
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
