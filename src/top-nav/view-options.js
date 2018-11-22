import React, { Component } from 'react';
import { MdCheck } from 'react-icons/md';

export default class ViewOption extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    selectedOpt: -1,
    onSelect: () => {}
  };

  render() {
    const { selectedOpt } = this.props;

    const _optItems = viewOptions.map((item, index) => (
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

const viewOptions = [
  { value: 0, name: '标准视图' },
  { value: 1, name: '天地图标准' },
  { value: 2, name: '欧标视图' },
  { value: 3, name: '夜间视图' }
];
