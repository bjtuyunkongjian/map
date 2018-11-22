import React, { Component } from 'react';
import { MdCheck } from 'react-icons/md';

export default class ColorOptions extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    selectedOpt: -1,
    onSelect: () => {}
  };

  render() {
    const { selectedOpt } = this.props;

    const _optItems = colorOptions.map((item, index) => (
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
    const { onSelect } = this.props;
    onSelect(index);
  };
}

const colorOptions = [
  { value: 0, name: '交通' },
  { value: 1, name: '绿地' },
  { value: 2, name: '水系' },
  { value: 3, name: '居民地' }
];
