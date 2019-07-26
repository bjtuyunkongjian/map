import React, { Component } from 'react';

export default class SelectOption extends Component {
  state = {};
  render() {
    return (
      <div className="select-option">
        <div className="select-all">选择全部</div>
        <div className="input-box">
          <input type="text" placeholder="请输入想要查找的内容" />
        </div>
      </div>
    );
  }
}
