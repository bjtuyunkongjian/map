import React, { Component } from 'react';
import { IoIosBriefcase } from 'react-icons/io';

export default class ToolBox extends Component {
  render() {
    return (
      <div className="menu-item">
        <IoIosBriefcase />
        工具箱
      </div>
    );
  }
}
