import React, { Component } from 'react';
import { TuyunBar } from 'tuyun-kit';
import Event from './event';

export default class CaseTab extends Component {
  state = {
    curBar: ''
  };
  componentDidMount = () => this._init();
  render() {
    const { curBar } = this.state;
    if (curBar !== 'case') return null;
    return (
      <div className="population-tab">
        <TotalCase />
      </div>
    );
  }

  _init = () => {
    Event.on('change:curBar', nextBar => {
      const { curBar } = this.state;
      if (nextBar === curBar) return;
      this.setState({ curBar: nextBar });
    });
  };
}

class TotalCase extends Component {
  state = {};
  render() {
    return (
      <div className="total-population">
        <TuyunBar
          width="100%"
          height={200}
          title={{
            text: '案件总量',
            align: 'center', // center, left, right, 三个选项，分别向左、向右和居中，默认居中
            fontSize: 16,
            fontWeight: 'blod', // blod, normal
            color: 'black',
            fontFamily: '微软雅黑'
          }}
          xAxis={[
            { label: 'A类', value: 'caseA' },
            { label: 'B类', value: 'caseB' },
            { label: 'C类', value: 'caseC' },
            { label: 'D类', value: 'caseD' }
          ]}
          data={{
            caseA: 30,
            caseB: 20,
            caseC: 15,
            caseD: 18
          }}
          xAxisGradient={{
            caseA: ['#bbaddc', '#facff0'], // 0 表示 topColor， 1 表示 bottomColor
            caseB: ['#aed3fc', '#e6d1fc'],
            caseC: ['#fbdcd4', '#fed9fe'],
            caseD: ['#fbdcd4', '#fed9fe']
          }}
        />
      </div>
    );
  }
}
