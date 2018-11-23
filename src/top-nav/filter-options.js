import React, { Component } from 'react';
import { IoMdEyeOff, IoMdEye } from 'react-icons/io';

export default class FilterOptions extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    hiddenOpt: [],
    onSelect: () => {}
  };

  render() {
    const { hiddenOpt } = this.props;

    const _optItems = filterOptions.map((item, index) => (
      <li
        className="option-item"
        key={`nav_option_${index}`}
        onClick={() => this._checkStyle(index)}
      >
        {item.name}
        {!hiddenOpt[index] ? <IoMdEye /> : <IoMdEyeOff />}
      </li>
    ));

    return _optItems;
  }

  _checkStyle = index => {
    const { onSelect, hiddenOpt } = this.props;
    hiddenOpt[index] = !hiddenOpt[index];
    onSelect(hiddenOpt);
  };
}

const filterOptions = [
  { value: 0, name: 'POI', labelLayerIds: ['POI_LEVEL8', ''] },
  { value: 1, name: '交通' },
  { value: 2, name: '绿地' },
  { value: 3, name: '水系' },
  { value: 4, name: '居民地' },
  { value: 5, name: '边界线' }
];
