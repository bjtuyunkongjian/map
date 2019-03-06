import React, { Component } from 'react';
import { TuyunBar } from 'tuyun-kit';

export default class TotalPopulation extends Component {
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
          title={{ text: '人口分布' }}
          legend={{ text: '人口总数：85' }}
          data={[
            {
              label: '总人口',
              value: 30,
              startColor: '#bbaddc',
              endColor: '#facff0'
            },
            {
              label: '常驻',
              value: 20,
              startColor: '#aed3fc',
              endColor: '#e6d1fc'
            },
            {
              label: '流动',
              value: 15,
              startColor: '#fbdcd4',
              endColor: '#fed9fe'
            },
            {
              label: '重点',
              value: 8,
              startColor: '#bbaddc',
              endColor: '#facff0'
            },
            {
              label: '境外',
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
