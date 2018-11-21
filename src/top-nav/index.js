import React, { Component } from "react";
import ViewOption from "./view-option";
import ColorOption from "./color-option";
import MeasureOption from "./measure-option";
import FilterOption from "./filter-option";
import TopicOption from "./topic-option";

export default class TopNav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectIndex: -1
    };
  }

  render() {
    const { selectIndex } = this.state;
    const optList = this._renderOptList();
    return (
      <div className="top-nav">
        {navList.map((item, index) => (
          <div
            className="nav-item"
            key={`top_nav_${index}`}
            onClick={e => this._selectIndex(e, index)}
          >
            {item.name}
            {item.type === 1 && <span className="arrow-down" />}
            {index === selectIndex && optList}
          </div>
        ))}
      </div>
    );
  }

  _selectIndex(e, index) {
    e.stopPropagation();
    const { selectIndex } = this.state;
    selectIndex === index
      ? this.setState({ selectIndex: -1 })
      : this.setState({ selectIndex: index });
  }

  _renderOptList() {
    let _optList = null;
    const { selectIndex } = this.state;
    switch (selectIndex) {
      case 0:
        _optList = <ViewOption />;
        break;
      case 1:
        _optList = <ColorOption />;
        break;
      case 2:
        _optList = null;
        break;
      case 3:
        _optList = <MeasureOption />;
        break;
      case 4:
        _optList = <FilterOption />;
        break;
      case 5:
        _optList = <TopicOption />;
        break;
    }
    return _optList;
  }
}

const navList = [
  { type: 1, name: "视图" },
  { type: 1, name: "配色" },
  { type: 0, name: "路况" },
  { type: 1, name: "测量" },
  { type: 1, name: "筛选" },
  { type: 1, name: "专题" }
];
