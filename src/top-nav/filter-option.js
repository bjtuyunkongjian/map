import React, { Component } from "react";

export default class FilterOption extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const _optItems = filterOptions.map((item, index) => (
      <li className="option-item" key={`nav_option_${index}`}>
        {item.name}
      </li>
    ));

    return <ul className="nav-option">{_optItems}</ul>;
  }
}

const filterOptions = [
  { value: 0, name: "POI" },
  { value: 1, name: "地名" },
  { value: 2, name: "交通" },
  { value: 3, name: "绿地" },
  { value: 4, name: "水系" },
  { value: 5, name: "居民地" },
  { value: 6, name: "境界线" }
];
