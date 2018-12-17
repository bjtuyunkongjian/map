import React, { Component } from 'react';

export default class PolicaData extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    selectedOpt: -1,
    onSelect: () => {}
  };

  render() {
    const { selectedOpt } = this.props;
    const _optItems = policaData.map((item, index) => {
      <ul>
        <li
          className="data-item"
          key={`data_${index}`}
          onClick={() => this.setState({})}
        >
          {item.name}
        </li>
        <li
          className="data-item"
          key={`data_${index}`}
          onClick={() => this.setState()}
        >
          {item.name}
        </li>
        <li
          className="data-item"
          key={`data_${index}`}
          onClick={() => this.setState()}
        >
          {item.name}
        </li>
      </ul>;
    });
    return _optItems;
  }
}

const policeData = [
  { value: 0, name: '人口' },
  { value: 1, name: '房屋' },
  { value: 2, name: '单位' }
];
