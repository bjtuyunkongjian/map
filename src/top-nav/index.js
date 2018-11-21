import React, { Component } from 'react';

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
            <span className="arrow-down" />
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
    let _optItems = null;
    const { selectIndex } = this.state;

    switch (selectIndex) {
      case 0:
        _optItems = viewOptions.map((item, index) => (
          <li className="option-item" key={`nav_option_${index}`}>
            {item.name}
          </li>
        ));
        break;

      case 1:
        _optItems = colorOptions.map((item, index) => (
          <li className="option-item" key={`nav_option_${index}`}>
            {item.name}
          </li>
        ));
        break;

      case 2:
        _optItems = null;
        break;
      case 3:
        _optItems = measureOptions.map((item, index) => (
          <li className="option-item" key={`nav_option_${index}`}>
            {item.name}
          </li>
        ));
        break;

      case 4:
        _optItems = filterOptions.map((item, index) => (
          <li className="option-item" key={`nav_option_${index}`}>
            {item.name}
          </li>
        ));
        break;

      case 5:
        _optItems = topicOptions.map((item, index) => (
          <li className="option-item" key={`nav_option_${index}`}>
            {item.name}
          </li>
        ));
        break;
      default:
        break;
    }
    return <ul className="nav-option">{_optItems}</ul>;
  }
}

const navList = [
  { type: 1, name: '视图' },
  { type: 1, name: '配色' },
  { type: 0, name: '路况' },
  { type: 1, name: '测量' },
  { type: 1, name: '筛选' },
  { type: 1, name: '专题' }
];

const viewOptions = [
  { value: 0, name: '天地图标准' },
  { value: 1, name: '标准视图' },
  { value: 2, name: '欧标视图' },
  { value: 3, name: '夜间视图' },
  { value: 4, name: '卫星视图' }
];

const colorOptions = [
  { value: 0, name: '交通' },
  { value: 1, name: '绿地' },
  { value: 2, name: '水系' },
  { value: 3, name: '居民地' }
];

const measureOptions = [
  { value: 0, name: '测距' },
  { value: 1, name: '测面' },
  { value: 2, name: '标点' }
];

const filterOptions = [
  { value: 0, name: 'POI' },
  { value: 1, name: '地名' },
  { value: 2, name: '交通' },
  { value: 3, name: '绿地' },
  { value: 4, name: '水系' },
  { value: 5, name: '居民地' },
  { value: 6, name: '境界线' }
];

const topicOptions = [];
