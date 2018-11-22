import React, { Component } from 'react';
import { MdCheck } from 'react-icons/md';
import { ClearDistanceLine } from './measure-distance';

export default class MeasureOptions extends Component {
  static defaultProps = {
    selectedOpt: -1,
    onSelect: () => {}
  };

  render() {
    const { selectedOpt } = this.props;

    const _optItems = measureOptions.map((item, index) => (
      <li
        className="option-item"
        key={`nav_option_${index}`}
        onClick={() => this._checkStyle(index)}
      >
        {item.name}
        {selectedOpt === index ? <MdCheck /> : null}
      </li>
    ));

    return _optItems;
  }

  _checkStyle = index => {
    const { onSelect, selectedOpt } = this.props;
    if (index !== selectedOpt) {
      ClearDistanceLine();
    }
    onSelect(index);
  };
}

const measureOptions = [
  { value: 0, name: '测距' },
  { value: 1, name: '测面' },
  { value: 2, name: '标点' }
];
