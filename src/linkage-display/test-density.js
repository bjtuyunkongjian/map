import React, { Component } from 'react';
import { TuyunDensity } from 'tuyun-kit';

export default class TestDensity extends Component {
  state = {
    selectedIndex: -1
  };

  render() {
    const { selectedIndex } = this.state;
    return (
      <div className="age-distribution">
        <TuyunDensity
          width="100%"
          height={200}
          title={{ text: '密度图' }}
          legend={{ text: '人口总数：65' }}
          data={[
            { value: 2, label: '人口密度' },
            { value: 4, label: '人口密度' },
            { value: 6, label: '人口密度' }
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
