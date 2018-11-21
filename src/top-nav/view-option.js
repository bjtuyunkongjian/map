import React, { Component } from "react";

export default class ViewOption extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const _optItems = viewOptions.map((item, index) => (
      <li className="option-item" key={`nav_option_${index}`}>
        {item.name}
      </li>
    ));

    return <ul className="nav-option">{_optItems}</ul>;
  }
}

const viewOptions = [
  { value: 0, name: "天地图标准" },
  { value: 1, name: "标准视图" },
  { value: 2, name: "欧标视图" },
  { value: 3, name: "夜间视图" },
  { value: 4, name: "卫星视图" }
];
