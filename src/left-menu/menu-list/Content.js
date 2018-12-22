import React, { Component } from 'react';
import Event from './event';
import { IoIosPaper } from 'react-icons/io';

export default class Content extends Component {
  state = {
    animate: ''
  };
  render() {
    const { animate } = this.state;
    return (
      <div
        className="menu-item content"
        // onClick={() => Event.emit('merge:canshu')}
      >
        <div className="item-label">
          <IoIosPaper />
          工作内容
          <span
            className={`arrow arrow-right${animate}`}
            onClick={() => {
              this.setState({
                animate:
                  animate === 'arrow-right' ? 'arrow-down' : 'arrow-right'
              });
            }}
          />
        </div>
      </div>
    );
  }
}

const options = [
  { value: 0, name: '全部显示', color: '' },
  { value: 1, name: '待办任务', color: '#' },
  { value: 2, name: '情报线索', color: '' },
  { value: 3, name: '将到期案件', color: '' },
  { value: 4, name: '居住证转出', color: '' },
  { value: 5, name: '常口迁入', color: '' },
  { value: 6, name: '群众求助', color: '' },
  { value: 7, name: '治安防范', color: '' }
];
