import React, { Component } from 'react';
import Event from '../menu-list/event';
import { FaTimes } from 'react-icons/fa';
export default class DailyWork extends Component {
  state = {
    visible: false,
    taskName: '',
    boxLeft: 0,
    boxTop: 0,
    execed: true
  };

  componentDidMount() {
    this._init();
  }

  render() {
    const { visible, taskName, boxLeft, boxTop, execed } = this.state;
    const _selected = execed;
    if (!visible) return null;
    const _column = columns.filter(item => item.value === taskName)[0];
    return (
      <div style={{ top: boxTop, left: boxLeft }} className="toast-box">
        <div className="toast-title">
          <span>{_column.title}</span>
          <span className="close" onClick={this._closeToast}>
            <FaTimes />
          </span>
        </div>
        <ul className="toast-list">
          <li>{_column.itemtext[0]}:</li>
          <li>{_column.itemtext[1]}:</li>
          <li>{_column.itemtext[2]}:</li>
          <li>{_column.itemtext[3]}</li>
        </ul>
        <div className="toast-control">
          <div
            className={`control-btn ${_selected ? 'checked' : ''}`}
            onClick={() => this.setState({ execed: true })}
          >
            已执行
          </div>
          <div
            className={`control-btn ${_selected ? '' : 'checked'}`}
            onClick={() => this.setState({ execed: false })}
          >
            未执行
          </div>
        </div>
      </div>
    );
  }

  // 初始化
  _init = () => {
    Event.on('showModal', param => {
      const { left = 0, top = 0, value } = param;
      this.setState({
        boxLeft: left,
        boxTop: top,
        visible: true,
        taskName: value
      });
    });
  };
  _closeToast = () => {
    this.setState({
      visible: false
    });
  };
}

const columns = [
  {
    title: '待办任务',
    value: 'taskLst',
    itemtext: ['地址', '事件', '执行人员', '待办事项']
  },
  {
    title: '情报线索',
    value: 'cluesLst',
    itemtext: ['地址', '事件', '执行人员']
  },
  {
    title: '将到期案件',
    value: 'casesLst',
    itemtext: ['地址', '事件', '到期时间', '案件类型']
  },
  {
    title: '居住证到期',
    value: 'residenceLst',
    itemtext: ['地址', '执行人员', '居住证户主']
  },
  {
    title: '常口迁入',
    value: 'immigrationLst',
    itemtext: ['地址', '执行人员', '迁入户主', '迁出地址']
  },
  {
    title: '群众求助',
    value: 'helpLst',
    itemtext: ['地址', '执行人员', '求助人', '求助事项']
  },
  {
    title: '治安防范',
    value: 'publicPreLst',
    itemtext: ['地址', '执行人员', '防范内容']
  }
];
