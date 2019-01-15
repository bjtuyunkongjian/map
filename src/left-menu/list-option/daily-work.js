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
          <li>{_column.itemtext[0]}</li>
          <li>{_column.itemtext[1]}</li>
          <li>{_column.itemtext[2]}</li>
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
    Event.on('closeModal', () => {
      this.setState({ visible: false });
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
    itemtext: [
      '地址:济南市趵突泉派出所',
      '事件:待办任务清单',
      '执行人员: 张三',
      '待办事项: 对一般违法人员的帮教工作'
    ]
  },
  {
    title: '情报线索',
    value: 'cluesLst',
    itemtext: [
      '地址:济南市行政服务大厅',
      '事件:接待来信来访，受理群众的检举、报案、控告，及时查处治安案件',
      '执行人员：李四'
    ]
  },
  {
    title: '将到期案件',
    value: 'casesLst',
    itemtext: [
      '地址:济南市交警大队车管所',
      '事件:交通肇事车辆召回',
      '到期时间:2019-01-01',
      '案件类型:交通案件'
    ]
  },
  {
    title: '居住证到期',
    value: 'residenceLst',
    itemtext: ['地址:	济南市户政管理科', '执行人员：张三', '居住证户主：王五']
  },
  {
    title: '常口迁入',
    value: 'immigrationLst',
    itemtext: [
      '地址:济南市户政管理科',
      '执行人员:李四',
      '迁入户主:赵六',
      '迁出地址:济南市舜玉路派出所'
    ]
  },
  {
    title: '群众求助',
    value: 'helpLst',
    itemtext: [
      '地址:济南市行政服务大厅',
      '执行人员:张三',
      '求助人:曹琦',
      '求助事项:精神疾病患者走失，需要公安机关在一定范围内帮助查找'
    ]
  },
  {
    title: '治安防范',
    value: 'publicPreLst',
    itemtext: [
      '地址:济南市街道办事处',
      '执行人员:张三',
      '防范内容:公共复杂场所（地区） 管理、特种行业管理、危险物品管理、消防监督、道路交通管理等。'
    ]
  }
];
