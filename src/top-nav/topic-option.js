import React, { Component } from "react";

export default class topicOption extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const _optItems = topicOptions.map((item, index) => (
      <li className="option-item" key={`nav_option_${index}`}>
        {item.name}
      </li>
    ));
    return <ul className="nav-option">{_optItems}</ul>;
  }
}

const topicOptions = [
  { value: 0, name: "专题一" },
  { value: 1, name: "专题二" },
  { value: 2, name: "专题三" },
  { value: 3, name: "专题四" },
  { value: 4, name: "专题五" },
  { value: 5, name: "专题六" }
];
