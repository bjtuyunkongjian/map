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
        onClick={() => Event.emit('merge:canshu')}
      >
        <IoIosPaper />
        工作内容
        <span
          className={`arrow arrow-right${animate}`}
          onClick={() => {
            this.setState({
              animate: animate === 'arrow-right' ? 'arrow-down' : 'arrow-right'
            });
          }}
        />
      </div>
    );
  }
}
