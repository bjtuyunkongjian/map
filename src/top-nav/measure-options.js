import React, { Component } from 'react';
import { MdCheck, MdDeleteForever } from 'react-icons/md';
import { ClearDistanceLine } from './measure-distance';
import { ClearAreaPolygon } from './measure-area';

export default class MeasureOptions extends Component {
  static defaultProps = {
    selectedOpt: -1,
    onSelect: () => {}
  };

  componentWillReceiveProps = nextProps => {
    const { selectedOpt } = this.props;
    if (nextProps.selectedOpt !== selectedOpt) {
      ClearDistanceLine();
      ClearAreaPolygon();
    }
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

    _optItems.push(
      <li
        className="option-cancel"
        key={`nav_option_cancel`}
        onClick={() => this._checkStyle(index)}
      >
        取消
        <MdDeleteForever />
      </li>
    );

    return _optItems;
  }

  _checkStyle = index => {
    const { onSelect } = this.props;
    onSelect(index);
  };
}

const measureOptions = [
  { value: 0, name: '测距' },
  { value: 1, name: '测面' },
  { value: 2, name: '标点' }
];
