import React, { Component } from 'react';

import Event from '../event';
import { IoIosPeople } from 'react-icons/io';
export default class PoliceData extends Component {
  // state = {
  //   name: 123
  // };

  // componentDidMount() {
  //   Event.on('aaa', () => {
  //     console.log('aaa');
  //     this.setState({ name: 'hhy' });
  //   });
  // }

  render() {
    // const { name } = this.state;
    return (
      <div className="menu-item">
        <IoIosPeople />
        一标三实
        <span className="arrow arrow-right" />
      </div>
    );
  }
}
