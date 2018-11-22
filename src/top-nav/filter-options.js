import React, { Component } from 'react';
import { MdCheck } from 'react-icons/md';

export default class FilterOptions extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    selectedOpt: -1,
    onSelect: () => {}
  };

  render() {
    const { selectedOpt } = this.props;

    const _optItems = filterOptions.map((item, index) => (
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

const filterOptions = [
  { value: 0, name: 'POI' },
  { value: 1, name: '地名' },
  { value: 2, name: '交通' },
  { value: 3, name: '绿地' },
  { value: 4, name: '水系' },
  { value: 5, name: '居民地' },
  { value: 6, name: '境界线' }
];
