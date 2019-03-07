import React, { Component } from 'react';
import { TuyunDensity } from 'tuyun-kit';

/*
- 总人口
   - 流口
   - 重点人口
*/
export default class PopulationDensity extends Component {
  state = {
    selectedIndex: -1
  };

  render() {
    const { selectedIndex } = this.state;
    return (
      <div className="charts-box">
        <TuyunDensity
          height={200}
          title={{ text: '人口密度图' }}
          legend={{ text: '人口总数：65' }}
          data={[
            { value: 2, label: '总人口' },
            { value: 4, label: '流口' },
            { value: 6, label: '重点人口' }
          ]}
          selectedIndex={selectedIndex}
          onClick={param =>
            this.setState({
              selectedIndex:
                param.curIndex === selectedIndex ? -1 : param.curIndex
            })
          }
        />
      </div>
    );
  }
}
