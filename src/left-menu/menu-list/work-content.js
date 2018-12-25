import React, { Component } from 'react';
import Event from './event';
import { IoIosPaper } from 'react-icons/io';
import MenuItem from './menu-item';
import { FetchWorkContent } from './webapi';

export default class WorkContent extends Component {
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
          <span>工作内容</span>
          <div className={`arrow-box ${_selected ? 'changed' : ''}`}>
            <span className={`arrow arrow-right ${_arrow}`} />
          </div>
        </div>
        <ul className={`work-container ${_selected ? '' : 'hidden'} ${_slide}`}>
          {options.map((item, index) => (
            <li
              className={`work-item ${selectedOpt === index ? 'checked' : ''}`}
              key={`work_option_${index}`}
              onClick={e => this._selectWork(item, index, e)}
            >
              <label>
                <input
                  type="checkbox"
                  value={item.value}
                  className="check-circle"
                  onClick={this._selectTask()}
                />
              </label>
              <div
                className="color-sign"
                style={{ backgroundColor: item.color }}
              />
              {item.name}
            </li>
          ))}
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
    this._fetchWorkContent(item);
  };
  _selectTask = (item, index, value) => {
    const { curMenu } = this.state;
  };
  _fetchWorkContent = async option => {
    const _bounds = _MAP_.getBounds();
    const _points = [
      _bounds._ne.lat,
      _bounds._sw.lng,
      _bounds._sw.lat,
      _bounds._ne.lng
    ];
    const { res } = await FetchWorkContent({ points: _points });
    console.log(res);
  };
}

const options = [
  { value: 0, name: '全部显示', color: '' },
  { value: 1, name: '待办任务', color: '#FF6A6A' },
  { value: 2, name: '情报线索', color: '#EE3A8C' },
  { value: 3, name: '将到期案件', color: '#8EE5EE' },
  { value: 4, name: '居住证转出', color: '#FFD700' },
  { value: 5, name: '常口迁入', color: '#FFDEAD' },
  { value: 6, name: '群众求助', color: '#BCEE68' },
  { value: 7, name: '治安防范', color: '#8968CD' }
];
