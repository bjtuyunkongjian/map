import React, { Component } from 'react';
import Event from './event';
import { IoIosPaper } from 'react-icons/io';
import MenuItem from './menu-item';

export default class Content extends Component {
  state = {
    curMenu: -1,
    selectedOpt: 0
  };
  componentDidMount() {
    Event.on('change:curMenu', curMenu => {
      this.setState({ curMenu });
    });
  }
  render() {
    const { curMenu, selectedOpt } = this.state;
    const _selected = curMenu === MenuItem.workContent;
    const _arrow = _selected ? 'arrow-down' : 'arrow-right';
    const _slide = _selected ? 'menu-in' : 'menu-out';
    return (
      <div className="menu-item content">
        <div className="item-label" onClick={this._selectMenu}>
          <IoIosPaper />
          工作内容
          <span className={`arrow-box ${_selected ? 'changed' : ''}`}>
            <span className={`arrow arrow-right ${_arrow}`} />
          </span>
        </div>
        <ul className={`work-container ${(_slide, _selected ? '' : 'hidden')}`}>
          {options.map((item, index) => {
            <li
              className={`work-item ${selectedOpt === index ? 'checked' : ''}`}
              key={`data_option_${index}`}
              onClick={e => this._selectWork(item, index, e)}
            >
              {item.name}
            </li>;
          })}
        </ul>
      </div>
    );
  }

  _selectMenu = () => {
    const { curMenu } = this.state;
    Event.emit(
      'change:curMenu',
      curMenu === MenuItem.workContent ? -1 : MenuItem.workContent
    );
  };
  _selectWork = (item, index, e) => {
    e.stopPropagation();
    this.setState({ selectedOpt: index });
  };
}

const options = [
  { value: 0, name: '全部显示', color: '' },
  { value: 1, name: '待办任务', color: '' },
  { value: 2, name: '情报线索', color: '' },
  { value: 3, name: '将到期案件', color: '' },
  { value: 4, name: '居住证转出', color: '' },
  { value: 5, name: '常口迁入', color: '' },
  { value: 6, name: '群众求助', color: '' },
  { value: 7, name: '治安防范', color: '' }
];
