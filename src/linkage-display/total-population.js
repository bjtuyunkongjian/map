import React, { Component } from 'react';
import { TuyunBar } from 'tuyun-kit';

export default class TotalPopulation extends Component {
  state = {};
  render() {
    return (
      <div
        className="total-population"
        ref={el => (this.width = el.getBoundingClientRect().width)}
      >
        <TuyunBar width="100%" height={230} />
      </div>
    );
  }
}
