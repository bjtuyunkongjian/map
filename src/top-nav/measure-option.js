import React, { Component } from "react";

export default class MeasureOption extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const _optItems = measureOptions.map((item, index) => (
      <li className="option-item" key={`nav_option_${index}`}>
        {item.name}
      </li>
    ));

    return <ul className="nav-option">{_optItems}</ul>;
  }
}
const measureOptions = [
  { value: 0, name: "测距" },
  { value: 1, name: "测面" },
  { value: 2, name: "标点" }
];
