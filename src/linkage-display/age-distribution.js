import React, { Component } from 'react';
import { TuyunBar } from 'tuyun-kit';

export default class AgeDistribution extends Component {
  state = {};

  render() {
    return (
      <div
        className="age-distribution"
        ref={el => (this.width = el.getBoundingClientRect().width)}
      >
        <TuyunBar width="100%" height={230} />
      </div>
    );
  }
}
