import React, { Component } from 'react';
import Event from '../menu-list/event';
import { FaTimes } from 'react-icons/fa';

export default class UnitMessage extends Component {
  state = {
    visible: false,
    unitLeft: 0,
    unitTop: 0
  };
  componentDidMount() {
    this._init();
  }

  render() {
    const { visible, unitLeft, unitTop } = this.state;
    if (!visible) return null;
    return (
      <div style={{ top: unitTop, left: unitLeft }} className="unit-box">
        <div className="unit-title">
          <span>{message[0].title}</span>
          <span className="close" onClick={this._closeUnit}>
            <FaTimes />
          </span>
        </div>
        <div className="ubit-des">{message[0].itemtext}</div>
        <div className="unit-info">
          <span>详细信息</span>
          <div className="space" />
          <ul>
            <li>地点：舜华路与舜华南路交汇处西北</li>
            <li>物业公司：暂无 总户数：2204</li>
            <li>开放商：暂无 楼栋数：20栋</li>
            <li>单位性质：国企 建成年代：2010</li>
          </ul>
        </div>
      </div>
    );
  }

  _init = () => {
    Event.on('showUnit', param => {
      console.log(param);
      const { laleft = 0, latop = 0 } = param;
      this.setState({
        unitLeft: laleft,
        unitTop: latop,
        visible: true
      });
    });
  };

  _closeUnit = () => {
    this.setState({
      visible: false
    });
  };
}

const message = [
  {
    title: '单位名称：草山岭小区',
    value: 'unit',
    itemtext: '单位简介：草山岭小区是济南市位于市中心的一处居民区'
  }
];
