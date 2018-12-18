import React, { Component } from 'react';

import Event from '../event';
import { IoIosPeople } from 'react-icons/io';
export default class PoliceData extends Component {
  // state = {
  //   name: 123
  // };

  componentDidMount() {
    Event.on('aaa', param => {
      console.log('aaa', param);
      this.setState({ name: 'hhy' });
    });
  }

  render() {
    // const { name } = this.state;
    return (
      <div className="menu-item">
        <IoIosPeople />
        一标三实
        <span className="arrow arrow-right" />
        <ul className="policedata">
          {/* <li className="people" onClick={this._xxx}>
            人口
          </li>
          <li className="house" onClick={this.xxx2}>
            房屋
          </li>
          <li className="">单位</li> */}
          {['人口', '房屋', '单位'].map((item, index) => (
            <li
              className="xxx-item"
              key={index}
              onClick={() => this._xxx(index)}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    );
  }

  _xxx = index => {
    _MAP_.on();
  };
}
