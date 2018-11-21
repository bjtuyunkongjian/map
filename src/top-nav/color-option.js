import React, { Component } from "react";

export default class ColorOption extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const _optItems = colorOptions.map((item, index) => {
      return (
        <li className="option-item" key={`nav_option_${index}`}>
          {item.name}
        </li>
      );
    });
    return <ul className="nav-option">{_optItems}</ul>;
  }
}
const colorOptions = [
  { value: 0, name: "交通" },
  { value: 1, name: "绿地" },
  { value: 2, name: "水系" },
  { value: 3, name: "居民地" }
];
